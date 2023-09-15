import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdHome, MdList, MdOutlineSupervisedUserCircle, MdVerifiedUser } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import RolesComponent from "./roles/RolesComponent";
import UserFormComponent from "./user-form/UserForm";
import UserManagementDashboard from "./user-management-dashboard/UserManagementDashboard";
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
        icon: <Icon as={MdOutlineSupervisedUserCircle} width="20px" height="20px" color="inherit" />,
        component: <UserFormComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Users",
        path: "/users/:id",
        icon: <Icon as={MdOutlineSupervisedUserCircle} width="20px" height="20px" color="inherit" />,
        component: <UserFormComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Roles",
        path: "/roles",
        component: <RolesComponent />,
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
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
