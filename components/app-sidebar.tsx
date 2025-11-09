import {
  Home,
  BookOpenCheck,
  Trash,
  HandCoins,
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

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "In stock",
    url: "#",
    icon: BookOpenCheck,
  },
  {
    title: "Damaged",
    url: "#",
    icon: Trash,
  },
  {
    title: "On sale",
    url: "#",
    icon: HandCoins,
  },
  {
    title: "Create Store",
    url: "/storeroom/create",
    icon: FolderPlus,
  },
];

// deleted user data fetching for simplicity
const data = {
  user: {
    name: "KT",
    email: "k@example.com",
    avatar:
      "https://img.freepik.com/free-vector/young-boy-avatar-illustration_1308-175646.jpg",
  },
};

export function AppSidebar() {
  const SIDEBAR_KEYBOARD_SHORTCUT = "b";
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
