import {
    Box,
    Button,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
    Textarea,
    CloseButton,
    FormErrorMessage,
    Tooltip,
    IconButton,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import LineItemsTableComponent, { defaultItem } from "../../../../../app-components/line-items-table/LineItemsTableComponent";
import { HSeparator } from "components/separator/Separator";
import { currentDate, formatDate } from "utils/dateUtils";
import axiosRequest from "utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatNumberWithCommas } from "utils/number";
import { MdOutlineSearch, MdOutlineClose } from "react-icons/md";
import printJS from "print-js";

export const ReceiptFormComponent = ({ viewOnly }: { viewOnly?: boolean }) => {
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [customerDropdownVisible, setCustomerDropdownVisible] = useState(false);

    const validationSchema = Yup.object().shape({
        customerId: !customerDropdownVisible ? Yup.string().notRequired() : Yup.string().required("Select a customer"),
        customerName: customerDropdownVisible ? Yup.string().notRequired() : Yup.string().required("Type the customer name"),
        salespersonId: Yup.string().required("Select a salesperson"),
        date: Yup.string().required("Receipt Date is required"),
    });

    const { organizationId } = useParams();

    const form = useFormik({
        initialValues: {
            id: "",
            number: "",
            referenceNumber: "",
            date: currentDate(),
            expectedShipmentDate: currentDate(),
            paymentTermsDays: "",
            customerId: "",
            customerName: "",
            customerNotes: "",
            termsAndConditions: "",
            salespersonId: "",
            discount: 0,
            status: "",
            items: [{ ...defaultItem }],
        },
        validationSchema,
        onSubmit: async (values) => {
            values.items = values.items.map((item) => {
                const itemName = items.find((i) => i.id === item.itemId)?.name;
                return { ...item, description: "", itemName };
            });
            try {
                const response = await (id ? axiosRequest.put("Sales/EditReceipt", values) : axiosRequest.post("Sales/CreateReceipt", values));

                if (response.status === 200) {
                    if (id) {
                        navigate(`/admin/organizations/${organizationId}/modules/sales/receipts/${id}`);
                    } else {
                        navigate(`/admin/organizations/${organizationId}/modules/sales/receipts`);
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
            axiosRequest.get(`Sales/GetAllCustomers?PageIndex=1&PageSize=500`),
            axiosRequest.get(`Sales/GetAllSalespersons?PageIndex=1&PageSize=500`),
            axiosRequest.get(`Inventory/GetAllItems?PageIndex=1&PageSize=500`),
        ];

        if (id) {
            initialRequests.push(axiosRequest.get(`Sales/GetReceiptById?id=${id}`));
        }

        Promise.all(initialRequests)
            .then((response) => {
                if (id) {
                    const receipt = response[3].data?.data;

                    const f = { ...form.values, ...receipt, customerName: !!receipt.customerId ? "" : receipt.customerName, items: receipt.items };
                    form.setValues(f);
                    setCustomerDropdownVisible(!!receipt.customerId);
                }

                const sortedCustomers = response[0].data?.data?.items.sort((a: any, b: any) => a.customerDisplayName.localeCompare(b.customerDisplayName));
                setCustomers(sortedCustomers);

                const sortedSalespersons = response[1].data?.data?.items.sort((a: any, b: any) => a.name.localeCompare(b.name));
                setSalespersons(sortedSalespersons);

                setItems(
                    response[2].data?.data?.items
                        .sort((a: any, b: any) => a.name.localeCompare(b.name))
                        .map((v: any) => {
                            return { ...v, price: v.sellingPrice };
                        })
                );
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
                            {id ? "Edit Receipt" : "New Receipt"}
                        </Heading>

                        <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                            <ChakraLink
                                as={ReactRouterLink}
                                to={
                                    id
                                        ? `/admin/organizations/${organizationId}/modules/sales/receipts/${id}`
                                        : `/admin/organizations/${organizationId}/modules/sales/receipts`
                                }
                            >
                                <CloseButton size="lg" />
                            </ChakraLink>
                        </Flex>
                    </>
                )}
            </Flex>
            <Box id="receipt-container" maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px={{ base: "32px", sm: "8px", md: "16px" }} w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <form noValidate onSubmit={form.handleSubmit}>
                        <FormControl
                            isInvalid={(form.touched.customerId && !!form.errors.customerId) || (form.touched.customerName && !!form.errors.customerName)}
                        >
                            <Flex
                                flexWrap={{ sm: "wrap", md: "nowrap" }}
                                mb="16px"
                                justifyContent="flex-start"
                                width="100%"
                                gap={{ md: "20px", sm: "5px" }}
                                alignItems="center"
                                className="afu-label-input"
                            >
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel color={viewOnly ? "" : "red"}>Customer Name{viewOnly ? "" : "*"}</FormLabel>
                                </Box>
                                <Box width={`calc(40% ${!viewOnly ? " + 50px" : ""})`} className="afu-input">
                                    <Flex alignItems="center" gap="10px">
                                        {customerDropdownVisible && (
                                            <Select
                                                pointerEvents={viewOnly ? "none" : "all"}
                                                name="customerId"
                                                placeholder="Select a customer"
                                                value={form.values.customerId}
                                                onChange={form.handleChange}
                                                onBlur={form.handleBlur}
                                            >
                                                {customers.map((customer, index) => (
                                                    <option key={index} value={customer.id}>
                                                        {customer.customerDisplayName}
                                                    </option>
                                                ))}
                                            </Select>
                                        )}

                                        {!customerDropdownVisible && (
                                            <Input
                                                readOnly={viewOnly}
                                                pointerEvents={viewOnly ? "none" : "all"}
                                                name="customerName"
                                                type="text"
                                                width="100%"
                                                variant="outline"
                                                borderRadius="8px"
                                                value={form.values.customerName}
                                                onChange={form.handleChange}
                                                onBlur={form.handleBlur}
                                                placeholder="Type the customer's name"
                                            />
                                        )}
                                        {!viewOnly && (
                                            <IconButton
                                                variant="outline"
                                                colorScheme="brand"
                                                borderRadius="10px"
                                                border="0px"
                                                aria-label="Edit"
                                                fontSize="20px"
                                                icon={
                                                    customerDropdownVisible ? (
                                                        <MdOutlineClose
                                                            onClick={() => {
                                                                form.setFieldValue("customerId", "");
                                                                setCustomerDropdownVisible(false);
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdOutlineSearch
                                                            onClick={() => {
                                                                form.setFieldValue("customerName", "");
                                                                setCustomerDropdownVisible(true);
                                                            }}
                                                        />
                                                    )
                                                }
                                            />
                                        )}
                                    </Flex>
                                    {customerDropdownVisible && form.touched.customerId && !!form.errors.customerId ? (
                                        <FormErrorMessage>{form.errors.customerId}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                    {!customerDropdownVisible && form.touched.customerName && !!form.errors.customerName ? (
                                        <FormErrorMessage>{form.errors.customerName}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                            </Flex>
                        </FormControl>

                        {
                            <FormControl isInvalid={form.touched.number && !!form.errors.number}>
                                <Flex
                                    mb="16px"
                                    flexWrap={{ sm: "wrap", md: "nowrap" }}
                                    justifyContent="flex-start"
                                    width="100%"
                                    gap={{ md: "20px", sm: "5px" }}
                                    alignItems="center"
                                    className="afu-label-input"
                                >
                                    <Box className="afu-label" minWidth="200px">
                                        <FormLabel color={true ? "" : "red"}>Receipt#{true ? "" : "*"}</FormLabel>
                                    </Box>
                                    <Box width={{ sm: "100%", md: "40%" }} className="afu-input">
                                        <Tooltip
                                            hasArrow
                                            label="If you leave this empty, we would auto generate an receipt number for this receipt"
                                            bg="gray.300"
                                            color="black"
                                        >
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
                                        </Tooltip>
                                        {form.touched.number && !!form.errors.number ? <FormErrorMessage>{form.errors.number}</FormErrorMessage> : ""}
                                    </Box>
                                </Flex>
                            </FormControl>
                        }

                        <FormControl isInvalid={form.touched.date && !!form.errors.date}>
                            <Flex
                                flexWrap={{ sm: "wrap", md: "nowrap" }}
                                mb="16px"
                                justifyContent="flex-start"
                                width="100%"
                                gap={{ md: "20px", sm: "5px" }}
                                alignItems="center"
                                className="afu-label-input"
                            >
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel color={viewOnly ? "" : "red"}>Receipt Date{viewOnly ? "" : "*"}</FormLabel>
                                </Box>
                                <Box width={{ sm: "100%", md: "40%" }} className="afu-input">
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
                            <Flex
                                flexWrap={{ sm: "wrap", md: "nowrap" }}
                                mb="16px"
                                justifyContent="flex-start"
                                width="100%"
                                gap={{ md: "20px", sm: "5px" }}
                                alignItems="center"
                                className="afu-label-input"
                            >
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel>Expected Shipment Date</FormLabel>
                                </Box>
                                <Box width={{ sm: "100%", md: "40%" }} className="afu-input">
                                    <Input
                                        readOnly={viewOnly}
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        type="date"
                                        name="expectedShipmentDate"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={formatDate(form.values.expectedShipmentDate)}
                                        onChange={form.handleChange}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl>
                            <Flex
                                flexWrap={{ sm: "wrap", md: "nowrap" }}
                                mb="16px"
                                justifyContent="flex-start"
                                width="100%"
                                gap={{ md: "20px", sm: "5px" }}
                                alignItems="center"
                                className="afu-label-input"
                            >
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel>Payment Term Days</FormLabel>
                                </Box>
                                <Box width={{ sm: "100%", md: "40%" }} className="afu-input">
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

                        <FormControl isInvalid={form.touched.salespersonId && !!form.errors.salespersonId}>
                            <Flex
                                flexWrap={{ sm: "wrap", md: "nowrap" }}
                                mb="16px"
                                justifyContent="flex-start"
                                width="100%"
                                gap={{ md: "20px", sm: "5px" }}
                                alignItems="center"
                                className="afu-label-input"
                            >
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel color={viewOnly ? "" : "red"}>Salesperson{viewOnly ? "" : "*"}</FormLabel>
                                </Box>
                                <Box width={{ sm: "100%", md: "40%" }} className="afu-input">
                                    <Select
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        name="salespersonId"
                                        placeholder="Select a salesperson"
                                        value={form.values.salespersonId}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    >
                                        {salespersons.map((person, index) => (
                                            <option key={index} value={person.id}>
                                                {person.name}
                                            </option>
                                        ))}
                                    </Select>
                                    {form.touched.salespersonId && !!form.errors.salespersonId ? (
                                        <FormErrorMessage>{form.errors.salespersonId}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                            </Flex>
                        </FormControl>

                        <LineItemsTableComponent
                            viewOnly={viewOnly}
                            tableLines={form.values.items}
                            items={items}
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
                            flexDirection={{ sm: "column-reverse", md: "row" }}
                        >
                            <Flex
                                mb="0px"
                                direction="column"
                                justifyContent="flex-start"
                                width={{ sm: "100%", md: "45%" }}
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

                            <Stack
                                padding="16px"
                                borderRadius="8px"
                                backgroundColor="blackAlpha.50"
                                direction="column"
                                width={{ sm: "100%", md: "50%" }}
                                mt="8px"
                                mb="auto"
                            >
                                <Flex width="100%" justifyContent="space-between">
                                    <Text fontWeight="bold">Sub Total</Text> <Text fontWeight="bold">{"₦" + formatNumberWithCommas(summary.subTotal)}</Text>
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
                                    <Text fontWeight="bold">Total </Text> <Text fontWeight="bold">{"₦" + formatNumberWithCommas(summary.total)}</Text>
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
                                flexWrap={{ sm: "wrap", md: "nowrap" }}
                            >
                                <Button variant="brand" type="submit" isDisabled={!form.isValid || form.isSubmitting} width={{ sm: "100%", md: "fit-content" }}>
                                    Save
                                </Button>
                                <ChakraLink
                                    width={{ sm: "100%", md: "fit-content" }}
                                    as={ReactRouterLink}
                                    to={
                                        id
                                            ? `/admin/organizations/${organizationId}/modules/sales/receipts/${id}`
                                            : `/admin/organizations/${organizationId}/modules/sales/receipts`
                                    }
                                >
                                    <Button width={{ sm: "100%", md: "fit-content" }} variant="outline">
                                        Cancel
                                    </Button>
                                </ChakraLink>
                            </Flex>
                        )}
                    </form>
                </Card>
            </Box>
            ;``
        </>
    );
};
