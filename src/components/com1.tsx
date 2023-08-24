"use client";

import { signIn } from "next-auth/react";
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
    </div>
  );
};
export default Com1;
