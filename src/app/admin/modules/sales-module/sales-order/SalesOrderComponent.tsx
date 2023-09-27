import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit, MdSettings } from "react-icons/md";
import SalesOrderFormComponent from "../sales-order-form/SalesOrderFormComponent";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axiosRequest from "utils/api";

const SalesOrderComponent = () => {
    const { id } = useParams();

    const navigate = useNavigate();

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
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <IconButton
                                
                                aria-label="Call Fred" 
                                 
                                icon={<MdSettings />} 
                            />
                        </MenuButton>
                        
                        <MenuList>
                            <MenuItem >Delete</MenuItem>
                        </MenuList>
                    </Menu>
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/sales-orders/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>

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
