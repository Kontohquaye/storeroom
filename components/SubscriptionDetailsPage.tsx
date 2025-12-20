"use client";
import { useState } from "react";
import CouponForm from "./CouponFromComponent";
import PaystackButton from "./PayStackButton";

const SubscriptionsPage = ({ email }: { email: string }) => {
  const [discount, setDiscount] = useState(0);

  return (
    <div className="container">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
          <h1 className="text-3xl font-bold text-center dark:text-white">
            Subscription Plans
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-300">
            Subscribe to unlock features like creating/deleting products &
            stores, updating stocks, and moving products to sales.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Plan */}
            <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-700">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                Monthly Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access all premium store management tools.
              </p>
              <p className="text-3xl font-bold mb-6">
                GHS 69<span className="text-lg">/mo</span>
              </p>
              <PaystackButton
                plan={"monthly"}
                amount={69 - discount}
                email={email}
              />
            </div>

            {/* Yearly Plan */}
            <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-700">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                Yearly Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Save more with the annual subscription.
              </p>
              <p className="text-3xl font-bold mb-6">
                GHS 800<span className="text-lg">/yr</span>
              </p>
              <PaystackButton
                plan={"yearly"}
                amount={800 - discount}
                email={email}
              />
            </div>
          </div>

          <CouponForm discount={setDiscount} />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
