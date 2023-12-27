import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdHome, MdList } from "react-icons/md";
import { Route, Routes, useParams } from "react-router-dom";
import SalesDashboardComponent from "./sales-dashboard/SalesDashboardComponent";
import InvoicesComponent from "./invoices/InvoicesComponent";
import CustomersComponent from "./customers/CustomersComponent";
import NewCustomerComponent from "./customer-form/CustomerFormComponent";
import InvoiceComponent from "./invoice/InvoiceComponent";
import CustomerComponent from "./customer/CustomerComponent";
import SalesOrderComponent from "./sales-order/SalesOrderComponent";
import SalesOrdersComponent from "./sales-orders/SalesOrdersComponent";
import SalespersonsComponent from "./salespersons/SalespersonsComponent";
import SalespersonComponent from "./salesperson/SalespersonComponent";
import InvoiceFormComponent from "./invoice-form/InvoiceFormComponent";
import SalesPersonFormComponent from "./salesperson-form/SalesPersonFormComponent";
import { getUserOrganizationInfo } from "utils/auth";
import axiosRequest from "utils/api";
import SalesOrderFormComponent from "./sales-order-form/SalesOrderFormComponent";
import CreditNotesComponent from "./credit-notes/CreditNotesComponent";
import CreditNoteComponent from "./credit-note/CreditNoteComponent";
import CreditNoteFormComponent from "./credit-note-form/CreditNoteFormComponent";

const SalesModuleLayout = () => {
    const navRoutes = [
        {
            name: "Dashboard",
            path: "/",
            icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
            component: <SalesDashboardComponent />,
        },
    ];

    const { organizationId } = useParams();
    axiosRequest.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(organizationId + "-organization-token")}`;
    const user = getUserOrganizationInfo(organizationId);

    if (user?.permissions?.includes("View Customers")) {
        navRoutes.push({
            name: "Customers",
            path: "/customers",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <CustomersComponent />,
        });
    }

    if (user?.permissions?.includes("View Sales Persons")) {
        navRoutes.push({
            name: "Sales Persons",
            path: "/salespersons",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <SalespersonsComponent />,
        });
    }

    if (user?.permissions?.includes("View Sales Orders")) {
        navRoutes.push({
            name: "Sales Orders",
            path: "/sales-orders",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <SalesOrdersComponent />,
        });
    }

    if (user?.permissions?.includes("View Invoices")) {
        navRoutes.push({
            name: "Invoices",
            path: "/invoices",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <InvoicesComponent />,
        });
    }
    if (user?.permissions?.includes("View Credit Notes")) {
        navRoutes.push({
            name: "Credit Notes",
            path: "/credit-notes",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <CreditNotesComponent />,
        });
    }

    // if (user?.permissions?.includes("View Sales Receipts")) {
    //     navRoutes.push({
    //         name: "Sales Receipts",
    //         path: "/sales-receipts",
    //         icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    //         component: <SalesReceiptsComponent />,
    //     });
    // }

    const salesRoutes = [
        ...navRoutes,
        {
            name: "New Customer",
            path: "/customers/new",
            component: <NewCustomerComponent />,
            excludeFromSideNav: true,
        },

        {
            name: "Edit Customer",
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
            path: "/invoices/:id/edit",
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
            name: "New Sales Person",
            path: "/salespersons/new",
            component: <SalesPersonFormComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "Edit Sales Person",
            path: "/salespersons/:id/edit",
            component: <SalesPersonFormComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "New Credit Note",
            path: "/credit-notes/new",
            component: <CreditNoteFormComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "Edit Credit Note",
            path: "/credit-notes/:id/edit",
            component: <CreditNoteFormComponent />,
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
            path: "/salespersons/:id",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <SalespersonComponent />,
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
        {
            name: "Credit Note",
            path: "/credit-notes/:id",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <CreditNoteComponent />,
            excludeFromSideNav: true,
        },
    ];
    return (
        <NavigationComponent baseRoute={`/admin/organizations/${organizationId}/modules/sales`} routes={salesRoutes}>
            <Routes>
                {salesRoutes.map((route, idx) => {
                    return <Route key={idx} path={route.path} element={route.component} />;
                })}
            </Routes>
        </NavigationComponent>
    );
};

export default SalesModuleLayout;
