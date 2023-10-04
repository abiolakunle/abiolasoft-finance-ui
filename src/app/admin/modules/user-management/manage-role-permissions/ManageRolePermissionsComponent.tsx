import { Box, Heading, Flex, Card, CloseButton, Text } from "@chakra-ui/react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axiosRequest from "utils/api";
import Permitted from "app-components/Permitted/Permitted";
import { getUserInfo } from "utils/auth";

const ManageRolePermissionsComponent = () => {
    const [permissions, setPermissions] = useState([]);
    const [rolePermissions, setRolePermissions] = useState([]);
    const [initialPermissions, setInitialRoles] = useState([]);

    const location = useLocation();
    const { id: roleId } = useParams();
    const user = getUserInfo();

    useEffect(() => {
        if (roleId) {
            Promise.all([axiosRequest.get(`UserManagement/GetRoleById?id=${roleId}`), axiosRequest.get(`UserManagement/GetAllPermissions`)])
                .then((response) => {
                    const role = response[0].data?.data;
                    const allPermissions: any[] = response[1].data?.data;
                    const usrRoles = allPermissions.filter((d: any) => role.permissions.some((a: any) => a === d));
                    setRolePermissions(usrRoles);
                    setInitialRoles(usrRoles);
                    setPermissions(allPermissions);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [roleId]);

    const onRolePermissionsChanged = async (newValue: any[]) => {

        if(!user?.permissions?.includes("Add Permission To Role") || !user?.permissions?.includes("Remove Permissions From Role")) {
            return;
        }

        if (newValue.length === 0) {
            await removePermissions(rolePermissions);
            return;
        }

        const removed = rolePermissions.find((r) => !newValue.some((v) => v === r));
        if (removed) {
            await removePermissions([removed]);
        } else {
            addAddPermission(newValue);
        }

        setRolePermissions(newValue);

        async function removePermissions(permissionValues: any[]) {

            if(!user?.permissions?.includes("Remove Permissions From Role")) {
                return;
            }
            try {
                const response = await axiosRequest.put("UserManagement/RemovePermissionsFromRole", { permissionValues, roleId });

                if (response.status === 200) {
                    // Handle success
                } else {
                    console.error("Error creating item");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        async function addAddPermission(newVal: any[]) {

            if(!user?.permissions?.includes("Add Permission To Role")) {
                return;
            }

            const permissionValue = newVal[newVal.length - 1];

            try {
                const response = await axiosRequest.put("UserManagement/AddPermissionToRole", { permissionValue, roleId });

                if (response.status === 200) {
                    // Handle success
                } else {
                    console.error("Error creating item");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
            <Flex
                pt={{ base: "130px", md: "80px", xl: "130px" }}
                my="0px"
                h="fit-content"
                align={{ base: "center", xl: "center" }}
                justify={{
                    base: "space-between",
                    xl: "space-between",
                }}
                gap="20px"
            >
                <Heading as="h4" size="md">
                    Manage Permissions - {location.state?.roleName}
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/user-management/roles/${roleId}`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" py="16px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    
                    <ThemeProvider theme={createTheme()}>
                        {permissions.length ? (
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={permissions}
                                getOptionLabel={(option) => option}
                                defaultValue={initialPermissions}
                                isOptionEqualToValue={(opt, val) => val === opt}
                                filterSelectedOptions
                                onChange={(_event, newValue) => {
                                    onRolePermissionsChanged(newValue);
                                }}
                                renderInput={(params) => <TextField placeholder="Add permission" {...params} />}
                            />
                        ) : (
                            <Text>Roles not configured yet</Text>
                        )}
                    </ThemeProvider>
                    
                    
                </Card>
            </Box>
        </>
    );
};

export default ManageRolePermissionsComponent;
