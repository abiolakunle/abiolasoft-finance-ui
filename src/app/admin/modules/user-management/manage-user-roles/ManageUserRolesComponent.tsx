import { Box, Heading, Flex, Card, CloseButton, Text, useToast } from "@chakra-ui/react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axiosRequest from "utils/api";

const ManageUserRolesComponent = () => {
    const [roles, setRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [intialRoles, setInitialRoles] = useState([]);

    const location = useLocation();
    const { id: userId } = useParams();

    useEffect(() => {
        if (userId) {
            Promise.all([axiosRequest.get(`UserManagement/GetUserById?id=${userId}`), axiosRequest.get(`UserManagement/GetAllRoles`)])
                .then((response) => {
                    const user = response[0].data?.data;
                    const allRoles: any[] = response[1].data?.data;
                    const usrRoles = allRoles.filter((d: any) => user.roles.some((a: any) => a.id === d.id));
                    setUserRoles(usrRoles);
                    setInitialRoles(usrRoles);
                    setRoles(allRoles);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [userId]);

    async function removeRoles(roleNames: any[]) {
        try {
            const response = await axiosRequest.put("UserManagement/RemoveUserFromRoles", { roleNames, userId });

            if (response.status === 200) {
                // Handle success
            } else {
                console.error("Error creating item");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function addRole(newVal: any[]) {
        const role = newVal[newVal.length - 1];

        try {
            const response = await axiosRequest.put("UserManagement/AssignRoleToUser", { roleName: role.name, userId });

            if (response.status === 200) {
                // Handle success
            } else {
                console.error("Error creating item");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const onUserRolesChanged = async (newValue: any[]) => {
        if (newValue.length === 0) {
            await removeRoles(userRoles.map((r) => r.name));
            return;
        }

        const removed = userRoles.find((r) => !newValue.some((v) => v.id === r.id));
        if (removed) {
            await removeRoles([removed.name]);
        } else {
            addRole(newValue);
        }

        setUserRoles(newValue);
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
                    Manage Roles - {location.state?.userName}
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/user-management/users/${userId}`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" py="16px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <ThemeProvider theme={createTheme()}>
                        {roles.length ? (
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={roles}
                                getOptionLabel={(option) => option.name}
                                defaultValue={intialRoles}
                                isOptionEqualToValue={(opt, val) => val.id === opt.id}
                                filterSelectedOptions
                                onChange={(_event, newValue) => {
                                    onUserRolesChanged(newValue);
                                }}
                                renderInput={(params) => <TextField placeholder="Add role" {...params} />}
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

export default ManageUserRolesComponent;
