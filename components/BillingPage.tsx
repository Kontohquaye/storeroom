import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { capitalizeFirst, formatDate, isExpired } from "@/lib/utils";
import SubscriptionsPage from "./SubscriptionDetailsPage";

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
      {(!subscription && <SubscriptionsPage email={email} />) ||
        (subscription.status === "inactive" && (
          <SubscriptionsPage email={email} />
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
