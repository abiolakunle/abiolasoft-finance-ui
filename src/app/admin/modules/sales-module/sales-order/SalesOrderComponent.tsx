import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit, MdMenu, MdSettings } from "react-icons/md";
import SalesOrderFormComponent from "../sales-order-form/SalesOrderFormComponent";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axiosRequest from "utils/api";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const SalesOrderComponent = () => {
    const { id } = useParams();

    const navigate = useNavigate();

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
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/sales-orders/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Convert
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={convertToInvoice}>Convert to Invoice</MenuItem>
                            <MenuItem onClick={instantInvoice}>Instant Invoice</MenuItem>
                        </MenuList>
                    </Menu>

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
                                <ModalHeader>Delete Sales Order</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>Are You Sure You Want To Delete?</ModalBody>
                                <ModalFooter>
                                    <Button variant="ghost" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="brand" mr={3}>
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Menu>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/sales-orders`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <SalesOrderFormComponent viewOnly={true} />
        </>
    );
};

export default SalesOrderComponent;
