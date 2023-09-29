import { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import RolesTableComponent from "./RolesTableComponent";
import { MdAdd } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axiosRequest from "utils/api";

const RolesComponent = () => {
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        axiosRequest
            .get("UserManagement/GetAllRoles")
            .then((response) => {
                if (response.data && response.data.data) {
                    setTableData(response.data.data);
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
                <ChakraLink as={ReactRouterLink} to={`/admin/modules/user-management/roles/new`}>
                    <Button leftIcon={<Icon as={MdAdd} width="20px" height="20px" color="inherit" />} variant="brand">
                        New
                    </Button>
                </ChakraLink>
            </Flex>
            <Box pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
                    {tableData && <RolesTableComponent tableData={tableData} />}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default RolesComponent;
