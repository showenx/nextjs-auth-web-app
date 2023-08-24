import { signIn } from "next-auth/react";

export default async function SignIn() {
  console.log(`signin`);
  if (typeof window !== "undefined") {
    signIn("azure-ad-b2c");
  }
}
