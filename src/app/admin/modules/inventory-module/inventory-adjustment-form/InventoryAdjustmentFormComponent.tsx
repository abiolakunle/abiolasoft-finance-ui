import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Radio, RadioGroup, Stack, Textarea } from "@chakra-ui/react";
import Card from "components/card/Card";
import { useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axiosRequest from "utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";

const InventoryAdjustmentFormComponent = () => {
    const { id } = useParams();
    const location = useLocation();
    let navigate = useNavigate();
    const [submitStatus, setSubmitStatus] = useState("");

    const validationSchema = Yup.object().shape({
        dateAdjusted: Yup.string().required("Date is required"),
        quantityAdjusted: Yup.number().when("type", {
            is: "Quantity",
            then: (s) => s.required("Adjusted Value is required"),
        }),
        adjustedValue: Yup.number().when("type", {
            is: "Value",
            then: (s) => s.required("Adjusted Value is required"),
        }),
        reason: Yup.string().required("Reason is required"),
    });

    const form = useFormik({
        initialValues: {
            itemId: id,
            quantityAdjusted: 0,
            adjustedValue: 0,
            costPrice: location.state?.costPrice,
            dateAdjusted: "",
            reason: "Stocktaking results",
            description: "",
            status: "",
            type: "Quantity",
        },
        validationSchema,
        onSubmit: async (values) => {
            const data = {
                ...values,
                status: submitStatus,
                items: [
                    {
                        itemId: id,
                        quantityAdjusted: values.quantityAdjusted,
                        adjustedValue: values.adjustedValue,
                        costPrice: values.costPrice,
                    },
                ],
            };

            try {
                const response = await axiosRequest.put("Inventory/AdjustStock", data);

                if (response.status === 200) {
                    navigate(`/admin/modules/inventory/items/${id}`);
                } else {
                    console.error("Error creating item");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });

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
                    <form noValidate onSubmit={form.handleSubmit}>
                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="baseline" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Adjustment Type</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <RadioGroup onChange={(value) => form.handleChange({ target: { name: "type", value } })} value={form.values.type}>
                                        <Stack direction="row">
                                            <Radio value="Quantity">Quantity Adjustment</Radio>
                                            <Radio value="Value">Value Adjustment</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.dateAdjusted && !!form.errors.dateAdjusted}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Date*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        type="date"
                                        name="dateAdjusted"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.dateAdjusted}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.dateAdjusted && !!form.errors.dateAdjusted ? (
                                        <FormErrorMessage>{form.errors.dateAdjusted}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                            </Flex>
                        </FormControl>

                        {form.values.type === "Quantity" && (
                            <FormControl isInvalid={form.touched.quantityAdjusted && !!form.errors.quantityAdjusted}>
                                <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                    <Box className="afu-label" minWidth="250px">
                                        <FormLabel color="red">Quantity Adjusted*</FormLabel>
                                    </Box>
                                    <Box width="100%" className="afu-input">
                                        <Input
                                            type="number"
                                            borderRadius="8px"
                                            name="quantityAdjusted"
                                            value={form.values.quantityAdjusted}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        />
                                        {form.touched.quantityAdjusted && !!form.errors.quantityAdjusted ? (
                                            <FormErrorMessage>{form.errors.quantityAdjusted}</FormErrorMessage>
                                        ) : (
                                            ""
                                        )}
                                    </Box>
                                </Flex>
                            </FormControl>
                        )}

                        {form.values.type === "Value" && (
                            <FormControl isInvalid={form.touched.adjustedValue && !!form.errors.adjustedValue}>
                                <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                    <Box className="afu-label" minWidth="250px">
                                        <FormLabel color="red">Adjusted Value*</FormLabel>
                                    </Box>
                                    <Box width="100%" className="afu-input">
                                        <Input
                                            type="number"
                                            borderRadius="8px"
                                            name="adjustedValue"
                                            value={form.values.adjustedValue}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        />
                                        {form.touched.adjustedValue && !!form.errors.adjustedValue ? (
                                            <FormErrorMessage>{form.errors.adjustedValue}</FormErrorMessage>
                                        ) : (
                                            ""
                                        )}
                                    </Box>
                                </Flex>
                            </FormControl>
                        )}

                        {form.values.type === "Quantity" && (
                            <FormControl isInvalid={form.touched.costPrice && !!form.errors.costPrice}>
                                <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                    <Box className="afu-label" minWidth="250px">
                                        <FormLabel>Cost Price</FormLabel>
                                    </Box>
                                    <Box width="100%" className="afu-input">
                                        <Input
                                            type="number"
                                            borderRadius="8px"
                                            name="costPrice"
                                            value={form.values.costPrice}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        />
                                        {form.touched.costPrice && !!form.errors.costPrice ? (
                                            <FormErrorMessage>{form.errors.costPrice as any}</FormErrorMessage>
                                        ) : (
                                            ""
                                        )}
                                    </Box>
                                </Flex>
                            </FormControl>
                        )}

                        <FormControl isInvalid={form.touched.reason && !!form.errors.reason}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Reason*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        name="reason"
                                        value={form.values.reason}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />

                                    {form.touched.reason && !!form.errors.reason ? <FormErrorMessage>{form.errors.reason}</FormErrorMessage> : ""}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.description && !!form.errors.description}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="baseline" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Description</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Textarea
                                        size="sm"
                                        name="description"
                                        value={form.values.description}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.description && !!form.errors.description ? (
                                        <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
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
                            <Button variant="brand" type="submit" isDisabled={!form.isValid || form.isSubmitting} onClick={() => setSubmitStatus("Draft")}>
                                Save as Draft
                            </Button>
                            <Button variant="brand" type="submit" isDisabled={!form.isValid || form.isSubmitting} onClick={() => setSubmitStatus("Adjusted")}>
                                Convert to Adjusted
                            </Button>
                            <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/items/${id}`}>
                                <Button variant="outline">Cancel</Button>
                            </ChakraLink>
                        </Flex>
                    </form>
                </Card>
            </Box>
            ;
        </>
    );
};

export default InventoryAdjustmentFormComponent;
