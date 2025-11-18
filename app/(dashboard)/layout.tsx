import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // console.log({ "Layout session:": session });
  if (!session?.user) {
    return redirect("/login", RedirectType.replace);
  } else
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full p-2">
          {/* <SidebarTrigger className="absolute top-4 " /> */}
          {children}
        </main>
      </SidebarProvider>
    );
}
