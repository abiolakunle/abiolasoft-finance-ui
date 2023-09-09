import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { Route, Routes, useLocation } from "react-router-dom";
import InventoryAdjustmentsComponent from "./inventory-adjustments/InventoryAdjustmentsComponent";
import InventoryDashboardComponent from "./inventory-dashboard/InventoryDashboardComponent";
import inventoryRoutes from "./inventory-routes";
import ItemsComponent from "./items/ItemsComponent";

const InventoryModuleLayout = () => {
    let { pathname } = useLocation();

    return (
        <NavigationComponent routes={inventoryRoutes}>
            <Routes>
                <Route
                    path={`${pathname}`}
                    element={<InventoryDashboardComponent />}
                />
                <Route
                    path={`${pathname}/items`}
                    element={<ItemsComponent />}
                />
                <Route
                    path={`${pathname}/inventory-adjustments`}
                    element={<InventoryAdjustmentsComponent />}
                />
            </Routes>
        </NavigationComponent>
    );
};

export default InventoryModuleLayout;
