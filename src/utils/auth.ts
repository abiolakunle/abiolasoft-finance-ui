import jwtDecode from "jwt-decode";

export const getUserInfo = (level: "User" | "Organization" = "User"): { permissions: string[]; roles: string[]; userId: string; personId: string } => {
    const token = localStorage.getItem(level === "User" ? "token" : "token-organization");
    if (token) {
        const decodedToken: any = jwtDecode(token);

        return {
            permissions: decodedToken.Permission || [],
            roles: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            personId: decodedToken["PersonId"],
        };
    }
    return null;
};
