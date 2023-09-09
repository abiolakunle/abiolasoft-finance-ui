import { Route, Routes, useLocation } from "react-router-dom";
import InventoryModuleLayout from "./modules/inventory-module/InventoryModuleLayout";
import SelectAModule from "./SelectAModule";

const AdminLayoutComponent = () => {
    let { pathname } = useLocation();

    return (
        <Routes>
            <Route path={`${pathname}/modules`} element={<SelectAModule />} />
            <Route
                path={`${pathname}/modules/inventory`}
                element={<InventoryModuleLayout />}
            />
        </Routes>
    );
};

export default AdminLayoutComponent;
