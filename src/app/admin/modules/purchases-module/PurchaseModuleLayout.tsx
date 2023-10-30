import { Icon } from "@chakra-ui/react";
import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { MdHome, MdList } from "react-icons/md";
import { Route, Routes, useParams } from "react-router-dom";
import VendorsComponent from "./vendors/VendorsComponent";
import PurchaseOrdersComponent from "./purchase-orders/PurchaseOrdersComponent";
import PurchasesDashboardComponent from "./purchases-dashboard/PurchasesDashboardComponent";
import PurchaseOrderFormComponent from "./purchase-order-form/PurchaseOrderFormComponent";
import PurchaseOrderComponent from "./purchase-order/PurchaseOrderComponent";
import VendorComponent from "./vendor/VendorComponent";
import VendorFormComponent from "./vendor-form/VendorFormComponent";
import { getUserInfo, getUserOrganizationInfo } from "utils/auth";
import axiosRequest from "utils/api";
import BillsComponent from "./bills/BillsComponent";

const PurchaseModuleLayout = () => {
    const navRoutes = [
        {
            name: "Dashboard",
            path: "/",
            icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
            component: <PurchasesDashboardComponent />,
        },

        // {
        //     name: "Purchase Receives",
        //     path: "/purchase-receives",
        //     icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        //     component: <PurchaseReceivesComponent />,
        // },
        // {
        //     name: "Payments Made",
        //     path: "/payment-made",
        //     icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        //     component: <PaymentMadeComponent />,
        // },
        // {
        //     name: "Purchase Receipts",
        //     path: "/purchase-receipts",
        //     icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        //     component: <PurchaseReceiptsComponent />,
        // },
    ];

    const { organizationId } = useParams();
    axiosRequest.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(organizationId + "-organization-token")}`;
    const user = getUserOrganizationInfo(organizationId);

    if (user?.permissions?.includes("View Purchase Orders")) {
        navRoutes.push({
            name: "Purchase Orders",
            path: "/purchase-orders",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <PurchaseOrdersComponent />,
        });
    }

    //if (user?.permissions?.includes("View Bills")) {
    navRoutes.push({
        name: "Bills",
        path: "/bills",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
        component: <BillsComponent />,
    });
    //}

    if (user?.permissions?.includes("View Vendors")) {
        navRoutes.push({
            name: "Vendors",
            path: "/vendors",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <VendorsComponent />,
        });
    }

    const purchaseRoutes = [
        ...navRoutes,
        {
            name: "Dashboard",
            path: "",
            icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
            component: <PurchasesDashboardComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "New Purchase Order",
            path: "/purchase-orders/new",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <PurchaseOrderFormComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "New Purchase Order",
            path: "/purchase-orders/:id/edit",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <PurchaseOrderFormComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "Purchase Order",
            path: "/purchase-orders/:id",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <PurchaseOrderComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "Vendor",
            path: "/vendors/:id",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <VendorComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "New Vendor",
            path: "/vendors/new",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <VendorFormComponent />,
            excludeFromSideNav: true,
        },
        {
            name: "Edit Vendor",
            path: "/vendors/:id/edit",
            icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
            component: <VendorFormComponent />,
            excludeFromSideNav: true,
        },
    ];

    return (
        <NavigationComponent baseRoute={`/admin/organizations/${organizationId}/modules/purchases`} routes={purchaseRoutes}>
            <Routes>
                {purchaseRoutes.map((route, idx) => {
                    return <Route key={idx} path={route.path} element={route.component} />;
                })}
            </Routes>
        </NavigationComponent>
    );
};

export default PurchaseModuleLayout;
