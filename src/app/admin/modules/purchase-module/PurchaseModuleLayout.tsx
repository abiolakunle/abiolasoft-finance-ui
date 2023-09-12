import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdBarChart, MdHome, MdList } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import AllPurchaseComponent from "./all-purchase/AllPurchaseComponent";
import PaymentMadeComponent from "./paymentmade/PaymentMadeComponent"
import PaymentReceiptsComponent from "./paymentreceipts/PaymentReceiptsComponent";

const purchaseRoutes = [
    {
        name: "All Purchase Orders",
        path: "/",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <AllPurchaseComponent />,
    },
    {
        name: "Payment Made",
        path: "/paymentmade",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PaymentMadeComponent />,
    },
    {
        name: "Receipts",
        path: "/paymentreceipts",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PaymentReceiptsComponent />,
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