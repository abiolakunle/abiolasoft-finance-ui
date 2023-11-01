import jwtDecode from "jwt-decode";

const decodeToken = (token: string): { permissions: string[]; roles: string[]; userId: string; personId: string } => {
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

export const getUserInfo = () => {
    return decodeToken(localStorage.getItem("token"));
};

export const getUserOrganizationInfo = (organizationId: string) => {
    return decodeToken(localStorage.getItem(organizationId + "-organization-token"));
};
