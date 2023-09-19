import { Card, Text, Flex, Box, Heading, IconButton, Button, CloseButton, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "environment";
import axios from "axios";
import { HSeparator } from "components/separator/Separator";

const OrderComponent = () => {
    const { id } = useParams();

    let navigate = useNavigate();

    const [order, setOrder] = useState({
        id: "",
        date: "",
        reference: "",
        salesPersonName: "",
        
        status: "",
        discount: "",
        customerNotes: "",
    });

    useEffect(() => {
        if (id) {
            axios
                .get(apiBaseUrl + `Sales/GetSalesOrdersById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setOrder({
                            id,
                            date: data.date,
                            reference: data.reference,
                            salesPersonName: data.SalesPersonName,
                            status: data.status,
                            discount: data.discount,
                            customerNotes: data.customerNotes,
                            
                        });
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
                    SALES ORDER
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/customers/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/sales-orders`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex mb="16px" minH="80px">

                        <Box w="45%">
                            <Stat>
                                <StatLabel>REFERENCE ID</StatLabel>
                                <StatNumber>{order.reference || "--"}</StatNumber>
                            </Stat>
                        </Box>

                        <Box w="45%">
                            <Stat>
                                <StatLabel>STATUS</StatLabel>
                                <StatNumber>{order.status || "--"}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="45%">
                            <Stat>
                                <StatLabel>DATE</StatLabel>
                                <StatNumber>{order.date || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>SALES PERSON NAME</StatLabel>
                                <StatNumber>{order.salesPersonName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>DISCOUNT</StatLabel>
                                <StatNumber>{order.discount || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <HSeparator mb="16px" />
                    <Flex mb="16px" minH="80px">

                        <Box w="45%">
                            <Stat>
                                <StatLabel>CUSTOMER NOTE</StatLabel>
                                <StatNumber>{order.customerNotes || "--"}</StatNumber>
                            </Stat>
                        </Box>

                        
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default OrderComponent;
