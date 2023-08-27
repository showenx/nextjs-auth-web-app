export const AUTHENTICATED_RESOURCE: {
  [resource: string]: { [name: string]: string };
} = {
  pages: {
    transport: "/transport/:path*",
    network: "/network/:path*",
    finance: "/finance/:path*",
    operation: "/finance/:path*",
    protected: "/protected/:path?",
  },
  api: {
    admin: "/api/admin/:path*",
    finance: "/api/finance/:path*",
    operation: "/api/operation/:path*",
    health: "/api/health/:path?",
  },
};

export const AUTHORIZATION_ROLES: {
  [role: string]: { [resource: string]: string[] };
} = {
  admin: {
    pages: ["transport", "network", "finance", "protected"],
    api: ["health"],
  },
  operation: {
    pages: ["transport", "network", "finance"],
    api: ["admin"],
  },
};
