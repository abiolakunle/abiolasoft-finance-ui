import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit } from "react-icons/md";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import PurchaseOrderFormComponent from "../purchase-order-form/PurchaseOrderFormComponent";

const PurchaseOrderComponent = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const convertToBill = () => {
        navigate("/admin/modules/purchases/bills/new", { state: { purchaseOrderId: id } });
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
                    Purchase Order
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/purchases/purchase-orders/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>

                    <Button onClick={convertToBill} variant="brand">
                        Convert to Bill
                    </Button>

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
                                <ModalHeader>Delete Purchase Order</ModalHeader>
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

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/purchases/purchase-orders`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <PurchaseOrderFormComponent viewOnly={true} />
        </>
    );
};

export default PurchaseOrderComponent;
