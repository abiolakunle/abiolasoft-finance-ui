import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdHome, MdList } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import SalesDashboardComponent from "./sales-dashboard/SalesDashboardComponent";
import InvoicesComponent from "./invoices/InvoicesComponent";
import SalesReceiptsComponent from "./sales-receipts/SalesReceiptsComponent";
import CustomersComponent from "./customers/CustomersComponent";
import NewCustomerComponent from "./customer-form/CustomerFormComponent";
import InvoiceComponent from "./invoice/InvoiceComponent";
import CustomerComponent from "./customer/CustomerComponent";
import SalesOrderComponent from "./sales-order/SalesOrderComponent";
import SalesOrderFormComponent from "./sales-order-form/SalesOrderFormComponent";
import InvoiceFormComponent from "./invoice/InvoiceComponent";
import SalesOrdersComponent from "./sales-orders/SalesOrdersComponent";
import SalesPersonsComponent from "./sales-persons/SalesPersonsComponent";
import SalesPersonComponent from "./sales-person/SalesPersonComponent";

const navRoutes = [
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
        name: "Sales Orders",
        path: "/sales-orders",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <SalesOrdersComponent />,
    },
    {
        name: "Invoices",
        path: "/invoices",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <InvoicesComponent />,
    },
    {
        name: "Sales Receipts",
        path: "/sales-receipts",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <SalesReceiptsComponent />,
    },
    {
        name: "Sales Persons",
        path: "/sales-persons",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <SalesPersonsComponent />,
    },
];

const salesRoutes = [
    ...navRoutes,
    {
        name: "New Customer",
        path: "/customers/new",
        component: <NewCustomerComponent />,
        excludeFromSideNav: true,
    },

    {
        name: "New Customer",
        path: "/customers/:id/edit",
        component: <NewCustomerComponent />,
        excludeFromSideNav: true,
    },

    {
        name: "New Customer Invoice",
        path: "/invoices/new",
        component: <InvoiceFormComponent />,
        excludeFromSideNav: true,
    },

    {
        name: "Edit Customer Invoice",
        path: "/invoice/:id/edit",
        component: <InvoiceFormComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "New Sales Order",
        path: "/sales-orders/new",
        component: <SalesOrderFormComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Edit Sales Order",
        path: "/sales-orders/:id/edit",
        component: <SalesOrderFormComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Invoice",
        path: "/invoices/:id",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <InvoiceComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Invoice",
        path: "/sales-persons/:id",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <SalesPersonComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Sales Order",
        path: "/sales-orders/:id",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <SalesOrderComponent />,
        excludeFromSideNav: true,
    },
    {
        name: "Customer",
        path: "/customer/:id",
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
