import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import PurchaseOrdersTableComponent from "./PurchaseOrdersTableComponent";
import axiosRequest from "utils/api";
import { pageSize } from "variables/constant-values";
import Permitted from "app-components/Permitted/Permitted";

const PurchaseOrdersComponent = () => {
    const [data, setData] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        axiosRequest
            .get(`Purchases/GetAllPurchaseOrders?PageIndex=${pageIndex}&PageSize=${pageSize}`)
            .then((response) => {
                if (response.data && response.data.data) {
                    setData(response.data.data.items);
                    setTotalPages(response.data.data.totalPages);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [pageIndex]);

    const handlePageChange = (newPageIndex: number) => {
        setPageIndex(newPageIndex);
    };

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
                <Permitted to="Create Purchase Order">
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/purchases/purchase-orders/new`}>
                        <Button leftIcon={<Icon as={MdAdd} width="20px" height="20px" color="inherit" />} variant="brand">
                            New
                        </Button>
                    </ChakraLink>
                </Permitted>
                
            </Flex>
            <Box pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
                    {data && <PurchaseOrdersTableComponent tableData={data} />}
                </SimpleGrid>
            </Box>

            <Box display="flex" justifyContent="center" marginTop="20px">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button key={index} variant={pageIndex === index + 1 ? "brand" : "outline"} onClick={() => handlePageChange(index + 1)} mr="2">
                        {index + 1}
                    </Button>
                ))}
            </Box>
        </>
    );
};

export default PurchaseOrdersComponent;
