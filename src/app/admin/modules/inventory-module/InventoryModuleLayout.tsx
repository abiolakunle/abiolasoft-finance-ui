import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdHome, MdOutlineShoppingCart } from "react-icons/md";
import { Route, Routes, useLocation } from "react-router-dom";
import InventoryAdjustmentsComponent from "./inventory-adjustments/InventoryAdjustmentsComponent";
import InventoryDashboardComponent from "./inventory-dashboard/InventoryDashboardComponent";
import ItemsComponent from "./items/ItemsComponent";

const inventoryRoutes = [
    {
        name: "Dashboard",
        path: "/",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: <InventoryDashboardComponent />,
    },
    {
        name: "Items",
        path: "items",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: <ItemsComponent />,
    },
    {
        name: "Inventory Adjustments",
        path: "inventory-adjustments",
        icon: <Icon as={MdOutlineShoppingCart} width="20px" height="20px" color="inherit" />,
        component: <InventoryAdjustmentsComponent />,
    },
];

const InventoryModuleLayout = () => {
    let { pathname } = useLocation();

    return (
        <NavigationComponent baseRoute="/admin/modules/inventory" routes={inventoryRoutes}>
            <Routes>
                {inventoryRoutes.map((route) => {
                    return <Route path={route.path} element={route.component} />;
                })}
            </Routes>
        </NavigationComponent>
    );
};

export default InventoryModuleLayout;
