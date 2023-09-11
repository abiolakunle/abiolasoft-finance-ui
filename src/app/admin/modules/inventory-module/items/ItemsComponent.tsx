import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import ItemsTableComponent from "./ItemsTableComponent";
import axios from "axios";
import { apiBaseUrl } from "environment";
import { MdAdd } from "react-icons/md";

const ItemsComponent = () => {
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        // Make an Axios GET request to the API endpoint
        axios
            .get(apiBaseUrl + "api/Inventory/GetAllItems")
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
                <Button onClick={() => console.log("")} leftIcon={<Icon as={MdAdd} width="20px" height="20px" color="inherit" />} variant="brand">
                    Add
                </Button>
            </Flex>
            <Box pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
                    {tableData && <ItemsTableComponent tableData={tableData} />}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default ItemsComponent;
