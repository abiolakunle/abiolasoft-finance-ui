import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftAddon, Select, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { apiBaseUrl } from "environment";
import React, { useEffect, useState } from "react";

const NewItemComponent = () => {
    const [formData, setFormData] = useState({
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

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(formData); // This will log the updated formData state
    }, [formData]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(apiBaseUrl + "api/Inventory/CreateItem", formData);

            if (response.status === 200) {
                // Item created successfully, you can add further actions here
                console.log("Item created successfully");
            } else {
                // Handle errors here, e.g., show an error message to the user
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
                        <Button variant="outline">Cancel</Button>
                    </Flex>
                </Card>
            </Box>
            ;
        </>
    );
};

export default NewItemComponent;
