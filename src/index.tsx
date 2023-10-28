import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "./app/sign-in/SignInLayout";
import AdminLayout from "./app/admin/AdminLayoutComponent";
import { ChakraProvider, ColorModeProvider, Progress, useToast } from "@chakra-ui/react";
import theme from "./theme/theme";
import { Provider, useDispatch, useSelector } from "react-redux";
import axiosRequest from "utils/api";
import { hideProgress } from "state/slices/progressSlice";
import { store } from "state/store";
import axios from "axios";
import { apiBaseUrl } from "environment";

let responseInterceptorActive = false;

const App = () => {
    const toast = useToast();
    const dispatch = useDispatch();

    const showProgress = useSelector((state: any) => {
        return state.progress.show;
    });

    axiosRequest.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    const [tenantKey, setTenantKey] = useState("");

    if (!responseInterceptorActive) {
        axiosRequest.interceptors.response.use(
            (response) => {
                dispatch(hideProgress());
                return response;
            },
            (error) => {
                dispatch(hideProgress());

                toast({
                    title: "Error",
                    description: `${error.message}: ${error.response.data.message || "Unknown error occurred"}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                });

                return Promise.reject(error);
            }
        );

        responseInterceptorActive = true;
    }

    useEffect(() => {
        getAccountByIdentifier(tenantKey, "sub-domain");
    }, [responseInterceptorActive]);

    const getAccountByIdentifier = async (identifier: string, option: "sub-domain" | "first-path" | "local-storage") => {
        await axios
            .get(`${apiBaseUrl}UserManagement/GetAccountByIdentifier?accountIdentifier=${identifier}`)
            .then(() => {
                if (option === "first-path") {
                    localStorage.setItem("tenantKey", identifier);
                }

                axiosRequest.defaults.headers.common["TenantKey"] = identifier;
                setTenantKey(identifier);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);

                if (option === "local-storage") {
                    toast({
                        title: "Error",
                        description: error.response.data.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom-right",
                    });
                }

                if (option === "sub-domain") {
                    getAccountByIdentifier(window.location.pathname.split("/")[1], "first-path");
                }

                if (option === "first-path") {
                    getAccountByIdentifier(localStorage.getItem("tenantKey"), "local-storage");
                }
            });
    };

    return (
        <>
            {showProgress && <Progress size="sm" isIndeterminate width="full" position="fixed" top="0" left="0" zIndex="10" />}
            {tenantKey && (
                <Router>
                    <Routes>
                        <Route path="" element={<AuthLayout />} />
                        <Route path={tenantKey} element={<AuthLayout />} />

                        <Route path="auth/sign-in" element={<AuthLayout />} />
                        <Route path={`${tenantKey}/auth/sign-in`} element={<AuthLayout />} />

                        <Route path="admin/*" element={<AdminLayout />} />
                        <Route path={`${tenantKey}/admin/*`} element={<AdminLayout />} />
                        {/* <Redirect from="/" to="/admin" /> */}
                    </Routes>
                </Router>
            )}
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ChakraProvider theme={theme}>
        <React.StrictMode>
            <Provider store={store}>
                <ColorModeProvider>
                    <App />
                </ColorModeProvider>
            </Provider>
        </React.StrictMode>
    </ChakraProvider>
);
