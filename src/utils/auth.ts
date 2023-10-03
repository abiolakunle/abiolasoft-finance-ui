import jwtDecode from "jwt-decode";

export const getUserInfo = (): { permissions: string[]; roles: string[]; userId: string } => {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken: any = jwtDecode(token);

        return {
            permissions: decodedToken.Permission || [],
            roles: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        };
    }
    return null;
};
