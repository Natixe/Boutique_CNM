import React, { useState, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ShopContext } from "../../context/shop-contexte"
import "./PaypalButton.css";

function Message({ content }) {
  return <p>{content}</p>;
}

export const PaypalButton = () => {
  const { cartItems, cartItemsPrincipal, getTotalCartAmount, getTotalCartAmountPrincipal, checkout } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const totalAmountPrincipal = getTotalCartAmountPrincipal()
  const initialOptions = {
    "client-id": import.meta.env.PAYPAL_CLIENT_ID,
    currency: "EUR",
    components: "buttons",
  };
  const [message, setMessage] = useState("");

  const productDetails = {
    name: "Sample Product",
    quantity: 1, // Integer value
    price: totalAmount + totalAmountPrincipal /*totalAmount + totalAmountPrincipal*/ // String value
  };
  console.log(totalAmount + totalAmountPrincipal)

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "silver",
            label: "buynow",
          }}
          onCancel={(data) => {
            window.location.assign("/payPalError");
          }}
          createOrder={async () => {
            try {
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cart: [
                    {
                      name: productDetails.name,
                      quantity: productDetails.quantity, // Ensure quantity is an integer
                      unit_amount: {
                        currency_code: "EUR",
                        value: productDetails.price
                      }
                    }
                  ],
                }),
              });

              if (!response.ok) {
                const error = await response.json();
                throw new Error(`Error creating order: ${error.message}`);
              }

              const orderData = await response.json();
              console.log("Order Data:", orderData);

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error.message}`);
              return "";
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (!response.ok) {
                const error = await response.json();
                throw new Error(`Error capturing order: ${error.message}`);
              }

              const orderData = await response.json();
              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              } else if (errorDetail) {
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
              } else {
                const transaction = orderData.purchase_units[0].payments.captures[0];
                setMessage(`Transaction ${transaction.status}: ${transaction.id}. See console for all available details`);
                console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
              }
            } catch (error) {
              console.error(error);
              setMessage(`Sorry, your transaction could not be processed...${error.message}`);
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
};