import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdBarChart, MdHome, MdList } from "react-icons/md";
import { Route, Routes, useParams } from "react-router-dom";
import InventoryAdjustmentsComponent from "./inventory-adjustments/InventoryAdjustmentsComponent";
import InventoryDashboardComponent from "./inventory-dashboard/InventoryDashboardComponent";
import ItemComponent from "./item/ItemComponent";
import ItemsComponent from "./items/ItemsComponent";
import ItemFormComponent from "./item-form/ItemFormComponent";
import InventoryAdjustmentFormComponent from "./inventory-adjustment-form/InventoryAdjustmentFormComponent";
import InventoryAdjustmentComponent from "./inventory-adjustment/InventoryAdjustmentComponent";
import { getUserOrganizationInfo } from "utils/auth";
import axiosRequest from "utils/api";

const InventoryModuleLayout = () => {
    const navRoutes = [
        {
            name: "Dashboard",
            path: "/",
            icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
            component: <InventoryDashboardComponent />,
        },
    ];

    const { organizationId } = useParams();
    axiosRequest.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(organizationId + "-organization-token")}`;
    const user = getUserOrganizationInfo(organizationId);

    if (user?.permissions?.includes("View Items")) {
        navRoutes.push({
            name: "Items",
            path: "/items",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <ItemsComponent />,
        });
    }
    if (user?.permissions?.includes("View Inventory Adjustments")) {
        navRoutes.push({
            name: "Inventory Adjustments",
            path: "/inventory-adjustments",
            icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
            component: <InventoryAdjustmentsComponent />,
        });
    }

    const inventoryRoutes = [
        ...navRoutes,
        {
            name: "Dashboard",
            path: "",
            icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
            component: <InventoryDashboardComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "Items",
            path: "/items/:id",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <ItemComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "New Item",
            path: "/items/new",
            component: <ItemFormComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "New Item",
            path: "/items/:id/edit",
            component: <ItemFormComponent />,
            excludeFromSideNav: true,
        },

        {
            name: "Inventory Adjustment",
            path: "/inventory-adjustments/:id",
            icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
            component: <InventoryAdjustmentComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "Inventory Adjustment",
            path: "/items/:id/inventory-adjustment",
            icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
            component: <InventoryAdjustmentFormComponent />,
            excludeFromSideNav: true,
        },
    ];

    return (
        <NavigationComponent baseRoute={`/admin/organizations/${organizationId}/modules/inventory`} routes={inventoryRoutes}>
            <Routes>
                {inventoryRoutes.map((route, idx) => {
                    return <Route key={idx} path={route.path} element={route.component} />;
                })}
            </Routes>
        </NavigationComponent>
    );
};

export default InventoryModuleLayout;
