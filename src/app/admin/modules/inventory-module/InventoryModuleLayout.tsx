import NavigationComponent from "app-components/navigation-layout/NavigationComponent";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import InventoryAdjustmentsComponent from "./inventory-adjustments/InventoryAdjustmentsComponent";
import InventoryDashboardComponent from "./inventory-dashboard/InventoryDashboardComponent";
import inventoryRoutes from "./inventory-routes";
import ItemsComponent from "./items/ItemsComponent";

const InventoryModuleLayout = () => {
    let { path } = useRouteMatch();

    return (
        <NavigationComponent routes={inventoryRoutes}>
            <Switch>
                <Route
                    exact
                    path={`${path}`}
                    component={InventoryDashboardComponent}
                />
                <Route path={`${path}/items`} component={ItemsComponent} />
                <Route
                    path={`${path}/inventory-adjustments`}
                    component={InventoryAdjustmentsComponent}
                />
            </Switch>
        </NavigationComponent>
    );
};

export default InventoryModuleLayout;
