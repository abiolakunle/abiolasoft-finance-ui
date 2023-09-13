import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdBarChart, MdBlurCircular, MdHome, MdList } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import AllPurchaseComponent from "./all-purchases/AllPurchaseComponent";
import PaymentMadeComponent from "./paymentmade/PaymentMadeComponent"
import PurchaseReceiptsComponent from "./purchasereceipts/PurchaseReceiptsComponent";
import VendorsComponent from "./vendors/VendorsComponent";
import PurchaseReceivedComponent from "./purchasereceived/PurchaseReceivedComponent";
import PurchasesDashboardComponent from "./purchase-dashboard/PurchasesDashboardComponent"

const purchaseRoutes = [

    {
        name: "Dashboard",
        path: "/purchases-dashboard",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PurchasesDashboardComponent />,
    },
    {
        name: "All Purchase Orders",
        path: "/all-purchases",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <AllPurchaseComponent />,
    },
    {
        name: "Purchase Received",
        path: "/purchasereceived",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PurchaseReceivedComponent />,
    },
    {
        name: "Payment Made For Purchase",
        path: "/paymentmade",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PaymentMadeComponent />,
    },
    {
        name: "Purchase Receipts",
        path: "/purchasereceipts",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PurchaseReceiptsComponent />,
    },
    {
        name: "Vendors",
        path: "/vendors",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <VendorsComponent />,
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