import { CloseButton, Flex, Heading, IconButton } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import SalesOrderFormComponent from "../sales-order-form/SalesOrderFormComponent";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const SalesOrderComponent = () => {
    const { id } = useParams();
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
