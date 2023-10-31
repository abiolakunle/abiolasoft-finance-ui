import { Box, Button, Flex, Heading, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import IconBox from "components/icons/IconBox";
import { Text } from "@chakra-ui/react";
import { MdAdd, MdBarChart } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { getUserInfo } from "utils/auth";
import axiosRequest from "utils/api";
import { useEffect, useState } from "react";

const Organizations = () => {
    const user = getUserInfo();
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        axiosRequest
            .get(`UserManagement/GetAccountPersonById?id=${user?.personId}`)
            .then((response) => {
                if (response.data && response.data.data) {
                    setOrganizations(response.data.data.organizations);
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
            <Flex
                justifyContent="space-between"
                alignItems="center"
                mb={{ sm: "8px", md: "16px" }}
                mt={{ sm: "32px", md: "32px" }}
                ml={{ sm: "16px", md: "16px" }}
                mr={{ sm: "16px", md: "16px" }}
            >
                <Heading as="h2" size="xl">
                    Organizations
                </Heading>

                <ChakraLink as={ReactRouterLink} to={`/admin/organizations/new`}>
                    <Button leftIcon={<Icon as={MdAdd} width="20px" height="20px" color="inherit" />} variant="brand">
                        New Organization
                    </Button>
                </ChakraLink>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2, "2xl": 2 }} gap="20px" mb="20px" ml={{ sm: "16px", md: "16px" }} mr={{ sm: "16px", md: "16px" }}>
                {organizations.map((org, idx) => {
                    return (
                        <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${org.organizationId}/modules`} key={idx}>
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
                                        <Text fontSize="xl">{org.name}</Text>
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

export default Organizations;
