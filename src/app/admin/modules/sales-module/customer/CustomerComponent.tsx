import {
    Card,
    Flex,
    Box,
    Heading,
    IconButton,
    CloseButton,
    Stat,
    StatLabel,
    StatNumber,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    useDisclosure,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { HSeparator } from "components/separator/Separator";
import axiosRequest from "utils/api";
import { ChevronDownIcon } from "@chakra-ui/icons";
import IfUserIsPermitted from "app-components/if-user-is-permitted/IfUserIsPermitted";
import DeleteModal from "app-components/delete-modal/DeleteModal";

const CustomerComponent = () => {
    const { id, organizationId } = useParams();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const redirect = `/admin/organizations/${organizationId}/modules/sales/customers`;

    const deleteEndpoint = `Sales/DeleteCustomer`;

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
            axiosRequest
                .get(`Sales/GetCustomerById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setCustomer({
                            id,
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
                    Customer
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <IfUserIsPermitted to="Edit Customer">
                        <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/sales/customers/${id}/edit`}>
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Edit" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </IfUserIsPermitted>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <IfUserIsPermitted to="Delete Customer">
                            <MenuList>
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </MenuList>
                        </IfUserIsPermitted>

                        <DeleteModal redirect={redirect} id={id} deleteEndpoint={deleteEndpoint} isOpen={isOpen} onClose={onClose} />
                    </Menu>

                    <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/sales/customers`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex justifyContent="space-between" mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>FIRST NAME</StatLabel>
                                <StatNumber>{customer.customerFirstName || "--"}</StatNumber>
                            </Stat>
                        </Box>

                        <Box w="45%">
                            <Stat>
                                <StatLabel>LAST NAME</StatLabel>
                                <StatNumber>{customer.customerLastName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <Flex justifyContent="space-between" mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>DISPLAY NAME</StatLabel>
                                <StatNumber>{customer.customerDisplayName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="45%">
                            <Stat>
                                <StatLabel>COMPANY NAME</StatLabel>
                                <StatNumber>{customer.companyName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <HSeparator mb="16px" />
                    <Flex justifyContent="space-between" mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>PHONE NUMBER</StatLabel>
                                <StatNumber>{customer.customerPhone || "--"}</StatNumber>
                            </Stat>
                        </Box>

                        <Box w="45%">
                            <Stat>
                                <StatLabel>E-MAIL</StatLabel>
                                <StatNumber>{customer.customerEmail}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <Flex justifyContent="space-between" mb="16px" minH="80px">
                        <Box w="40%">
                            <Stat>
                                <StatLabel>ADDRESS</StatLabel>
                                <StatNumber>{customer.customerAddress}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default CustomerComponent;
