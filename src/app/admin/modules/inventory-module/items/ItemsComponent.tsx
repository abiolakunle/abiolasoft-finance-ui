import { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, SimpleGrid } from "@chakra-ui/react";
import ItemsTableComponent from "./ItemsTableComponent";
import { MdAdd } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axiosRequest from "utils/api";
import { pageSize } from "variables/constant-values";
import { ChevronDownIcon } from "@chakra-ui/icons";

const ItemsComponent = () => {
    const [tableData, setTableData] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadData = () => {
        axiosRequest
            .get(`Inventory/GetAllItems?PageIndex=${pageIndex}&PageSize=${pageSize}`)
            .then((response) => {
                if (response.data && response.data.data) {
                    setTableData(response.data.data.items);
                    setTotalPages(response.data.data.totalPages);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        loadData();
    }, [pageIndex]);

    const handlePageChange = (newPageIndex: number) => {
        setPageIndex(newPageIndex);
    };

    const syncQuantities = async (type: "Sales" | "Purchase") => {
        try {
            const response = await axiosRequest.post(
                type === "Sales" ? "Sales/RecalculateSalesOrderItemsTotalQuantity" : "Purchases/RecalculatePurchaseOrderItemsTotalQuantity",
                {}
            );
            if (response.status === 200) {
                await loadData();
            } else {
                console.error("Error creating item");
            }
        } catch (error) {
            console.error("Error:", error);
        }
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
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Sync Quantities
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => syncQuantities("Purchase")}>Sync Purchases</MenuItem>
                        <MenuItem onClick={() => syncQuantities("Sales")}>Sync Sales</MenuItem>
                    </MenuList>
                </Menu>
                <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/items/new`}>
                    <Button leftIcon={<Icon as={MdAdd} width="20px" height="20px" color="inherit" />} variant="brand">
                        New
                    </Button>
                </ChakraLink>
            </Flex>
            <Box pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
                    {tableData && <ItemsTableComponent tableData={tableData} />}
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

export default ItemsComponent;
