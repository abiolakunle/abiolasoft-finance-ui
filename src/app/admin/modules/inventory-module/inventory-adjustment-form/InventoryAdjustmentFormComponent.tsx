import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Radio, RadioGroup, Stack, Textarea } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { apiBaseUrl } from "environment";
import { useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation, useNavigate, useParams } from "react-router-dom";

const InventoryAdjustmentFormComponent = () => {
    const { id } = useParams();
    const location = useLocation();

    const [formData, setFormData] = useState({
        items: [
            {
                itemId: id,
                quantityAdjusted: 0,
                adjustedValue: 0,
                costPrice: 0,
            },
        ],
        dateAdjusted: "",
        reason: "",
        description: "",
        status: "",
        type: "Quantity",
    });

    let navigate = useNavigate();

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleItemInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            items: [{ ...formData.items[0], [name]: value }],
        });
    };

    const handleSubmit = async (status: string) => {
        formData.status = status;

        try {
            const response = await axios.put(apiBaseUrl + "Inventory/AdjustStock", formData);

            if (response.status === 200) {
                navigate(`/admin/modules/inventory/items/${id}`);
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
                    Adjust Stock - {location.state?.itemName}
                </Heading>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="baseline" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>Adjustment Type</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <RadioGroup onChange={(value) => handleInputChange({ target: { name: "type", value } })} value={formData.type}>
                                    <Stack direction="row">
                                        <Radio value="Quantity">Quantity Adjustment</Radio>
                                        <Radio value="Value">Value Adjustment</Radio>
                                    </Stack>
                                </RadioGroup>
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Date*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    type="date"
                                    name="dateAdjusted"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.dateAdjusted}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    {formData.type === "Quantity" && (
                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Quantity Adjusted*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input type="number" borderRadius="8px" name="quantityAdjusted" value={formData.items[0].quantityAdjusted} onChange={handleItemInputChange} />
                                </Box>
                            </Flex>
                        </FormControl>
                    )}

                    {formData.type === "Value" && (
                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Adjusted Value*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input type="number" borderRadius="8px" name="adjustedValue" value={formData.items[0].adjustedValue} onChange={handleItemInputChange} />
                                </Box>
                            </Flex>
                        </FormControl>
                    )}

                    {formData.type === "Quantity" && (
                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Cost Price</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input type="number" borderRadius="8px" name="costPrice" value={formData.items[0].costPrice} onChange={handleItemInputChange} />
                                </Box>
                            </Flex>
                        </FormControl>
                    )}

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>Reason</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input width="100%" variant="outline" borderRadius="8px" name="reason" value={formData.reason} onChange={handleInputChange} />
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

                    <Flex
                        pt={{ base: "16px", md: "16px", xl: "16px" }}
                        align={{ base: "center", xl: "center" }}
                        justify={{
                            base: "flex-end",
                            xl: "flex-end",
                        }}
                        gap="20px"
                    >
                        <Button variant="brand" onClick={() => handleSubmit("Draft")}>
                            Save as Draft
                        </Button>
                        <Button variant="brand" onClick={() => handleSubmit("Adjusted")}>
                            Convert to Adjusted
                        </Button>
                        <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/items/${id}`}>
                            <Button variant="outline">Cancel</Button>
                        </ChakraLink>
                    </Flex>
                </Card>
            </Box>
            ;
        </>
    );
};

export default InventoryAdjustmentFormComponent;
