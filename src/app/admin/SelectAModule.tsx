import { Box, Flex, Heading, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import IconBox from "components/icons/IconBox";
import { Text } from "@chakra-ui/react";
import { MdBarChart } from "react-icons/md";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { getUserInfo, getUserOrganizationInfo } from "utils/auth";
import { useEffect, useState } from "react";
import axiosRequest from "utils/api";

const SelectAModule = () => {
    const user = getUserInfo();
    const [modules, setModules] = useState([]);
    const { organizationId } = useParams();

    useEffect(() => {
        axiosRequest
            .get(`UserManagement/GetAccountPersonOrganizationCredentials?personId=${user.personId}&organizationId=${organizationId}`)
            .then((response) => {
                const token = response?.data?.data?.token;
                if (token) {
                    axiosRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    localStorage.setItem(organizationId + "-organization-token", token);
                    const permissions = getUserOrganizationInfo(organizationId).permissions;

                    const mods = [];
                    if (permissions.includes("View Inventory Module")) {
                        mods.push({ name: "Inventory", path: "inventory/" });
                    }

                    if (permissions.includes("View Purchases Module")) {
                        mods.push({ name: "Purchase", path: "purchases/" });
                    }

                    if (permissions.includes("View Sales Module")) {
                        mods.push({ name: "Sales", path: "sales/" });
                    }

                    if (permissions.includes("View User Management Module")) {
                        mods.push({ name: "User Management", path: "user-management/" });
                    }

                    setModules(mods);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    return (
        <Box marginLeft="auto" marginRight="auto" maxW="768px" pt={{ base: "130px", sm: "32px", md: "80px", xl: "80px" }}>
            <Box mb={{ sm: "8px", md: "16px" }} mt={{ sm: "32px", md: "32px" }} ml={{ sm: "16px", md: "16px" }} mr={{ sm: "16px", md: "16px" }}>
                <Heading as="h2" size="xl">
                    Modules
                </Heading>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2, "2xl": 2 }} gap="20px" mb="20px" ml={{ sm: "16px", md: "16px" }} mr={{ sm: "16px", md: "16px" }}>
                {modules.map((module, idx) => {
                    return (
                        <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/${module.path}`} key={idx}>
                            <Card minH="150px" py="25px">
                                <Flex
                                    my="0px"
                                    h="100%"
                                    align={{ base: "center", xl: "start" }}
                                    justify={{
                                        base: "start",
                                        xl: "start",
                                    }}
                                    gap="20px"
                                >
                                    <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />} />
                                    <Box width="max" mt="10px">
                                        <Text fontSize="xl">{module.name}</Text>
                                    </Box>
                                </Flex>
                            </Card>
                        </ChakraLink>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

export default SelectAModule;
