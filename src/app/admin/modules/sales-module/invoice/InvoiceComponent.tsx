import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure, useToast } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit, MdSettings } from "react-icons/md";
import InvoiceFormComponent from "../invoice-form/InvoiceFormComponent";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import axiosRequest from "utils/api";
import IfUserIsPermitted from "app-components/if-user-is-permitted/IfUserIsPermitted";
import DeleteModal from "app-components/delete-modal/DeleteModal";

const InvoiceComponent = () => {
    const { id, organizationId } = useParams();

    const toast = useToast();

    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const redirect = `/admin/organizations/${organizationId}/modules,/sales/invoices`;

    const deleteEndpoint = `Sales/DeleteInvoice`;

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
                    Invoice
                </Heading>

                <Flex
                    h="fit-content"
                    width={{ sm: "100%", md: "fit-content" }}
                    flexWrap={{ sm: "wrap", md: "nowrap" }}
                    alignItems="center"
                    justifyContent={{ xl: "space-between", sm: "flex-end" }}
                    gap="20px"
                >
                    <IfUserIsPermitted to="Edit Invoice">
                        <ChakraLink order={{ sm: "1" }} as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/sales/invoices/${id}/edit`}>
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </IfUserIsPermitted>

                    <Menu>
                        <MenuButton order={{ sm: "2", md: "3" }} as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <IfUserIsPermitted to="Delete Invoice">
                            <MenuList>
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </MenuList>
                        </IfUserIsPermitted>

                        <DeleteModal redirect={redirect} id={id} deleteEndpoint={deleteEndpoint} isOpen={isOpen} onClose={onClose} />
                    </Menu>

                    <ChakraLink order={{ sm: "3", md: "4" }} as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/sales/invoices`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <InvoiceFormComponent viewOnly={true} />
        </>
    );
};

export default InvoiceComponent;
