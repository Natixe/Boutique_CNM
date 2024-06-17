import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import path from "path";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
const base = "https://api-m.sandbox.paypal.com";
const app = express();

// Host static files
app.use(express.static("client"));

// Parse post params sent in body in JSON format
app.use(express.json());

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch access token: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("Access Token:", data.access_token);
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
    throw error;
  }
};

async function handleResponse(response) {
  const text = await response.text();
  if (!text) {
    return { error: "Empty response", httpStatusCode: response.status };
  }
  try {
    return {
      jsonResponse: JSON.parse(text),
      httpStatusCode: response.status,
    };
  } catch (err) {
    console.error("Failed to parse JSON:", text);
    return {
      error: "Invalid JSON response",
      details: text,
      httpStatusCode: response.status,
    };
  }
}

const createOrder = async (cart) => {
  try {
    const accessToken = await generateAccessToken();
    console.log("Creating order with cart:", cart);

    const items = cart.map(item => ({
      name: item.name,
      quantity: item.quantity.toString(), // Ensure quantity is a string
      unit_amount: item.unit_amount,
    }));
    
    const totalAmount = items.reduce((total, item) => total + parseFloat(item.unit_amount.value) * parseInt(item.quantity), 0).toFixed(2);

    const response = await fetch(`${base}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: {
            currency_code: "EUR",
            value: totalAmount,
            breakdown: {
              item_total: {
                currency_code: "EUR",
                value: totalAmount
              }
            }
          },
          items: items
        }]
      }),
    });

    const { jsonResponse, httpStatusCode } = await handleResponse(response);
    console.log("Order response:", jsonResponse, httpStatusCode);

    if (httpStatusCode !== 201) {
      throw new Error(`Failed to create order: ${jsonResponse.error || JSON.stringify(jsonResponse)}`);
    }

    return jsonResponse;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

// createOrder route
app.post("/api/orders", async (req, res) => {
  try {
    const { cart } = req.body;
    console.log("Received cart:", cart);
    const orderData = await createOrder(cart);
    res.status(201).json(orderData);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: error.message || "Failed to create order." });
  }
});

const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { jsonResponse, httpStatusCode } = await handleResponse(response);

  if (httpStatusCode !== 201) {
    throw new Error(`Failed to capture order: ${jsonResponse.error || JSON.stringify(jsonResponse)}`);
  }

  return jsonResponse;
};

// captureOrder route
app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const orderData = await captureOrder(orderID);
    res.status(201).json(orderData);
  } catch (error) {
    console.error("Failed to capture order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../src/index.html"));
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
});
