import {
    Card,
    Text,
    Flex,
    Box,
    Heading,
    IconButton,
    Button,
    CloseButton,
    Stat,
    StatLabel,
    StatNumber,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { HSeparator } from "components/separator/Separator";
import axiosRequest from "utils/api";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { formatNumberWithCommas } from "utils/number";
import IfUserIsPermitted from "app-components/if-user-is-permitted/IfUserIsPermitted";
import DeleteModal from "app-components/delete-modal/DeleteModal";

const ItemComponent = () => {
    const { id, organizationId } = useParams();

    let navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const redirect = `/admin/organizations/${organizationId}/modules/inventory/items`;

    const deleteEndpoint = `Inventory/DeleteItem`;

    const [item, setItem] = useState({
        id: "",
        name: "",
        description: "",
        sku: "",
        sellingPrice: 0,
        sellingDescription: "",
        costPrice: 0,
        costDescription: "",
        openingStock: 0,
        openingStockRatePerUnit: 0,
        reorderPoint: 0,
        unit: "Packs",
        stockOnHand: 0,
        totalPurchaseOrderQuantity: 0,
        totalSalesOrderQuantity: 0,
        quantityAdjusted: 0,
    });

    useEffect(() => {
        if (id) {
            axiosRequest
                .get(`Inventory/GetItemById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setItem({
                            id,
                            name: data.name,
                            description: data.description,
                            sku: data.sku,
                            sellingPrice: data.sellingPrice,
                            sellingDescription: data.sellingDescription,
                            costPrice: data.costPrice,
                            costDescription: data.costDescription,
                            openingStock: data.openingStock,
                            openingStockRatePerUnit: data.openingStockRatePerUnit,
                            reorderPoint: data.reorderPoint,
                            unit: data.unit,
                            stockOnHand: data.stockOnHand,
                            totalPurchaseOrderQuantity: data.totalPurchaseOrderQuantity,
                            totalSalesOrderQuantity: data.totalSalesOrderQuantity,
                            quantityAdjusted: data.quantityAdjusted,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);

    const gotoAdjustStock = () => {
        navigate(`/admin/organizations/${organizationId}/modules/inventory/items/${id}/inventory-adjustment`, {
            state: { itemName: item.name, costPrice: item.costPrice },
        });
    };

    return (
        <>
            <Flex
                pt={{ base: "130px", md: "80px", xl: "130px" }}
                my="0px"
                h="fit-content"
                align={{ base: "center", xl: "center" }}
                justify={{
                    base: "space-between",
                    xl: "space-between",
                }}
                gap="20px"
            >
                <Heading as="h4" size="md">
                    {item.name}
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <IfUserIsPermitted to="Update Item">
                        <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/inventory/items/${id}/edit`}>
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Edit" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </IfUserIsPermitted>

                    <IfUserIsPermitted to="Adjust Stock">
                        <Button variant="brand" onClick={gotoAdjustStock}>
                            Adjust Stock
                        </Button>
                    </IfUserIsPermitted>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <IfUserIsPermitted to="Delete Item">
                            <MenuList>
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </MenuList>
                        </IfUserIsPermitted>

                        <DeleteModal redirect={redirect} id={id} deleteEndpoint={deleteEndpoint} isOpen={isOpen} onClose={onClose} />
                    </Menu>

                    <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/inventory/items`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex mb="16px" justifyContent="space-between" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>SKU</StatLabel>
                                <StatNumber>{item.sku || "--"}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="40%">
                            <Stat>
                                <StatLabel>Unit</StatLabel>
                                <StatNumber>{item.unit || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Description</StatLabel>
                                <StatNumber>{item.description || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <HSeparator mb="16px" />
                    <Flex mb="16px" justifyContent="space-between" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Opening Stock</StatLabel>
                                <StatNumber>{formatNumberWithCommas(item.openingStock)}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="40%">
                            <Stat>
                                <StatLabel>Opening Stock Rate per Unit</StatLabel>
                                <StatNumber>{"₦" + formatNumberWithCommas(item.openingStockRatePerUnit)}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <Flex mb="16px" justifyContent="space-between" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Reorder Point</StatLabel>
                                <StatNumber>{formatNumberWithCommas(item.reorderPoint)}</StatNumber>
                            </Stat>
                        </Box>

                        <Box w="40%">
                            <Stat>
                                <StatLabel>Stock On Hand</StatLabel>
                                <StatNumber>{formatNumberWithCommas(item.stockOnHand)}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <Flex mb="16px" justifyContent="space-between" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Quantity Adjusted</StatLabel>
                                <StatNumber>{formatNumberWithCommas(item.quantityAdjusted) || "--"}</StatNumber>
                            </Stat>
                        </Box>

                        <Box w="40%"></Box>
                    </Flex>

                    <HSeparator mb="16px" />
                    <Flex mb="16px" justifyContent="space-between">
                        <Box w="45%">
                            <Text fontSize="lg" mb="18px">
                                Sales Information
                            </Text>

                            <Flex direction="column">
                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Selling Price</StatLabel>
                                    <StatNumber>{"₦" + formatNumberWithCommas(item.sellingPrice)}</StatNumber>
                                </Stat>

                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Selling Price Description</StatLabel>
                                    <StatNumber>{item.sellingDescription || "--"}</StatNumber>
                                </Stat>

                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Total Ordered</StatLabel>
                                    <StatNumber>{formatNumberWithCommas(item.totalSalesOrderQuantity) || "--"}</StatNumber>
                                </Stat>
                                <ChakraLink
                                    state={{ itemName: item.name }}
                                    as={ReactRouterLink}
                                    to={`/admin/organizations/${organizationId}/modules/inventory/items/${id}/sales`}
                                >
                                    <Button variant="outline">See Sales</Button>
                                </ChakraLink>
                            </Flex>
                        </Box>
                        <Box w="40%">
                            <Text fontSize="lg" mb="18px">
                                Purchase Information
                            </Text>

                            <Flex direction="column">
                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Cost Price</StatLabel>
                                    <StatNumber>{"₦" + formatNumberWithCommas(item.costPrice)}</StatNumber>
                                </Stat>

                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Cost Price Description</StatLabel>
                                    <StatNumber>{item.costDescription || "--"}</StatNumber>
                                </Stat>

                                <Stat mb="16px" minH="80px">
                                    <StatLabel>Total Ordered</StatLabel>
                                    <StatNumber>{formatNumberWithCommas(item.totalPurchaseOrderQuantity) || "--"}</StatNumber>
                                </Stat>
                                <ChakraLink
                                    state={{ itemName: item.name }}
                                    as={ReactRouterLink}
                                    to={`/admin/organizations/${organizationId}/modules/inventory/items/${id}/purchases`}
                                >
                                    <Button variant="outline">See Purchases</Button>
                                </ChakraLink>
                            </Flex>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default ItemComponent;
