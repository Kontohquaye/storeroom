"use client";
import { verifyCoupons } from "@/lib/actions";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";

const CouponForm = ({
  discount,
}: {
  discount: Dispatch<SetStateAction<number>>;
}) => {
  const initialState: any = [];
  const [state, formAction, pending] = useActionState(
    verifyCoupons,
    initialState
  );
  useEffect(() => {
    if (!pending && state?.discount) discount(state.discount);
  }, [state, discount]);

  return (
    <div className="container">
      <form action={formAction}>
        <div className="mt-8 p-6 border rounded-2xl dark:border-gray-700 dark:bg-gray-700">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Activate Coupon
          </h3>
          <p aria-live="polite" className="text-red-800">
            {state?.error}
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            {/* Coupon Code Input */}
            <input
              name="code"
              type="text"
              defaultValue={
                state.success && state.data.code ? state.data.code : ""
              }
              className="
            w-full
            px-4 py-2
            bg-white dark:bg-gray-800
            text-gray-800 dark:text-white
            border border-gray-300 dark:border-gray-600
            rounded-lg
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
            transition
          "
              placeholder="Enter coupon code"
            />

            {/* Apply Button */}
            <button
              onSubmit={(e) => {
                e.preventDefault();
              }}
              disabled={pending}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              {pending ? <div className="loader" /> : "Apply"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CouponForm;
