"use client";

import { signIn, signOut } from "next-auth/react";
import React from "react";
const Com1 = () => {
  return (
    <div>
      <button
        onClick={() => {
          signIn("azure-ad-b2c");
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
