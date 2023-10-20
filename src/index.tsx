import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "./app/landing-pages/sign-in/SignInLayout";
import AdminLayout from "./app/admin/AdminLayoutComponent";
import { ChakraProvider, ColorModeProvider, Progress, useToast } from "@chakra-ui/react";
import theme from "./theme/theme";
import { Provider, useDispatch, useSelector } from "react-redux";
import axiosRequest from "utils/api";
import { hideProgress } from "state/slices/progressSlice";
import { store } from "state/store";
import SaaSProductLandingPage from "app/landing-pages/SaaSProductLandingPage";

let responseInterceptorActive = false;

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
            <Router>
                <Routes>
                    <Route path="/" element={<SaaSProductLandingPage />} />
                    <Route path="auth" element={<AuthLayout />} />
                    <Route path="admin/*" element={<AdminLayout />} />
                    {/* <Redirect from="/" to="/admin" /> */}
                </Routes>
            </Router>
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
