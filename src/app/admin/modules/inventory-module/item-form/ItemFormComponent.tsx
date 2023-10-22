import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Textarea } from "@chakra-ui/react";
import Card from "components/card/Card";
import { useEffect } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import axiosRequest from "utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NumericFormat } from "react-number-format";

const ItemFormComponent = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        unit: Yup.string().required("Unit is required"),
        sellingPrice: Yup.string().required("Selling Price is required"),
        costPrice: Yup.string().required("Cost Price is required"),
        openingStockRatePerUnit: Yup.string().when("openingStock", {
            is: (v: any) => !!v,
            then: (s) => s.required("Opening Stock Rate per Unit is required"),
        }),
    });

    const { organizationId } = useParams();

    const form = useFormik({
        initialValues: {
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
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await (id ? axiosRequest.put("Inventory/EditItem", values) : axiosRequest.post("Inventory/CreateItem", values));
                if (response.status === 200) {
                    if (id) {
                        navigate(`/admin/organizations/${organizationId}/modules/inventory/items/${id}`);
                    } else {
                        navigate(`/admin/organizations/${organizationId}/modules/inventory/items`);
                    }
                } else {
                    console.error("Error creating item");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });

    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axiosRequest
                .get(`Inventory/GetItemById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        form.setValues({
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
                    <form noValidate onSubmit={form.handleSubmit}>
                        <FormControl isInvalid={form.touched.name && !!form.errors.name}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Name*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="name"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.name}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />{" "}
                                    {form.touched.name && !!form.errors.name ? <FormErrorMessage>{form.errors.name}</FormErrorMessage> : ""}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.sku && !!form.errors.sku}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>SKU</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        name="sku"
                                        value={form.values.sku}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />{" "}
                                    {form.touched.name && !!form.errors.sku ? <FormErrorMessage>{form.errors.sku}</FormErrorMessage> : ""}
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
                                    />{" "}
                                    {form.touched.description && !!form.errors.description ? (
                                        <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.unit && !!form.errors.unit}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Unit*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Select
                                        placeholder="Select a unit"
                                        name="unit"
                                        value={form.values.unit}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    >
                                        <option>Pcs</option>
                                        <option>Packs</option>
                                        <option>Pallet</option>
                                    </Select>
                                    {form.touched.unit && !!form.errors.unit ? <FormErrorMessage>{form.errors.unit}</FormErrorMessage> : ""}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.sellingPrice && !!form.errors.sellingPrice}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Selling Price*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <NumericFormat
                                        customInput={Input}
                                        allowLeadingZeros={false}
                                        thousandSeparator=","
                                        decimalScale={2}
                                        prefix={"₦"}
                                        fixedDecimalScale
                                        borderRadius="8px"
                                        name="sellingPrice"
                                        value={form.values.sellingPrice}
                                        onValueChange={({ value }) => form.handleChange({ target: { value, name: "sellingPrice" } })}
                                        onBlur={form.handleBlur}
                                    />

                                    {form.touched.sellingPrice && !!form.errors.sellingPrice ? (
                                        <FormErrorMessage>{form.errors.sellingPrice}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.sellingDescription && !!form.errors.sellingDescription}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="baseline" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Selling Description</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Textarea
                                        size="sm"
                                        name="sellingDescription"
                                        value={form.values.sellingDescription}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />{" "}
                                    {form.touched.sellingDescription && !!form.errors.sellingDescription ? (
                                        <FormErrorMessage>{form.errors.sellingDescription}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.costPrice && !!form.errors.costPrice}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Cost Price*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <NumericFormat
                                        customInput={Input}
                                        allowLeadingZeros={false}
                                        thousandSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale
                                        borderRadius="8px"
                                        prefix={"₦"}
                                        name="costPrice"
                                        value={form.values.costPrice}
                                        onValueChange={({ value }) => form.handleChange({ target: { value, name: "costPrice" } })}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.costPrice && !!form.errors.costPrice ? <FormErrorMessage>{form.errors.costPrice}</FormErrorMessage> : ""}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.costDescription && !!form.errors.costDescription}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="baseline" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Cost Description</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Textarea
                                        size="sm"
                                        name="costDescription"
                                        value={form.values.costDescription}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />{" "}
                                    {form.touched.costDescription && !!form.errors.costDescription ? (
                                        <FormErrorMessage>{form.errors.costDescription}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.openingStock && !!form.errors.openingStock}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Opening Stock</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <NumericFormat
                                        customInput={Input}
                                        allowLeadingZeros={false}
                                        thousandSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale
                                        name="openingStock"
                                        borderRadius="8px"
                                        variant="outline"
                                        width="100%"
                                        value={form.values.openingStock}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                    {/* <Input
                                        type="number"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        name="openingStock"
                                        value={form.values.openingStock}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    /> */}
                                    {form.touched.openingStock && !!form.errors.openingStock ? (
                                        <FormErrorMessage>{form.errors.openingStock}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.openingStockRatePerUnit && !!form.errors.openingStockRatePerUnit}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color={!!form.values.openingStock ? "red" : ""}>
                                        Opening Stock Rate per Unit {!!form.values.openingStock ? "*" : ""}
                                    </FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <NumericFormat
                                        customInput={Input}
                                        allowLeadingZeros={false}
                                        thousandSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale
                                        prefix={"₦"}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        name="openingStockRatePerUnit"
                                        value={form.values.openingStockRatePerUnit}
                                        onValueChange={({ value }) => form.handleChange({ target: { value, name: "openingStockRatePerUnit" } })}
                                        onBlur={form.handleBlur}
                                    />

                                    {form.touched.openingStockRatePerUnit && !!form.errors.openingStockRatePerUnit ? (
                                        <FormErrorMessage>{form.errors.openingStockRatePerUnit}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.reorderPoint && !!form.errors.reorderPoint}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Reorder Point</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <NumericFormat
                                        customInput={Input}
                                        allowLeadingZeros={false}
                                        thousandSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        name="reorderPoint"
                                        value={form.values.reorderPoint}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />{" "}
                                    {form.touched.reorderPoint && !!form.errors.reorderPoint ? (
                                        <FormErrorMessage>{form.errors.reorderPoint}</FormErrorMessage>
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
                            <Button variant="brand" type="submit" isDisabled={!form.isValid || form.isSubmitting}>
                                Save
                            </Button>
                            <ChakraLink
                                as={ReactRouterLink}
                                to={
                                    id
                                        ? `/admin/organizations/${organizationId}/modules/inventory/items/${id}`
                                        : `/admin/organizations/${organizationId}/modules/inventory/items`
                                }
                            >
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

export default ItemFormComponent;
