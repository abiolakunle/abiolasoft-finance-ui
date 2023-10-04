import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure, useToast } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit } from "react-icons/md";
import SalesOrderFormComponent from "../sales-order-form/SalesOrderFormComponent";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axiosRequest from "utils/api";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from "@chakra-ui/react";
import { getUserInfo } from "utils/auth";
import Permitted from "app-components/Permitted/Permitted";

const SalesOrderComponent = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const instantInvoice = async () => {
        try {
            const response = await axiosRequest.post("Sales/ConvertSalesOrderToInvoice", { orderId: id });

            if (response.status === 200) {
                navigate(`/admin/modules/sales/sales-orders/${id}`);
            } else {
                console.error("Error creating item");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const convertToInvoice = () => {
        navigate("/admin/modules/sales/invoices/new", { state: { saleOrderId: id } });
    };

    const submit = async () => {
        try {
            await axiosRequest.delete(`Sales/DeleteSalesOrder`, { data: { id } });
            toast({
                title: "Success",
                description: "Deleted Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            navigate(`/admin/modules/sales/sales-orders`);
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
                mb="-130px"
                align={{ base: "center", xl: "center" }}
                justify={{
                    base: "space-between",
                    xl: "space-between",
                }}
                gap="20px"
                flexWrap={{ sm: "wrap", md: "nowrap" }}
            >
                <Heading as="h4" size="md">
                    Sales Order
                </Heading>

                <Flex
                    h="fit-content"
                    width={{ sm: "100%", md: "fit-content" }}
                    flexWrap={{ sm: "wrap", md: "nowrap" }}
                    alignItems="center"
                    justifyContent="space-between"
                    gap="20px"
                >
                    <Permitted to="Edit Sales Order">
                        <ChakraLink order={{ sm: "1" }} as={ReactRouterLink} to={`/admin/modules/sales/sales-orders/${id}/edit`}>
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </Permitted>
                    
                    <Menu>
                        <MenuButton order={{ sm: "3", md: "2" }} width="100%" minW="120px" as={Button} rightIcon={<ChevronDownIcon />}>
                            Convert
                        </MenuButton>
                        <Permitted  to="Convert Sales Order To Invoice">
                            <MenuList>
                                <MenuItem onClick={convertToInvoice}>Convert to Invoice</MenuItem>
                                <MenuItem onClick={instantInvoice}>Instant Invoice</MenuItem>
                            </MenuList>
                        </Permitted>
                        
                    </Menu>

                    <Menu>
                        <MenuButton order={{ sm: "4", md: "3" }} width="100%" as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <MenuList>
                            <Permitted to="Delete Sales Order">
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </Permitted>
                        </MenuList>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Delete Sales Order</ModalHeader>

                                <ModalBody>Are You Sure You Want To Delete?</ModalBody>
                                <ModalFooter>
                                    <Button variant="ghost" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="red" onClick={submit} ml={3}>
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Menu>

                    <ChakraLink order={{ sm: "2", md: "4" }} as={ReactRouterLink} to={`/admin/modules/sales/sales-orders`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <SalesOrderFormComponent viewOnly={true} />
        </>
    );
};

export default SalesOrderComponent;
