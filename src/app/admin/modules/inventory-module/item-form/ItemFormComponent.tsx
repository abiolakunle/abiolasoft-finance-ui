import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftAddon, Select, Textarea } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { apiBaseUrl } from "environment";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";

const NewItemComponent = () => {
    const [formData, setFormData] = useState({
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
        unit: "Pcs",
    });

    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios
                .get(apiBaseUrl + `api/Inventory/GetItemById?id=${id}`)
                .then((response) => {
                    // Assuming the API response is in the expected format
                    const data = response?.data?.data;
                    if (!!data) {
                        setFormData({
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
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            let addOrEditPath = "api/Inventory/CreateItem";

            if (id) addOrEditPath = "api/Inventory/EditItem";

            const response = await axios.put(apiBaseUrl + addOrEditPath, formData);

            if (response.status === 200) {
                if (id) {
                    navigate(`/admin/modules/inventory/items/${id}`);
                } else {
                    navigate("/admin/modules/inventory/items");
                }
            } else {
                console.error("Error creating item");
            }
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
                align={{ base: "center", xl: "center" }}
                justify={{
                    base: "flex-start",
                    xl: "flex-start",
                }}
                gap="20px"
            >
                <Heading as="h4" size="md">
                    New Item
                </Heading>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Name*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input name="name" isRequired={true} width="100%" variant="outline" borderRadius="8px" value={formData.name} onChange={handleInputChange} />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>SKU</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input width="100%" variant="outline" borderRadius="8px" name="sku" value={formData.sku} onChange={handleInputChange} />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="baseline" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>Description</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Textarea size="sm" name="description" value={formData.description} onChange={handleInputChange} />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Unit*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Select placeholder="Select a unit" name="unit" value={formData.unit} onChange={handleInputChange}>
                                    <option>Pcs</option>
                                    <option>Packs</option>
                                    <option>Pallet</option>
                                </Select>
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Selling Price*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <InputGroup>
                                    <InputLeftAddon children="NGN" borderRadius="8px" />
                                    <Input type="number" borderRadius="8px" name="sellingPrice" value={formData.sellingPrice} onChange={handleInputChange} />
                                </InputGroup>
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="baseline" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>Selling Description</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Textarea size="sm" name="sellingDescription" value={formData.sellingDescription} onChange={handleInputChange} />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Cost Price*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <InputGroup>
                                    <InputLeftAddon children="NGN" borderRadius="8px" />
                                    <Input type="number" borderRadius="8px" name="costPrice" value={formData.costPrice} onChange={handleInputChange} />
                                </InputGroup>
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="baseline" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>Cost Description</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Textarea size="sm" name="costDescription" value={formData.costDescription} onChange={handleInputChange} />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>Opening Stock</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    type="number"
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    name="openingStock"
                                    value={formData.openingStock}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Opening Stock Rate per Unit*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    type="number"
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    name="openingStockRatePerUnit"
                                    value={formData.openingStockRatePerUnit}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>Reorder Point</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    type="number"
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    name="reorderPoint"
                                    value={formData.reorderPoint}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <Flex
                        pt={{ base: "16px", md: "16px", xl: "16px" }}
                        align={{ base: "center", xl: "center" }}
                        justify={{
                            base: "flex-end",
                            xl: "flex-end",
                        }}
                        gap="20px"
                    >
                        <Button variant="brand" onClick={handleSubmit}>
                            Save
                        </Button>
                        <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/inventory/items/${id}` : "/admin/modules/inventory/items"}>
                            <Button variant="outline">Cancel</Button>
                        </ChakraLink>
                    </Flex>
                </Card>
            </Box>
            ;
        </>
    );
};

export default NewItemComponent;
