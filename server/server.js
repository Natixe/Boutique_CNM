import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import path from "path";
import fs from "fs";
import archiver from "archiver";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { VITE_PAYPAL_CLIENT_ID_PRODUCTION, PAYPAL_CLIENT_SECRET_PRODUCTION, PORT = 8888 } = process.env;
const base = "https://api-m.paypal.com";
const app = express();

const clientBuildPath = path.join(__dirname, "../src");
app.use(express.static(clientBuildPath));
app.use(express.json());

app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.type('application/javascript');
  } else if (req.path.endsWith('.jsx')) {
    res.type('application/javascript'); // JSX should be processed by the build tool
  }
  next();
});

const generateAccessToken = async () => {
  try {
    if (!VITE_PAYPAL_CLIENT_ID_PRODUCTION || !PAYPAL_CLIENT_SECRET_PRODUCTION) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(VITE_PAYPAL_CLIENT_ID_PRODUCTION + ":" + PAYPAL_CLIENT_SECRET_PRODUCTION).toString("base64");
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
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
    throw error;
  }
};

const handleResponse = async (response) => {
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
};

const createOrder = async (cart) => {
  try {
    const accessToken = await generateAccessToken();

    const items = cart.map(item => ({
      name: item.name,
      quantity: item.quantity.toString(),
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

    if (httpStatusCode !== 201) {
      throw new Error(`Failed to create order: ${jsonResponse.error || JSON.stringify(jsonResponse)}`);
    }

    return jsonResponse;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

app.post("/api/orders", async (req, res) => {
  try {
    const { cart } = req.body;
    const orderData = await createOrder(cart);
    res.status(201).json(orderData);
  } catch (error) {
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

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const orderData = await captureOrder(orderID);
    res.status(201).json(orderData);
  } catch (error) {
    res.status(500).json({ error: "Failed to capture order." });
  }
});

app.post("/api/download", async (req, res) => {
  const { cartItems, cartItemsPrincipal } = req.body;

  // Debugging log
  console.log("Received cartItems:", cartItems);
  console.log("Received cartItemsPrincipal:", cartItemsPrincipal);
  
  const cartItemsArray = Object.entries(cartItems).map(([id, quantity]) => ({ id: Number(id), quantity }));
  const cartItemsPrincipalArray = Object.entries(cartItemsPrincipal).map(([id, quantity]) => ({ id: Number(id), quantity }));
  
  // Filter out items with quantity > 0
  const items = [...cartItemsArray, ...cartItemsPrincipalArray].filter(item => item.quantity > 0);
  const downloadPath = path.join(__dirname, "../Download");

  const archive = archiver("zip");
  res.attachment("Formations-CNM.zip");

  archive.on("error", (err) => {
    console.error("Archive error:", err);
    res.status(500).send({ error: err.message });
  });

  archive.pipe(res);

  items.forEach((item) => {
    const filePath = path.join(downloadPath, `${item.id}`);
    if (fs.existsSync(filePath)) {
      console.log(`Adding file to archive: ${filePath}`);
      archive.directory(filePath, false);
    } else {
      console.error(`File not found: ${filePath}`);
    }
  });

  await archive.finalize();
});

// Catch-all handler to serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
  console.log(`Node server listening at http://0.0.0.0:${PORT}/`);
});
//