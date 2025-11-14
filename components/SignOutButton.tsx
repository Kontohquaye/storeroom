"use client";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOutAction } from "@/app/actions/signout";

export default function SignOutButton() {
  return (
    <form action={signOutAction} className="flex items-center gap-1">
      <LogOut />
      <Button variant="ghost" type="submit" className="p-0">
        Log out
      </Button>
    </form>
  );
}
