import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import CustomerSalesInfoTableComponent from "./CustomerSalesInfoTableComponent";
import axios from "axios";
import { apiBaseUrl } from "environment";
import { MdAdd } from "react-icons/md";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const CustomerSalesComponent = () => {
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        // Make an Axios GET request to the API endpoint
        axios
            .get(apiBaseUrl + "api/Sales/GetAllCustomers/")
            .then((response) => {
                // Assuming the API response is in the expected format
                if (response.data && response.data.data) {
                    setTableData(response.data.data.items);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <Flex
                pt={{ base: "130px", md: "80px", xl: "80px" }}
                my="0px"
                h="fit-content"
                align={{ base: "center", xl: "center" }}
                justify={{
                    base: "flex-end",
                    xl: "flex-end",
                }}
                gap="20px"
            >
                <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/customers/new`}>
                    <Button leftIcon={<Icon as={MdAdd} width="20px" height="20px" color="inherit" />} variant="brand">
                        Add New Customer
                    </Button>
                </ChakraLink>
                
            </Flex>
            <Box pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
                    {tableData && <CustomerSalesInfoTableComponent tableData={tableData} />}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default CustomerSalesComponent;
