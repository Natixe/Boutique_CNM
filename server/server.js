import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { VITE_PAYPAL_CLIENT_ID_PRODUCTION, PAYPAL_CLIENT_SECRET_PRODUCTION, PORT = 8888, IONOS_EMAIL_PASSWORD } = process.env;
const base = "https://api-m.sandbox.paypal.com";
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
    console.log("Received cart:", cart);
    const cartArray = Array.isArray(cart) ? cart : Object.values(cart);

    if (cartArray.length === 0) {
      throw new Error("Cart is empty");
    }

    cartArray.forEach(item => console.log(item));

    const items = cartArray.map(item => {
      if (!item.name || !item.quantity || !item.unit_amount) {
        throw new Error("Invalid cart item: missing name, quantity, or unit amount");
      }

      return {
        name: item.name,
        quantity: item.quantity.toString(),
        unit_amount: item.unit_amount,
      };
    });

    const totalAmount = items.reduce((total, item) =>
      total + parseFloat(item.unit_amount.value) * parseInt(item.quantity), 0
    ).toFixed(2);

    const response = await fetch(`${base}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await generateAccessToken()}`,
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
    const { cart, email } = req.body;
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

    if (!orderID) {
      throw new Error("Order ID is missing in request parameters.");
    }

    const orderData = await captureOrder(orderID);
    if (!orderData) {
      throw new Error("Failed to retrieve order data.");
    }

    res.status(201).json(orderData);
  } catch (error) {
    console.error("Error capturing order:", error);
    res.status(500).json({ error: error.message || "Failed to capture order." });
  }
});

const sendConfirmationEmail = async (email, orderData) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ionos.fr",
      port: 465,
      secure: true,
      auth: {
        user: "hello@cnm-nutrisport.com",
        pass: IONOS_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"CNM Nutrisport" <hello@cnm-nutrisport.com>',
      to: email,
      subject: "Order Confirmation - CNM Nutrisport",
      text: `Thank you for your purchase! Your order ID is ${orderData.id}.`,
      html: `<p>Thank you for your purchase! Your order ID is <b>${orderData.id}</b>.</p>`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
};

app.post("/api/send-confirmation-email", async (req, res) => {
  const { email, orderData } = req.body;
  try {
    await sendConfirmationEmail(email, orderData);
    res.status(200).json({ message: "Confirmation email sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send confirmation email" });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
  console.log(`Node server listening at http://0.0.0.0:${PORT}/`);
});
