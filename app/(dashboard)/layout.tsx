import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";
import { FETCH_SPECIFIC_SUBSCRIPTION } from "@/sanity/lib/queries/subscription";
import { client } from "@/sanity/client";
import { isExpired } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import DeniedAccessPage from "@/components/DeniedAccessPage";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let subscriptionStatus = "inactive";
  if (session?.user) {
    const subscription = await client
      .withConfig({ useCdn: false })
      .fetch(FETCH_SPECIFIC_SUBSCRIPTION, {
        id: session?.user?.id,
      });
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
    if (subscription) subscriptionStatus = subscription.status;
  }

  // console.log({ "Layout session:": session });
  if (!session?.user) {
    return redirect("/login", RedirectType.replace);
  } else
    return (
      <SidebarProvider>
        <AppSidebar />
        {subscriptionStatus === "inactive" ? (
          <DeniedAccessPage id={session.user.id!} name={session.user.name!} />
        ) : (
          <main className="w-full p-2">
            {/* <SidebarTrigger className="absolute top-4 " /> */}
            {children}
          </main>
        )}
      </SidebarProvider>
    );
}
