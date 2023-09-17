import { Card, Text, Flex, Box, Heading, IconButton, Button, CloseButton, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "environment";
import axios from "axios";
import { HSeparator } from "components/separator/Separator";

const CustomerComponent = () => {
    const { id } = useParams();

    let navigate = useNavigate();

    const [customer, setCustomer] = useState({
        id: "",
        customerFirstName: "",
        customerLastName: "",
        companyName: "",
        customerDisplayName: "",
        customerEmail: "",
        customerPhone: "",
        customerAddress: "",
    });

    useEffect(() => {
        if (id) {
            axios
                .get(apiBaseUrl + `Sales/GetCustomersById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setCustomer({
                            id: data.id,
                            customerFirstName: data.customerFirstName,
                            customerLastName: data.customerLastName,
                            companyName: data.companyName,
                            customerDisplayName: data.customerDisplayName,
                            customerEmail: data.customerEmail,
                            customerPhone: data.customerPhone,
                            customerAddress: data.customerAddress,
                            
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);

    // const gotoAdjustStock = () => {
    //     navigate(`/admin/modules/inventory/items/${id}/inventory-adjustment`, { state: { itemName: item.name } });
    // };

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
                    {customer.customerFirstName}"   " {customer.customerLastName}
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/items/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>

                    {/* <Button variant="brand" onClick={gotoAdjustStock}>
                        Adjust Stock
                    </Button> */}

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/customerssalesinfo`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>DISPLAY NAME</StatLabel>
                                <StatNumber>{customer.customerDisplayName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="40%">
                            <Stat>
                                <StatLabel>PHONE NUMBER</StatLabel>
                                <StatNumber>{customer.customerPhone || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>COMPANY NAME</StatLabel>
                                <StatNumber>{customer.companyName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <HSeparator mb="16px" />
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>E-MAIL</StatLabel>
                                <StatNumber>{customer.customerEmail}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="40%">
                            <Stat>
                                <StatLabel>ADDRESS</StatLabel>
                                <StatNumber>{customer.customerAddress}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    {/* <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Reorder Point</StatLabel>
                                <StatNumber>{item.reorderPoint}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <HSeparator mb="16px" />
                    <Flex mb="16px">
                        <Box w="45%">
                            <Text fontSize="lg" mb="18px">
                                Sales Information
                            </Text>

                            <Flex direction="column">
                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Selling Price</StatLabel>
                                    <StatNumber>{item.sellingPrice}</StatNumber>
                                </Stat>

                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Selling Price Description</StatLabel>
                                    <StatNumber>{item.sellingDescription || "--"}</StatNumber>
                                </Stat>
                            </Flex>
                        </Box>
                        <Box w="40%">
                            <Text fontSize="lg" mb="18px">
                                Purchase Information
                            </Text>

                            <Flex direction="column">
                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Cost Price</StatLabel>
                                    <StatNumber>{item.costPrice}</StatNumber>
                                </Stat>

                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Cost Price Description</StatLabel>
                                    <StatNumber>{item.costDescription || "--"}</StatNumber>
                                </Stat>
                            </Flex>
                        </Box>
                    </Flex> */}
                </Card>
            </Box>
        </>
    );
};

export default CustomerComponent;
