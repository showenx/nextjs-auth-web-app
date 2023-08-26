"use client";

import { Com1 } from "@/components";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default async function SignIn() {
  // useEffect(() => {
  //   signIn("azure-ad-b2c", { callbackUrl: "/" });
  // }, []);


  return (
    <Com1 />
  )
}
