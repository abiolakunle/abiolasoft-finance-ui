import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdHome, MdList, MdOutlineSupervisedUserCircle } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import ManageRolePermissionsComponent from "./manage-role-permissions/ManageRolePermissionsComponent";
import ManageUserRolesComponent from "./manage-user-roles/ManageUserRolesComponent";
import RoleFormComponent from "./role-form/RoleFormComponent";
import RoleComponent from "./role/RoleComponent";
import RolesComponent from "./roles/RolesComponent";
import UserFormComponent from "./user-form/UserFormComponent";
import UserManagementDashboard from "./user-management-dashboard/UserManagementDashboard";
import UserComponent from "./user/UserComponent";
import UsersComponent from "./users/UsersComponent";

const salesRoutes = [
    {
        name: "Dashboard",
        path: "/",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: <UserManagementDashboard />,
    },
    {
        name: "Users",
        path: "/users",
        icon: <Icon as={MdOutlineSupervisedUserCircle} width="20px" height="20px" color="inherit" />,
        component: <UsersComponent />,
    },
    {
        name: "Users",
        path: "/users/new",
        component: <UserFormComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Edit Users",
        path: "/users/:id/edit",
        component: <UserFormComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "View User",
        path: "/users/:id",
        component: <UserComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Roles",
        path: "/roles",
        component: <RolesComponent />,
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    },
    {
        name: "Role",
        path: "/roles/new",
        component: <RoleFormComponent />,
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        excludeFromSideNav: true,
    },
    {
        name: "View Role",
        path: "/roles/:id",
        component: <RoleComponent />,
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        excludeFromSideNav: true,
    },
    {
        name: "View Role",
        path: "/roles/:id/edit",
        component: <RoleFormComponent />,
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        excludeFromSideNav: true,
    },
    {
        name: "Manage Role Permissions",
        path: "/roles/:id/manage-permissions",
        component: <ManageRolePermissionsComponent />,
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        excludeFromSideNav: true,
    },
    {
        name: "Manage Roles",
        path: "/user/:id/manage-roles",
        component: <ManageUserRolesComponent />,
        excludeFromSideNav: true,
    },
];

const UserManagementModuleLayout = () => {
    return (
        <NavigationComponent baseRoute="/admin/modules/user-management" routes={salesRoutes}>
            <Routes>
                {salesRoutes.map((route, idx) => {
                    return <Route key={idx} path={route.path} element={route.component} />;
                })}
            </Routes>
        </NavigationComponent>
    );
};

export default UserManagementModuleLayout;
