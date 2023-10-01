import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, Select, Stack, Textarea, CloseButton, FormErrorMessage } from "@chakra-ui/react";
import Card from "components/card/Card";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import LineItemsTableComponent, { defaultItem } from "../../../../../app-components/line-items-table/LineItemsTableComponent";
import { HSeparator } from "components/separator/Separator";
import { formatDate } from "utils/dateUtils";
import axiosRequest from "utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export const PurchaseOrderFormComponent = ({ viewOnly }: { viewOnly?: boolean }) => {
    const [vendors, setVendors] = useState([]);
    const [items, setItems] = useState([]);
    const [submitStatus, setSubmitStatus] = useState("");

    const validationSchema = Yup.object().shape({
        vendorId: Yup.string().required("Select a vendor"),
        number: Yup.string().required("Purchase Order Number is required"),
        date: Yup.string().required("Purchase Order Date is required"),
    });

    const form = useFormik({
        initialValues: {
            id: "",
            number: "",
            referenceNumber: "",
            date: "",
            expectedDeliveryDate: "",
            paymentTermsDays: "",
            vendorId: "",
            customerNotes: "",
            termsAndConditions: "",
            discount: 0,
            status: "",
            items: [{ ...defaultItem }],
        },
        validationSchema,
        onSubmit: async (values) => {
            values.status = submitStatus;

            values.items = values.items.map((item) => {
                const itemName = items.find((i) => i.id === item.itemId)?.name;
                return { ...item, description: "", itemName };
            });
            try {
                const response = await (id
                    ? axiosRequest.put("Purchases/EditPurchaseOrder", values)
                    : axiosRequest.post("Purchases/CreatePurchaseOrder", values));

                if (response.status === 200) {
                    if (id) {
                        navigate(`/admin/modules/purchases/purchase-orders/${id}`);
                    } else {
                        navigate("/admin/modules/purchases/purchase-orders");
                    }
                } else {
                    console.error("Error creating item");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });

    const [summary, setSummary] = useState({
        subTotal: 0,
        discount: 0,
        total: 0,
    });

    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const initialRequests = [
            axiosRequest.get(`Purchases/GetAllVendors?PageIndex=1&PageSize=500`),
            axiosRequest.get(`Inventory/GetAllItems?PageIndex=1&PageSize=500`),
        ];

        if (id) {
            initialRequests.push(axiosRequest.get(`Purchases/GetPurchaseOrderById?id=${id}`));
        }

        Promise.all(initialRequests)
            .then((response) => {
                if (id) {
                    const purchaseOrder = response[2].data?.data;

                    form.values.items = purchaseOrder.items;

                    const f = { ...form.values, ...purchaseOrder };
                    form.setValues(f);
                }
                setVendors(response[0].data?.data?.items);
                setItems(response[1].data?.data?.items);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        const subTotal = form.values.items.reduce((pre, curr) => {
            return pre + curr.rate * curr.quantity;
        }, 0);

        const total = subTotal - form.values.discount;
        setSummary({
            ...summary,
            subTotal,
            total,
        });
    }, [form.values]);

    const lineInputChanged = (event: any, index: string) => {
        const { name, value } = event;

        const updatedItems: any[] = [...form.values.items];

        updatedItems[+index][name] = value;

        form.setValues({
            ...form.values,
            items: updatedItems,
        });
    };

    const onTableLineAdded = () => {
        form.setValues({
            ...form.values,
            items: [...form.values.items, { ...defaultItem }],
        });
    };

    const onTableLineRemoved = (rowIndex: number) => {
        form.setValues({
            ...form.values,
            items: [...form.values.items.filter((_l, i) => i !== rowIndex)],
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
                {!viewOnly && (
                    <>
                        <Heading as="h4" size="md">
                            {id ? "Edit Purchase Order" : "New Purchase Order"}
                        </Heading>

                        <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                            <ChakraLink
                                as={ReactRouterLink}
                                to={id ? `/admin/modules/purchases/purchase-orders/${id}` : `/admin/modules/purchases/purchase-orders`}
                            >
                                <CloseButton size="lg" />
                            </ChakraLink>
                        </Flex>
                    </>
                )}
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <form noValidate onSubmit={form.handleSubmit}>
                        <FormControl isInvalid={form.touched.vendorId && !!form.errors.vendorId}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel color={viewOnly ? "" : "red"}>Vendor Name{viewOnly ? "" : "*"}</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Select
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        name="vendorId"
                                        placeholder="Select a vendor"
                                        value={form.values.vendorId}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    >
                                        {vendors.map((vendor, index) => (
                                            <option key={index} value={vendor.id}>
                                                {vendor.vendorDisplayName}
                                            </option>
                                        ))}
                                    </Select>
                                    {form.touched.vendorId && !!form.errors.vendorId ? <FormErrorMessage>{form.errors.vendorId}</FormErrorMessage> : ""}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.number && !!form.errors.number}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel color={viewOnly ? "" : "red"}>Purchase Order#{viewOnly ? "" : "*"}</FormLabel>
                                </Box>
                                <Box width="40%" className="afu-input">
                                    <Input
                                        readOnly={viewOnly}
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        name="number"
                                        type="text"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.number}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.number && !!form.errors.number ? <FormErrorMessage>{form.errors.number}</FormErrorMessage> : ""}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel>Reference#</FormLabel>
                                </Box>
                                <Box width="40%" className="afu-input">
                                    <Input
                                        readOnly={viewOnly}
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        name="referenceNumber"
                                        type="text"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.referenceNumber}
                                        onChange={form.handleChange}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.date && !!form.errors.date}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel color={viewOnly ? "" : "red"}>Date{viewOnly ? "" : "*"}</FormLabel>
                                </Box>
                                <Box width="40%" className="afu-input">
                                    <Input
                                        readOnly={viewOnly}
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        type="date"
                                        name="date"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={formatDate(form.values.date)}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.date && !!form.errors.date ? <FormErrorMessage>{form.errors.date}</FormErrorMessage> : ""}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel>Expected Delivery Date</FormLabel>
                                </Box>
                                <Box width="40%" className="afu-input">
                                    <Input
                                        readOnly={viewOnly}
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        type="date"
                                        name="expectedDeliveryDate"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={formatDate(form.values.expectedDeliveryDate)}
                                        onChange={form.handleChange}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel>Payment Term Days</FormLabel>
                                </Box>
                                <Box width="40%" className="afu-input">
                                    <Input
                                        readOnly={viewOnly}
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        type="number"
                                        name="paymentTermsDays"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.paymentTermsDays}
                                        onChange={form.handleChange}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <LineItemsTableComponent
                            viewOnly={viewOnly}
                            tableLines={form.values.items}
                            items={items
                                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                                .map((v: any) => {
                                    return { ...v, price: v.costPrice };
                                })}
                            onTableLineUpdate={lineInputChanged}
                            onTableLineAdded={onTableLineAdded}
                            onTableLineRemoved={onTableLineRemoved}
                        />

                        <Flex
                            pt={{ base: "16px", md: "16px", xl: "16px" }}
                            align={{ base: "end", xl: "end" }}
                            justify={{
                                base: "space-between",
                                xl: "space-between",
                            }}
                            gap="20px"
                        >
                            <Flex
                                mb="0px"
                                direction="column"
                                justifyContent="flex-start"
                                width="45%"
                                gap="20px"
                                alignItems="baseline"
                                className="afu-label-input"
                            >
                                <Flex
                                    mb="0px"
                                    direction="column"
                                    justifyContent="flex-start"
                                    width="100%"
                                    gap="0px"
                                    alignItems="baseline"
                                    className="afu-label-input"
                                >
                                    <Box className="afu-label" minWidth="50px">
                                        <FormLabel>Terms & Conditions</FormLabel>
                                    </Box>
                                    <Box width="100%" className="afu-input">
                                        <FormControl>
                                            <Textarea
                                                readOnly={viewOnly}
                                                size="sm"
                                                placeholder={
                                                    viewOnly
                                                        ? form.values.customerNotes || "None"
                                                        : "Enter the terms and conditions of your business to be displayed in your transaction"
                                                }
                                                name="termsAndConditions"
                                                value={form.values.termsAndConditions}
                                                onChange={form.handleChange}
                                            />
                                        </FormControl>
                                    </Box>
                                </Flex>
                                <Flex
                                    mb="0px"
                                    direction="column"
                                    justifyContent="flex-start"
                                    width="100%"
                                    gap="0px"
                                    alignItems="baseline"
                                    className="afu-label-input"
                                >
                                    <Box className="afu-label" minWidth="50px">
                                        <FormLabel>Customer Notes</FormLabel>
                                    </Box>
                                    <Box width="100%" className="afu-input">
                                        <FormControl>
                                            <Textarea
                                                readOnly={viewOnly}
                                                size="sm"
                                                placeholder={
                                                    viewOnly ? form.values.customerNotes || "None" : "Enter any notes to be displayed in your transaction"
                                                }
                                                name="customerNotes"
                                                value={form.values.customerNotes}
                                                onChange={form.handleChange}
                                            />
                                        </FormControl>
                                    </Box>
                                </Flex>
                            </Flex>

                            <Stack padding="16px" borderRadius="8px" backgroundColor="blackAlpha.50" direction="column" width="50%" mt="8px" mb="auto">
                                <Flex width="100%" justifyContent="space-between">
                                    <Text fontWeight="bold">Sub Total</Text> <Text fontWeight="bold">{summary.subTotal}</Text>
                                </Flex>

                                {/* <Flex width="100%" justifyContent="space-between" alignItems="baseline">
                                <Flex justifyContent="space-between" alignItems="baseline">
                                    <Text minW="120px" fontWeight="bold">
                                        Discount
                                    </Text>
                                    <FormControl>
                                        <InputGroup size="md">
                                            <Input
                                                readOnly={viewOnly}
                                                pointerEvents={viewOnly ? "none" : "all"}
                                                maxW="100px"
                                                name="discount"
                                                type="number"

                                                width="100%"
                                                variant="outline"
                                                borderRadius="8px"
                                                value={form.values.discount}
                                                onChange={handleInputChange}
                                            />
                                            <InputRightAddon children="%" borderRightRadius="8px" />
                                        </InputGroup>
                                    </FormControl>
                                </Flex>
                                <Text fontWeight="bold">{summary.discount}</Text>
                            </Flex> */}
                                <HSeparator mt="16px" />
                                <Flex width="100%" justifyContent="space-between">
                                    <Text fontWeight="bold">Total (NGN)</Text> <Text fontWeight="bold">{summary.total}</Text>
                                </Flex>
                            </Stack>
                        </Flex>

                        {!viewOnly && (
                            <Flex
                                pt={{ base: "16px", md: "16px", xl: "16px" }}
                                align={{ base: "center", xl: "center" }}
                                justify={{
                                    base: "flex-end",
                                    xl: "flex-end",
                                }}
                                gap="20px"
                            >
                                <Button
                                    variant="outline"
                                    type="submit"
                                    isDisabled={!form.isValid || form.isSubmitting}
                                    onClick={() => setSubmitStatus("Draft")}
                                >
                                    Save as Draft
                                </Button>
                                <Button variant="brand" type="submit" isDisabled={!form.isValid || form.isSubmitting} onClick={() => setSubmitStatus("Issued")}>
                                    Save
                                </Button>
                                <ChakraLink
                                    as={ReactRouterLink}
                                    to={id ? `/admin/modules/purchases/purchase-orders/${id}` : "/admin/modules/purchases/purchase-orders"}
                                >
                                    <Button variant="outline">Cancel</Button>
                                </ChakraLink>
                            </Flex>
                        )}
                    </form>
                </Card>
            </Box>
            ;
        </>
    );
};

export default PurchaseOrderFormComponent;
