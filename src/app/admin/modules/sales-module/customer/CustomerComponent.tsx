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
    Toast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit, MdSettings } from "react-icons/md";
import { useEffect, useState } from "react";
import { HSeparator } from "components/separator/Separator";
import axiosRequest from "utils/api";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";

const CustomerComponent = () => {
    const { id } = useParams();

    let navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const submit = async () => {
        try {
            await axiosRequest.delete(`Sales/DeleteCustomer`, { data: { id } });
            toast.success("Deleted Successfully")
            navigate(`/admin/modules/sales/customers`)

        } catch (error) {
            console.error("Error:", error);
        }
    };

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
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/customers/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onOpen}>Delete</MenuItem>
                        </MenuList>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Delete Customer</ModalHeader>
                                
                                <ModalBody>Are You Sure You Want To Delete?</ModalBody>
                                <ModalFooter>
                                    <Button variant="ghost" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="red" mr={3} onClick={submit}>
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Menu>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/customers`}>
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
