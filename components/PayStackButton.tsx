"use client";

// import { useRef } from "react";
import Script from "next/script";
import { Button } from "./ui/button";
import { subscribeUser } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PaystackButton({
  plan,
  amount,
  email,
}: {
  plan: string;
  amount: number;
  email: string;
}) {
  const router = useRouter();
  //   const paystackRef = useRef(null);

  const handlePay = () => {
    if (!window.PaystackPop) {
      console.error("Paystack script not loaded yet");
      return;
    }

    const paystack = new window.PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      amount: amount * 100,
      email,

      onSuccess: async (transaction: any) => {
        // console.log(transaction);
        if (
          transaction.message == "Approved" &&
          transaction.status === "success"
        ) {
          const res = await subscribeUser({ plan, amount });
          // console.log(res);
          if (res && res.subscribed) {
            toast.success(res.message);
            router.refresh();
          }
        }
      },
      // onLoad: (response: ResponseType) => {
      //   // console.log("onLoad: ", response);
      // },
      onCancel: () => {
        // console.log("onCancel");
        toast.success("payment cancelled");
      },
      onError: (error: ErrorEvent) => {
        toast.error(error.message);
        // console.log("Error: ", error.message);
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
      <Button
        onClick={handlePay}
        className={
          plan == "monthly"
            ? "w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            : "w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
        }
      >
        {plan == "monthly" ? "Subscribe Monthly" : "Subscribe Yearly"}
      </Button>
    </>
  );
}
