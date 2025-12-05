import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-2">
        {/* <SidebarTrigger className="absolute top-4 " /> */}
        {children}
      </main>
      <SidebarTrigger />
    </SidebarProvider>
  );
}
