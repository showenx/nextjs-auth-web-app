import {signOut } from "next-auth/react";

export default function Signout() {
  if (typeof window !== 'undefined') {
    signOut({ callbackUrl: "/" })
  }
  return null;
}