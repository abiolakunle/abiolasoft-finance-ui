import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdHome, MdList } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import AllPurchaseComponent from "./sales-dashboard/PurchasesDashboardComponent";
import PaymentMadeComponent from "./payment-made/PaymentMadeComponent";
import PurchaseReceiptsComponent from "./purchase-receipts/PurchaseReceiptsComponent";
import VendorsComponent from "./vendors/VendorsComponent";
import PurchaseReceivesComponent from "./purchase-receives/PurchaseReceivesComponent";
import PurchasesDashboardComponent from "./purchase-dashboard/PurchasesDashboardComponent";

const purchaseRoutes = [
    {
        name: "Dashboard",
        path: "/",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: <PurchasesDashboardComponent />,
    },
    {
        name: "All Purchase Orders",
        path: "/all-purchases",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <AllPurchaseComponent />,
    },
    {
        name: "Purchase Receives",
        path: "/purchasereceives",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PurchaseReceivesComponent />,
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
