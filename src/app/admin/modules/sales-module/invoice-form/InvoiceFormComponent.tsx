import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit } from "react-icons/md";
import SalesOrderFormComponent from "../sales-order-form/SalesOrderFormComponent";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { apiBaseUrl } from "environment";
import axios from "axios";
import NewInvoiceFormComponent from "../new-invoice/NewInvoiceFormComponent";

const InvoiceFormComponent = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const instantInvoice = async () => {
        try {
            const response = await axios.post(apiBaseUrl + "Sales/ConvertSalesOrderToInvoice", { orderId: id });

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
                    {/* <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Convert
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={convertToInvoice}>Convert to Invoice</MenuItem>
                            <MenuItem onClick={instantInvoice}>Instant Invoice</MenuItem>
                        </MenuList>
                    </Menu> */}
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/invoice/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/invoices`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <NewInvoiceFormComponent viewOnly={true} />
        </>
    );
};

export default InvoiceFormComponent;
