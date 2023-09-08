import { Route, Switch, useRouteMatch } from "react-router-dom";
import InventoryModuleLayout from "./modules/inventory-module/InventoryModuleLayout";
import SelectAModule from "./SelectAModule";

const AdminLayoutComponent = () => {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/modules`} component={SelectAModule} />
            <Route
                path={`${path}/modules/inventory`}
                component={InventoryModuleLayout}
            />
        </Switch>
    );
};

export default AdminLayoutComponent;
