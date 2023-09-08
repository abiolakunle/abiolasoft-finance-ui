import { Icon } from "@chakra-ui/react";
import { MdHome, MdOutlineShoppingCart } from "react-icons/md";
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import InventoryAdjustmentsComponent from "./inventory-adjustments/InventoryAdjustmentsComponent";
import InventoryDashboardComponent from "./inventory-dashboard/InventoryDashboardComponent";
import ItemsComponent from "./items/ItemsComponent";

const inventoryRoutes = [
    {
        name: "Dashboard",
        path: "/",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: InventoryDashboardComponent,
    },
    {
        name: "Items",
        path: "/items",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: ItemsComponent,
    },
    {
        name: "Inventory Adjustments",
        path: "/inventory-adjustments",
        icon: (
            <Icon
                as={MdOutlineShoppingCart}
                width="20px"
                height="20px"
                color="inherit"
            />
        ),
        component: InventoryAdjustmentsComponent,
    },
];

export default inventoryRoutes;
