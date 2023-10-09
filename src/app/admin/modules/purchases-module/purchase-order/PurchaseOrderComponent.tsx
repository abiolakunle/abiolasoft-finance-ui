import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure, useToast } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit } from "react-icons/md";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import PurchaseOrderFormComponent from "../purchase-order-form/PurchaseOrderFormComponent";
import IfUserIsPermitted from "app-components/if-user-is-permitted/IfUserIsPermitted";
import axiosRequest from "utils/api";

const PurchaseOrderComponent = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const convertToBill = () => {
        navigate("/admin/modules/purchases/bills/new", { state: { purchaseOrderId: id } });
    };

    const submit = async () => {
        try {
            await axiosRequest.delete(`Purchases/DeletePurchaseOrder`, { data: { id } });
            toast({
                title: "Success",
                description: "Deleted Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            navigate(`/admin/modules/purchases/purchase-orders`);
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
                    Purchase Order
                </Heading>

                <Flex h="fit-content" width={{ sm: "100%", md: "fit-content" }} flexWrap={{ sm: "wrap", md: "nowrap" }} alignItems="center" justifyContent="space-between" gap="20px">
                    <IfUserIsPermitted to="Edit Purchase Order">
                        <ChakraLink order={{ sm: "1" }} as={ReactRouterLink} to={`/admin/modules/purchases/purchase-orders/${id}/edit`}>
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Edit" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </IfUserIsPermitted>

                    <Button order={{ sm: "3", md: "2" }} onClick={convertToBill} variant="brand">
                        Convert to Bill
                    </Button>

                    <Menu>
                        <MenuButton order={{ sm: "4", md: "3" }} as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <IfUserIsPermitted to="Delete Purchase Order">
                            <MenuList>
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </MenuList>
                        </IfUserIsPermitted>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Delete Purchase Order</ModalHeader>

                                <ModalBody>Are You Sure You Want To Delete?</ModalBody>
                                <ModalFooter>
                                    <Button variant="ghost" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="red" ml={3} onClick={submit}>
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Menu>

                    <ChakraLink order={{ sm: "2", md: "4" }} as={ReactRouterLink} to={`/admin/modules/purchases/purchase-orders`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <PurchaseOrderFormComponent viewOnly={true} />
        </>
    );
};

export default PurchaseOrderComponent;
