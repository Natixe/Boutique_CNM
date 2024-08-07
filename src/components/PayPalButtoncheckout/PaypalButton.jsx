import React, { useState, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ShopContext } from "../../context/shop-contexte";
import "./PaypalButton.css";
import { FORMATIONS } from "../../Formation";
import { FORMATIONPRINCIPAL } from "../../Formation";

function Message({ content }) {
  return <p>{content}</p>;
}

export const PaypalButton = () => {
  const { cartItems, cartItemsPrincipal, getTotalCartAmount, getTotalCartAmountPrincipal } = useContext(ShopContext);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID_PRODUCTION,
    currency: "EUR",
    components: "buttons",
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setBuyerEmail(email);
    setIsEmailValid(validateEmail(email));
  };

  const handleBeforeCreateOrder = () => {
    if (!isEmailValid) {
      setMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const createOrderData = () => {
    const cartItemsArray = Object.entries(cartItems).map(([id, quantity]) => {
      const itemInfo = FORMATIONS.find((product) => product.id === Number(id));
      return {
        name: itemInfo.formationName,
        quantity: quantity,
        unit_amount: {
          currency_code: "EUR",
          value: itemInfo.price.toFixed(2),
        },
      };
    }).filter(item => item.quantity > 0);

    const cartItemsPrincipalArray = Object.entries(cartItemsPrincipal).map(([id, quantity]) => {
      const itemInfo = FORMATIONPRINCIPAL.find((product) => product.id === Number(id));
      return {
        name: itemInfo.formationName,
        quantity: quantity,
        unit_amount: {
          currency_code: "EUR",
          value: itemInfo.price.toFixed(2),
        },
      };
    }).filter(item => item.quantity > 0);

    return [...cartItemsArray, ...cartItemsPrincipalArray];
  };

  return (
    <div className="App">
      <label>
        Enter your email address:
        <input
          type="email"
          value={buyerEmail}
          onChange={handleEmailChange}
          style={{ borderColor: isEmailValid ? "initial" : "red" }}
        />
      </label>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ shape: "rect", layout: "vertical", color: "silver", label: "buynow" }}
          onClick={handleBeforeCreateOrder}
          onCancel={() => window.location.assign("/payPalError")}
          createOrder={async () => {
            if (!handleBeforeCreateOrder()) return "";

            const cart = createOrderData();

            try {
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  cart: cart,
                  email: buyerEmail,
                }),
              });

              if (!response.ok) {
                const error = await response.json();
                throw new Error(`Error creating order: ${error.message}`);
              }

              const orderData = await response.json();
              if (orderData.id) return orderData.id;
              else throw new Error("Error processing the order.");
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error.message}`);
              return "";
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(`/api/orders/${data.orderID}/capture`, { method: "POST", headers: { "Content-Type": "application/json" } });
              if (!response.ok) throw new Error("Failed to capture order");

              const orderData = await response.json();
              const transaction = orderData.purchase_units[0].payments.captures[0];
              setMessage(`Transaction ${transaction.status}: ${transaction.id}. See console for details`);
              console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));

              await fetch("/api/send-confirmation-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: buyerEmail, orderData }),
              });
            } catch (error) {
              console.error(error);
              setMessage(`Transaction could not be processed...${error.message}`);
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
};
