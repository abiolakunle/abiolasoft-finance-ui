import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdHome, MdList } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import SalesDashboardComponent from "./sales-dashboard/SalesDashboardComponent";
import InvoicesComponent from "./invoices/InvoicesComponent";
import SalesReceiptsComponent from "./sales-receipts/SalesReceiptsComponent";
import CustomersComponent from "./customers/CustomersComponent";
import NewCustomerComponent from "./customer-form/CustomerFormComponent";
import NewInvoiceComponent from "./invoice-form/InvoiceFormComponent";
import CustomerComponent from "./customer/CustomerComponent";
import SalesOrderComponent from "./sales-orders/SalesOrdersComponent";
import SalesOrdersFormComponent from "./sales-order-form/SalesOrdersFormComponent";
import OrderComponent from "./Order/OrderComponent";
import InvoiceComponent from "./invoice-component/InvoiceComponent";


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
        name: "New Customer",
        path: "/customers/:id/edit",
        component: <NewCustomerComponent />,
        excludeFromSideNav: true,
    },

    {
        name: "New Customer Invoice",
        path: "/invoice/new",
        component: <NewInvoiceComponent />,
        excludeFromSideNav: true,
    },
    

    {
        name: "New Sales Order",
        path: "/sales-order/new",
        component: <SalesOrdersFormComponent />,
        excludeFromSideNav: true,
    },
    

    {
        name: "Invoices",
        path: "/customer-invoice",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <InvoicesComponent />,
    },

    {
        name: "Invoice",
        path: "/invoice/:id",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <InvoiceComponent />,
        excludeFromSideNav: true,
    },

    {
        name: "Sales Receipts",
        path: "/sales-receipts",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <SalesReceiptsComponent />,
    },

    {
        name: "Sales Orders",
        path: "/sales-orders",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <SalesOrderComponent />,
    },

    {
        name: "Sales",
        path: "/sale-order/:id",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <OrderComponent />,
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
