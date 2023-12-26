import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure, useToast } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit } from "react-icons/md";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axiosRequest from "utils/api";
import IfUserIsPermitted from "app-components/if-user-is-permitted/IfUserIsPermitted";
import DeleteModal from "app-components/delete-modal/DeleteModal";
import { ReceiptFormComponent } from "../receipt-form/ReceiptFormComponent";

export const ReceiptComponent = () => {
    const { id, organizationId } = useParams();

    const navigate = useNavigate();

    const toast = useToast();

    const redirect = `/admin/organizations/${organizationId}/modules/receipts/`;

    const deleteEndpoint = `Sales/DeleteReceipt`;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const instantInvoice = async () => {
        try {
            const response = await axiosRequest.post("Sales/ConvertReceiptToInvoice", { orderId: id });

            if (response.status == 200) {
                navigate(`/admin/organizations/${organizationId}/modules/sales/receipts/${id}`);
            } else {
                console.error("Error creating item");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const convertToInvoice = () => {
        navigate(`/admin/organizations/${organizationId}/modules/sales/invoices/new`, { state: { receiptId: id } });
    };

    const submit = async () => {
        try {
            await axiosRequest.delete(`Sales/DeleteReceipt`, { data: { id } });
            toast({
                title: "Success",
                description: "Deleted Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            navigate(`/admin/organizations/${organizationId}/modules/sales/receipts`);
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
                    Receipt
                </Heading>

                <Flex
                    h="fit-content"
                    width={{ sm: "100%", md: "fit-content" }}
                    flexWrap={{ sm: "wrap", md: "nowrap" }}
                    alignItems="center"
                    justifyContent={{ xl: "space-between", sm: "flex-end" }}
                    gap="20px"
                >
                    <IfUserIsPermitted to="Edit Reeipt">
                        <ChakraLink order={{ sm: "1" }} as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/sales/receipts/${id}/edit`}>
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Edit" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </IfUserIsPermitted>

                    <Menu>
                        <IfUserIsPermitted to="Convert Receipt To Invoice">
                            <MenuButton order={{ sm: "4", md: "2" }} width="100%" minW="120px" as={Button} rightIcon={<ChevronDownIcon />}>
                                Convert
                            </MenuButton>

                            <MenuList>
                                <MenuItem onClick={convertToInvoice}>Convert to Invoice</MenuItem>
                                <MenuItem onClick={instantInvoice}>Instant Invoice</MenuItem>
                            </MenuList>
                        </IfUserIsPermitted>
                    </Menu>

                    <Menu>
                        <MenuButton order={{ sm: "2", md: "3" }} width={{ sm: "wrap", xl: "100%" }} as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <MenuList>
                            <IfUserIsPermitted to="Delete Receipt">
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </IfUserIsPermitted>
                        </MenuList>

                        <DeleteModal redirect={redirect} id={id} deleteEndpoint={deleteEndpoint} isOpen={isOpen} onClose={onClose} />
                    </Menu>

                    <ChakraLink order={{ sm: "3", md: "4" }} as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/sales/receipts`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <ReceiptFormComponent viewOnly={true} />
        </>
    );
};
