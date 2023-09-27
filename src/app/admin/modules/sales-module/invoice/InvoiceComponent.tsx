import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit } from "react-icons/md";
// import SalesOrderFormComponent from "../sales-order-form/SalesOrderFormComponent";
// import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { apiBaseUrl } from "environment";
import axios from "axios";
import NewInvoiceFormComponent from "../invoice-form/InvoiceFormComponent";
import { Card, Flex, Box, Heading, IconButton, CloseButton, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { HSeparator } from "components/separator/Separator";
import axiosRequest from "utils/api";

const InvoiceFormComponent = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState({
        id: "",
        date: "",
        number: "",
        customerName: "",
        status: "",
        dueDate: "",
        orderNumber: "",
        salesPersonName: "",
    });

    useEffect(() => {
        if (id) {
            axiosRequest
                .get(`Sales/GetInvoicesById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setOrder({
                            id,
                            date: data.date,
                            number: data.number,
                            customerName: data.customerName,
                            status: data.status,
                            dueDate: data.dueDate,
                            orderNumber: data.orderNumber,
                            salesPersonName: data.salesPersonName,
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
                mb="-130px"
                align={{ base: "center", xl: "center" }}
                justify={{
                    base: "space-between",
                    xl: "space-between",
                }}
                gap="20px"
            >
                <Heading as="h4" size="md">
                    Sales Order
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    {/* <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Convert
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={convertToInvoice}>Convert to Invoice</MenuItem>
                            <MenuItem onClick={instantInvoice}>Instant Invoice</MenuItem>
                        </MenuList>
                    </Menu> */}
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/invoice/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/invoices`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <NewInvoiceFormComponent viewOnly={true} />
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>CUSTOMER NAME</StatLabel>
                                <StatNumber>{order.customerName || "--"}</StatNumber>
                            </Stat>
                        </Box>

                        <Box w="40%">
                            <Stat>
                                <StatLabel>INVOICE ID</StatLabel>
                                <StatNumber>{order.number || "--"}</StatNumber>
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
                                <StatLabel>ORDER NUMBER</StatLabel>
                                <StatNumber>{order.orderNumber || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <HSeparator mb="16px" />
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>DUE DATE</StatLabel>
                                <StatNumber>{order.dueDate || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default InvoiceFormComponent;
