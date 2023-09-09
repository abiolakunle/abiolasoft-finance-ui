import { Route, Routes } from "react-router-dom";
import InventoryModuleLayout from "./modules/inventory-module/InventoryModuleLayout";
import SelectAModule from "./SelectAModule";

const AdminLayoutComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<SelectAModule />} />
            <Route path="/modules" element={<SelectAModule />} />
            <Route
                path="modules/inventory/*"
                element={<InventoryModuleLayout />}
            />
        </Routes>
    );
};

export default AdminLayoutComponent;
