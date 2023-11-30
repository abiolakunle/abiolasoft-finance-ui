import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure, useToast } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit } from "react-icons/md";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axiosRequest from "utils/api";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from "@chakra-ui/react";
import IfUserIsPermitted from "app-components/if-user-is-permitted/IfUserIsPermitted";
import DeleteModal from "app-components/delete-modal/DeleteModal";
import VendorCreditFormComponent from "../vendor-credit-form/VendorCreditFormComponent";

const CreditNoteComponent = () => {
    const { id, organizationId } = useParams();

    const navigate = useNavigate();

    const toast = useToast();

    const redirect = `/admin/organizations/${organizationId}/modules/purchases/credit-notes/`;

    const deleteEndpoint = `Purchases/DeleteVendorCredit`;

    const { isOpen, onOpen, onClose } = useDisclosure();

    // const instantInvoice = async () => {
    //     try {
    //         const response = await axiosRequest.post("Sales/ConvertSalesOrderToInvoice", { orderId: id }); 

    //         if (response.status === 200) {
    //             navigate(`/admin/organizations/${organizationId}/modules/sales/sales-orders/${id}`);
    //         } else {
    //             console.error("Error creating item");
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    // const convertToInvoice = () => {
    //     navigate(`/admin/organizations/${organizationId}/modules/sales/invoices/new`, { state: { saleOrderId: id } });
    // };

    // const submit = async () => {
    //     try {
    //         await axiosRequest.delete(`Sales/DeleteSalesOrder`, { data: { id } });
    //         toast({
    //             title: "Success",
    //             description: "Deleted Successfully",
    //             status: "success",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottom-right",
    //         });
    //         navigate(`/admin/organizations/${organizationId}/modules/sales/sales-orders`);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

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
                    Vendor Credit
                </Heading>

                <Flex
                    h="fit-content"
                    width={{ sm: "100%", md: "fit-content" }}
                    flexWrap={{ sm: "wrap", md: "nowrap" }}
                    alignItems="center"
                    justifyContent={{ xl: "space-between", sm: "flex-end" }}
                    gap="20px"
                >
                    <IfUserIsPermitted to="Edit Sales Order">
                        <ChakraLink
                            order={{ sm: "1" }}
                            as={ReactRouterLink}
                            to={`/admin/organizations/${organizationId}/modules/sales/credit-notes/${id}/edit`}
                        >
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Edit" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </IfUserIsPermitted>

                    {/* <Menu>
                        <IfUserIsPermitted to="Convert Sales Order To Invoice">
                            <MenuButton order={{ sm: "4", md: "2" }} width="100%" minW="120px" as={Button} rightIcon={<ChevronDownIcon />}>
                                Convert
                            </MenuButton>

                            <MenuList>
                                <MenuItem onClick={convertToInvoice}>Convert to Invoice</MenuItem>
                                <MenuItem onClick={instantInvoice}>Instant Invoice</MenuItem>
                            </MenuList>
                        </IfUserIsPermitted>
                    </Menu> */}

                    <Menu>
                        <MenuButton order={{ sm: "2", md: "3" }} width={{ sm: "wrap", xl: "100%" }} as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <MenuList>
                            <IfUserIsPermitted to="Delete Sales Order">
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </IfUserIsPermitted>
                        </MenuList>

                        <DeleteModal redirect={redirect} id={id} deleteEndpoint={deleteEndpoint} isOpen={isOpen} onClose={onClose} />
                    </Menu>

                    <ChakraLink order={{ sm: "3", md: "4" }} as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/salees/credit-notes`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <VendorCreditFormComponent viewOnly={true} />
        </>
    );
};

export default CreditNoteComponent;
