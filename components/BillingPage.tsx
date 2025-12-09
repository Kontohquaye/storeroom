import { auth } from "@/auth";
import PaystackButton from "./PayStackButton";
import { writeClient } from "@/sanity/lib/write-client";
import { capitalizeFirst, formatDate, isExpired } from "@/lib/utils";

const BillingPage = async ({
  email,
  subscription,
}: {
  email: string;
  subscription: any;
}) => {
  const session = await auth();

  if (session?.user) {
    if (subscription && subscription.plan) {
      const expiredSub: Boolean = isExpired(subscription.expiry);
      if (expiredSub) {
        await writeClient
          .withConfig({ useCdn: true })
          .patch(subscription._id)
          .set({
            status: "inactive",
          })
          .commit();
      }
    }

    //
  }
  return (
    <>
      {!subscription ||
        (subscription.status === "inactive" && (
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
                      amount={69}
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
                      amount={800}
                      email={email}
                    />
                  </div>
                </div>

                <form action="">
                  <div className="mt-8 p-6 border rounded-2xl dark:border-gray-700 dark:bg-gray-700">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">
                      Activate Coupon
                    </h3>

                    <div className="flex flex-col md:flex-row gap-3">
                      {/* Coupon Type Selector */}
                      <select
                        className=" px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white 
             bg-white text-gray-800 shadow-sm focus:outline-none 
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option
                          value="normal"
                          className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
                        >
                          Customer Coupons
                        </option>
                        <option value="festive">Festive Coupon</option>
                      </select>

                      {/* Coupon Code Input */}
                      <input
                        type="text"
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
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Apply
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
      {subscription && subscription.status === "active" && (
        <div className="w-full flex justify-center mt-12 px-4">
          <div className="w-full max-w-lg rounded-xl border bg-background shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Subscription Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between border rounded-lg p-4 bg-muted/30">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-green-500">
                  {capitalizeFirst(subscription.status)}
                </span>
              </div>

              <div className="flex items-center justify-between border rounded-lg p-4 bg-muted/30">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-semibold">
                  {capitalizeFirst(subscription.plan)}
                </span>
              </div>

              <div className="flex items-center justify-between border rounded-lg p-4 bg-muted/30">
                <span className="text-muted-foreground">Expiry</span>
                <span className="font-semibold">
                  {formatDate(new Date(subscription.expiry))}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillingPage;
