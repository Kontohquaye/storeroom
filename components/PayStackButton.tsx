"use client";

// import { useRef } from "react";
import Script from "next/script";

export default function PaystackButton() {
  //   const paystackRef = useRef(null);

  const handlePay = () => {
    if (!window.PaystackPop) {
      console.error("Paystack script not loaded yet");
      return;
    }

    const paystack = new window.PaystackPop();
    paystack.newTransaction({
      key: "pk_test_c9841fd992cdf85b07b317ef9a9a29430c26ea94",
      amount: 5000 * 100,
      email: "kt@example.com",
      onSuccess: (transaction: any) => {
        console.log(transaction);
      },
      onLoad: (response: ResponseType) => {
        console.log("onLoad: ", response);
      },
      onCancel: () => {
        console.log("onCancel");
      },
      onError: (error: ErrorEvent) => {
        console.log("Error: ", error.message);
      },
    });
  };

  return (
    <>
      <Script
        defer
        id="paystack-inline"
        src="https://js.paystack.co/v2/inline.js"
        strategy="afterInteractive"
      />

      <button onClick={handlePay}>Pay Now</button>
    </>
  );
}
