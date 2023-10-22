import { Route, Routes } from "react-router-dom";
import InventoryModuleLayout from "./modules/inventory-module/InventoryModuleLayout";
import SelectAModule from "./SelectAModule";
import PurchaseModuleLayout from "./modules/purchases-module/PurchaseModuleLayout";
import SalesModuleLayout from "./modules/sales-module/SalesModuleLayout";
import UserManagementModuleLayout from "./modules/user-management/UserManagementModuleLayout";
import Organizations from "./Organizations";

const AdminLayoutComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Organizations />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organizations/:organizationId/modules" element={<SelectAModule />} />
            <Route path="modules/inventory/*" element={<InventoryModuleLayout />} />
            <Route path="modules/purchases/*" element={<PurchaseModuleLayout />} />
            <Route path="modules/user-management/*" element={<UserManagementModuleLayout />} />
            <Route path="modules/sales/*" element={<SalesModuleLayout />} />
        </Routes>
    );
};

export default AdminLayoutComponent;
