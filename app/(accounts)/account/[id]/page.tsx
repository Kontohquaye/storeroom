import { auth } from "@/auth";
import BillingPage from "@/components/BillingPage";

import { SiteHeader } from "@/components/PageHeader";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate, getAvatarFallback } from "@/lib/utils";
import { client } from "@/sanity/client";
import { FETCH_SPECIFIC_SUBSCRIPTION } from "@/sanity/lib/queries/subscription";

const ProfilePage = async () => {
  const session = await auth();
  let subscription;
  if (session?.user) {
    const subscriptionDetails = await client
      .withConfig({ useCdn: false })
      .fetch(FETCH_SPECIFIC_SUBSCRIPTION, {
        id: session?.user?.id,
      });
    subscription = subscriptionDetails;
  }
  // console.log(session);
  return (
    <div className="container max-w-full ">
      <SiteHeader heading="Account Profile" />
      <div className="header mt-2.5 mx-2">
        <header className="flex justify-between items-center py-2">
          <div className="flex item-center  gap-1.5">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={session?.user?.image || ""}
                alt="profile image"
              />
              <AvatarFallback>
                {getAvatarFallback(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="other text-sm">
              <p>{session?.user?.name}</p>
              <p className="text-gray-500">{session?.user?.email}</p>
            </div>
          </div>

          <div className="subscripton flex items-center gap-2">
            {formatDate(new Date(Date.now()))}
          </div>
        </header>
      </div>
      {/* Billing */}

      <div className="edit">
        <BillingPage
          email={session?.user?.email!}
          subscription={subscription}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
