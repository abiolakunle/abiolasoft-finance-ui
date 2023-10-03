import { Box, Flex, Heading, Icon, Link, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import IconBox from "components/icons/IconBox";
import { Text } from "@chakra-ui/react";
import { MdBarChart } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { getUserInfo } from "utils/auth";

const SelectAModule = () => {
    const user = getUserInfo();
    const modules = [];

    if (user.permissions.includes("View Inventory Module")) {
        modules.push({ name: "Inventory", path: "inventory" });
    }

    if (user.permissions.includes("View Purchases Module")) {
        modules.push({ name: "Purchase", path: "purchases" });
    }

    if (user.permissions.includes("View Sales Module")) {
        modules.push({ name: "Sales", path: "sales" });
    }

    if (user.permissions.includes("View User Management Module")) {
        modules.push({ name: "User Management", path: "user-management" });
    }

    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    return (
        <Box marginLeft="auto" marginRight="auto" maxW="768px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Box mb={{ sm: "8px", md: "16px" }}>
                <Heading as="h2" size="xl">
                    Modules
                </Heading>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2, "2xl": 2 }} gap="20px" mb="20px">
                {modules.map((module, idx) => {
                    return (
                        <ChakraLink as={ReactRouterLink} to={`/admin/modules/${module.path}`} key={idx}>
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
