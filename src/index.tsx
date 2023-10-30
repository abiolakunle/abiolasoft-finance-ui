import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
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

const AppRoutes = () => {
    const toast = useToast();
    const [tenantKey, setTenantKey] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const subDomain = window.location.hostname.split(".")[0];
        getAccountByIdentifier(subDomain, "sub-domain");
    }, [responseInterceptorActive]);

    const getAccountByIdentifier = async (key: string, option: "sub-domain" | "first-path" | "local-storage") => {
        await axios
            .get(`${apiBaseUrl}UserManagement/GetAccountByIdentifier?accountIdentifier=${key}`)
            .then((response) => {
                if (option === "first-path") {
                    localStorage.setItem("tenantKey", key);
                }

                if (response.data.status) {
                    axiosRequest.defaults.headers.common["TenantKey"] = key;
                    setTenantKey(key);
                    const paths = window.location.pathname.split("/");
                    if (paths.length === 1) {
                        navigate(key);
                    } else {
                        if (paths[1] !== key) paths[0] = key;
                        navigate(paths.join("/"));
                    }
                }
            })
            .catch((error) => {
                if (option === "local-storage") {
                    toast({
                        title: "Error",
                        description: error.response?.data?.message,
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
        tenantKey && (
            <Routes>
                <Route path="" element={<AuthLayout />} />
                <Route path={tenantKey} element={<AuthLayout />} />

                <Route path="auth/sign-in" element={<AuthLayout />} />
                <Route path={`${tenantKey}/auth/sign-in`} element={<AuthLayout />} />

                <Route path="admin/*" element={<AdminLayout />} />
                <Route path={`${tenantKey}/admin/*`} element={<AdminLayout />} />
                {/* <Redirect from="/" to="/admin" /> */}
            </Routes>
        )
    );
};

const App = () => {
    const toast = useToast();
    const dispatch = useDispatch();

    const showProgress = useSelector((state: any) => {
        return state.progress.show;
    });

    axiosRequest.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

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

    return (
        <>
            {showProgress && <Progress size="sm" isIndeterminate width="full" position="fixed" top="0" left="0" zIndex="10" />}
            {
                <Router>
                    <AppRoutes />
                </Router>
            }
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ChakraProvider theme={theme}>
        {/* <React.StrictMode> */}
        <Provider store={store}>
            <ColorModeProvider>
                <App />
            </ColorModeProvider>
        </Provider>
        {/* </React.StrictMode> */}
    </ChakraProvider>
);
