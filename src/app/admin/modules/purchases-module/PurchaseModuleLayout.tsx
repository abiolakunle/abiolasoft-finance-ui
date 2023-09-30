import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdHome, MdList } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import PaymentMadeComponent from "./payment-made/PaymentMadeComponent";
import PurchaseReceiptsComponent from "./purchase-receipts/PurchaseReceiptsComponent";
import VendorsComponent from "./vendors/VendorsComponent";
import PurchaseReceivesComponent from "./purchase-receives/PurchaseReceivesComponent";
import PurchaseOrdersComponent from "./purchase-orders/PurchaseOrdersComponent";
import PurchasesDashboardComponent from "./purchases-dashboard/PurchasesDashboardComponent";
import VendorComponent from "./vendor/VendorComponent";
import NewVendorComponent from  "./vendor-form/VendorFormComponet"

const purchaseRoutes = [
    {
        name: "Dashboard",
        path: "/",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: <PurchasesDashboardComponent />,
    },
    {
        name: "Purchase Orders",
        path: "/purchases-orders",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PurchaseOrdersComponent />,
    },
    {
        name: "Purchase Receives",
        path: "/purchase-receives",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PurchaseReceivesComponent />,
    },
    {
        name: "Payments Made",
        path: "/payment-made",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PaymentMadeComponent />,
    },
    {
        name: "Purchase Receipts",
        path: "/purchase-receipts",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PurchaseReceiptsComponent />,
    },
    {
        name: "Vendors",
        path: "/vendors",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <VendorsComponent />,
    },
    {
        name: "New Vendor",
        path: "/vendors/new",
        component: <NewVendorComponent />,
        excludeFromSideNav: true,
    },

    {
        name: "New vendor",
        path: "/vendors/:id/edit",
        component: <NewVendorComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Vendor",
        path: "/vendor/:id",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <VendorComponent />,
        excludeFromSideNav: true,
    },
];

const PurchaseModuleLayout = () => {
    return (
        <NavigationComponent baseRoute="/admin/modules/purchases" routes={purchaseRoutes}>
            <Routes>
                {purchaseRoutes.map((route, idx) => {
                    return <Route key={idx} path={route.path} element={route.component} />;
                })}
            </Routes>
        </NavigationComponent>
    );
};

export default PurchaseModuleLayout;
