import { Card, Flex, Box, Heading, IconButton, CloseButton, Stat, StatLabel, StatNumber, Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit, MdSettings } from "react-icons/md";
import { useEffect, useState } from "react";
import { HSeparator } from "components/separator/Separator";
import axiosRequest from "utils/api";
import { ChevronDownIcon } from "@chakra-ui/icons";

const SalesPersonComponent = () => {
    const { id } = useParams();

    let navigate = useNavigate();

    const [salesPerson, setSalesPerson] = useState({
        id: "",
        name: "",
        email: "",
    });

    useEffect(() => {
        if (id) {
            axiosRequest
                .get(`Sales/GetCustomerById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data?.items;
                    if (!!data) {
                        setSalesPerson({...data, ...salesPerson});
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);

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
                    Sales Person
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <IconButton
                                
                                aria-label="Call Fred" 
                                 
                                icon={<MdSettings />} 
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem >Delete</MenuItem>
                            
                        </MenuList>
                    </Menu>
                    
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/customers/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/customers`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Sales Person's Name</StatLabel>
                                <StatNumber>{salesPerson.name || "--"}</StatNumber>
                            </Stat>
                        </Box>

                       
                    </Flex>
                    
                    <HSeparator mb="16px" />
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Email Address</StatLabel>
                                <StatNumber>{salesPerson.email || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default SalesPersonComponent;
