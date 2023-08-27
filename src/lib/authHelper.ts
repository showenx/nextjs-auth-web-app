import { pathToRegexp } from "path-to-regexp";
import { AUTHENTICATED_RESOURCE, AUTHORIZATION_ROLES } from "./authRoles";

export const resolveAuthenticatedResource = (
  path: string
): { type: "AuthenticatedPage" | "AuthenticatedApi"; value: string } | undefined => {
  const authPage = Object.values(AUTHENTICATED_RESOURCE.pages).find(value => {
    return pathToRegexp(value).test(path);
  });

  if (authPage)
    return {
      type: "AuthenticatedPage",
      value: authPage,
    };

  const authApi = Object.values(AUTHENTICATED_RESOURCE.api).find(value => {
    return pathToRegexp(value).test(path);
  });

  if (authApi)
    return {
      type: "AuthenticatedApi",
      value: authApi,
    };

};

export const validateAuthorizedResource = (
  path: string,
  role?: string
): boolean => {
  if (!role || !path || !AUTHORIZATION_ROLES[role]) {
    return false;
  }

  const authPage = AUTHORIZATION_ROLES[role].pages.some(resource => {
    return pathToRegexp(AUTHENTICATED_RESOURCE.pages[resource]).test(path);
  });

  const authApi = AUTHORIZATION_ROLES[role].api.some(resource => {
    return pathToRegexp(AUTHENTICATED_RESOURCE.api[resource]).test(path);
  });

  return authPage || authApi;
};
