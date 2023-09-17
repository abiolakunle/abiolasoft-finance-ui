import { Box, Heading, Flex, Card, CloseButton } from "@chakra-ui/react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { apiBaseUrl } from "environment";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const ManageUserRolesComponent = () => {
    const [roles, setRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);

    const location = useLocation();
    const { id: userId } = useParams();

    useEffect(() => {
        if (userId) {
            Promise.all([axios.get(apiBaseUrl + `UserManagement/GetUserById?id=${userId}`), axios.get(apiBaseUrl + `UserManagement/GetAllRoles`)])
                .then((response) => {
                    const user = response[0].data?.data;
                    const allRoles: any[] = response[1].data?.data;
                    setUserRoles(allRoles.filter((d: any) => user.roles.some((a: any) => a.id === d.id)));
                    setRoles(allRoles);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [userId]);

    const onUserRolesChanged = async (newValue: any[]) => {
        if (newValue.length > userRoles.length) {
            await addRole();
        } else {
            await removeRole();
        }

        async function removeRole() {
            const removed = userRoles.filter((r) => !newValue.some((v) => v.id === r.id));

            try {
                const response = await axios.put(apiBaseUrl + "UserManagement/RemoveUserFromRole", { roleName: removed[0].name, userId });

                if (response.status === 200) {
                    // Handle success
                } else {
                    console.error("Error creating item");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        async function addRole() {
            const role = newValue[newValue.length - 1];

            try {
                const response = await axios.put(apiBaseUrl + "UserManagement/AssignRoleToUser", { roleName: role.name, userId });

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
                        {userRoles.length ? (
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={roles}
                                getOptionLabel={(option) => option.name}
                                defaultValue={userRoles}
                                isOptionEqualToValue={(opt, val) => val.id === opt.id}
                                filterSelectedOptions
                                onChange={(event, newValue) => {
                                    onUserRolesChanged(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        ) : null}
                    </ThemeProvider>
                </Card>
            </Box>
        </>
    );
};

export default ManageUserRolesComponent;
