import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdHome, MdList } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import SalesDashboardComponent from "./sales-dashboard/SalesDashboardComponent"
import CustomerInvoiceComponent from "./invoices/InvoicesComponent";
import SalesReceiptsComponent from "./sales-receipts/SalesReceiptsComponent";
import CustomersComponent from "./customers/CustomersComponent";
import NewCustomerComponent from "./customer-form/CustomerFormComponent";
import NewInvoiceComponent from "./invoice-form/InvoiceFormComponent";
import CustomerComponent from "./customer/CustomerComponent";

const salesRoutes = [
    {
        name: "Dashboard",
        path: "/",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: <SalesDashboardComponent />,
    },
    {
        name: "Customers",
        path: "/customers",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <CustomersComponent />,
    },
    {
        name: "New Customer",
        path: "/customers/new",
        component: <NewCustomerComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "New Customer Invoice",
        path: "/customer-invoice/new",
        component: <NewInvoiceComponent />,
        excludeFromSideNav: true,
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
        name: "Customer",
        path: "/customer/:${id}",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <CustomerComponent />,
        excludeFromSideNav: true,
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
