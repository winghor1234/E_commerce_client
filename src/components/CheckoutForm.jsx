import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const token = useEcomStore((state) => state.token);
  const clearCart = useEcomStore((state) => state.clearCart);

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    // console.log("payload", payload);
    if (payload.error) {
      setMessage(payload.error.message);
      toast.error(payload.error.message);
    } else if (payload.paymentIntent && payload.paymentIntent.status === "succeeded") {
      // console.log("Ready or Save Order");
      // Create Order
      try {
        await saveOrder(token, payload);
        clearCart();
        toast.success("ບັນທຶກຄຳສັ່ງແລ້ວ.");
        navigate("/user/history");
      } catch (err) {
        console.log(err);
        toast.error("ບໍ່ສາມາດບັນທຶກຄຳສັ່ງໄດ້.");
      }
    } else {
      const paymentIntentStatus = payload.paymentIntent ? payload.paymentIntent.status : 'unknown';
      const warningMessage = `ການຊຳລະເງິນບໍ່ສຳເລັດ (Status: ${paymentIntentStatus}). ກະລຸນາລອງໃໝ່.`;
      setMessage(warningMessage);
      toast.warning("ຊຳລະເງິນບໍ່ສຳເລັດ"); // "Payment not successful"
      // console.warn('Payment not successful:', paymentIntentStatus);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
      <h1>ການຊຳລະເງິນ: </h1>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="stripe-button"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "ຊຳລະເງິນຕອນນີ້"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
