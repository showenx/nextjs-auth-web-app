"use client";

import { signIn, signOut } from "next-auth/react";
import React, { useEffect } from "react";
const Com1 = () => {
  useEffect(() => {
    fetch("/api/health").then(console.log);
  });

  return (
    <div>
      <button
        onClick={() => {
          signIn("azure-ad-b2c", { callbackUrl: "/" });
        }}
      >
        Sign In
      </button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};
export default Com1;
