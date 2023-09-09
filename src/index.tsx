import React from "react";
import ReactDOM from "react-dom/client";
//import ReactDOM from "react-dom";
import "./assets/css/App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import AuthLayout from "./app/landing-pages/sign-in/SignInLayout";
import AdminLayout from "./app/admin/AdminLayoutComponent";
import { ChakraProvider, Progress } from "@chakra-ui/react";
import theme from "./theme/theme";
import { Provider, useSelector } from "react-redux";
import { store } from "state/store";
import axios from "axios";

const App = () => {
    const showProgress = useSelector((state: any) => {
        return state.progress.show;
    });
    // Set the default headers for axios
    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    return (
        <>
            {showProgress && (
                <Progress
                    size="sm"
                    isIndeterminate
                    width="full"
                    position="fixed"
                    top="0"
                    left="0"
                    zIndex="10"
                />
            )}
            <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                <Route path={`/admin`} component={AdminLayout} />
                {/* <Redirect from="/" to="/admin" /> */}
            </Switch>
        </>
    );
};

// ReactDOM.render(
//     <ChakraProvider theme={theme}>
//         <React.StrictMode>
//             <HashRouter>
//                 <Provider store={store}>
//                     <App />
//                 </Provider>
//             </HashRouter>
//         </React.StrictMode>
//     </ChakraProvider>,
//     document.getElementById("root")
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ChakraProvider theme={theme}>
        <React.StrictMode>
            <HashRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </HashRouter>
        </React.StrictMode>
    </ChakraProvider>
);
