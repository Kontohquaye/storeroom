"use client";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOutAction } from "@/app/actions/signout";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button variant="ghost" type="submit" className="p-0">
        <LogOut />
        Log out
      </Button>
    </form>
  );
}
