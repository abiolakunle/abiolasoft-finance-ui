import { Route, Routes } from "react-router-dom";
import InventoryModuleLayout from "./modules/inventory-module/InventoryModuleLayout";
import SelectAModule from "./SelectAModule";
import PurchaseModuleLayout from "./modules/purchases-module/PurchaseModuleLayout";
import SalesModuleLayout from "./modules/sales-module/SalesModuleLayout";

const AdminLayoutComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<SelectAModule />} />
            <Route path="/modules" element={<SelectAModule />} />
            <Route path="modules/inventory/*" element={<InventoryModuleLayout />} />
            <Route path="modules/purchases/*" element={<PurchaseModuleLayout />} />
            <Route path="modules/sales/*" element={<SalesModuleLayout />} />
        </Routes>
    );
};

export default AdminLayoutComponent;
