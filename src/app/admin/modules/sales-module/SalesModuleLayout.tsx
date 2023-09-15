import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdBarChart, MdHome, MdList } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import SalesDashboardComponent from "./sales-dashboard/SalesDashboardComponent"
import PendingOrdersComponent from "./customerpendingorders/PendingOrdersComponent"
import CustomerInvoiceComponent from "./customerinvoice/CustomerInvoiceComponent";
import SalesReceiptsComponent from "./salesreceipts/SalesReceiptsComponent";
import ShipmentsComponent from "./shipped/ShipmentsComponent";
import CustomerSalesComponent from "./customerssalesinfo/CustomerSalesComponent";
import NewCustomerComponent from "./customerssalesinfo/new-customer/NewCustomerComponent";
import AllSalesComponent from "./allsales/AllSalesComponent";
import NewInvoiceComponent from "./customerinvoice/new-invoice/NewInvoiceComponent";

const salesRoutes = [

    {
        name: "Dashboard",
        path: "/",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: <SalesDashboardComponent />,
    },
    {
        name: "All Sales",
        path: "/allsales",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <AllSalesComponent />,
    },
    {
        name: "Customers",
        path: "/customerssalesinfo",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <CustomerSalesComponent />,
    },
    {
        name: "New Customer",
        path: "/customers/new",
        component: <NewCustomerComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "New Customer Invoice",
        path: "/customerinvoice/new",
        component: <NewInvoiceComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Customer Pending Orders",
        path: "/customerpendingorders",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <PendingOrdersComponent />,
    },
    {
        name: "Customer's Invoices",
        path: "/customerinvoice",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <CustomerInvoiceComponent />,
    },
    {
        name: "Sales Receipts",
        path: "/salesreceipts",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <SalesReceiptsComponent />,
    },
    
    {
        name: "Shipments",
        path: "/shipped",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <ShipmentsComponent />,
    },
];

const SalesModuleLayout = () => {
    return (
        <NavigationComponent baseRoute="/admin/modules/sales" routes={salesRoutes}>
            <Routes>
                {salesRoutes.map((route, idx) => {
                    return <Route key={idx} path={route.path} element={route.component} />;
                })}
            </Routes>
        </NavigationComponent>
    ); 
};

export default SalesModuleLayout;