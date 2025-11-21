import {
  Home,
  WalletCards,
  Hand,
  HandHelping,
  Cable,
  FolderPlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { NavUser } from "./NavUser";
import { auth } from "../auth";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "My Store",
    url: "/dashboard",
    icon: WalletCards,
  },
  {
    title: "Create Store",
    url: "/storeroom/create",
    icon: FolderPlus,
  },
  {
    title: "Suppliers",
    url: "/storeroom/suppliers",
    icon: Cable,
  },
  {
    title: "More on products?",
    url: "/learn-more/product",
    icon: Hand,
  },
  {
    title: "Store Guide ",
    url: "/learn-more",
    icon: HandHelping,
  },
];

// deleted user data fetching for simplicity

export async function AppSidebar() {
  const SIDEBAR_KEYBOARD_SHORTCUT = "b";
  const session = await auth();
  const data = {
    user: {
      name: session?.user?.name,
      email: session?.user?.email,
      avatar: session?.user?.image,
    },
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="logo flex-norm mb-1">
              <Image
                src="/Logo.png"
                width={35}
                height={35}
                alt="storeroom logo"
              />
              <h1 className="font-bold text-xl">Storeroom</h1>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
