import { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import UsersTableComponent from "./UsersTableComponent";
import { MdAdd } from "react-icons/md";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axiosRequest from "utils/api";
import { pageSize } from "variables/constant-values";
import IfUserIsPermitted from "app-components/if-user-is-permitted/IfUserIsPermitted";

const UsersComponent = () => {
    const [tableData, setTableData] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { organizationId } = useParams();

    useEffect(() => {
        axiosRequest
            .get(`UserManagement/GetAllOrganizationPersons?PageIndex=${pageIndex}&PageSize=${pageSize}&organizationId=${organizationId}`)
            .then((response) => {
                if (response.data && response.data.data) {
                    setTableData(response.data.data.items);
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
                <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/user-management/users/new`}>
                    <IfUserIsPermitted to="Create User">
                        <Button leftIcon={<Icon as={MdAdd} width="20px" height="20px" color="inherit" />} variant="brand">
                            New
                        </Button>
                    </IfUserIsPermitted>
                </ChakraLink>
            </Flex>
            <Box pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
                    {tableData && <UsersTableComponent tableData={tableData} />}
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

export default UsersComponent;
