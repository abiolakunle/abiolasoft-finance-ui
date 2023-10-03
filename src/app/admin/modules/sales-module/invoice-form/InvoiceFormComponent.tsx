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
    InputRightAddon,
    InputGroup,
    FormErrorMessage,
    CloseButton,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HSeparator } from "components/separator/Separator";
import axiosRequest from "utils/api";
import { formatDate } from "utils/dateUtils";
import LineItemsTableComponent, { defaultItem } from "app-components/line-items-table/LineItemsTableComponent";
import sort from "utils/AlphSortUtils"

const InvoiceFormComponent = ({ viewOnly }: { viewOnly?: boolean }) => {
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [submitStatus, setSubmitStatus] = useState("");
    const [summary, setSummary] = useState({
        subTotal: 0,
        discount: 0,
        total: 0,
    });

    const sortCustomerAlphabetically = () => {
        const sorted = customers.sort((a: any, b: any) => a.customerDisplayName.localeCompare(b.customerDisplayName))
        setCustomers(sorted)
    }


    const sortSalesperson = (arr: any ) => {
        return arr.sort((a: any, b: any) => a.name.localeCompare(b.name))
        
    }

    const validationSchema = Yup.object().shape({
        customerId: Yup.string().required("Select a customer"),
        salespersonId: Yup.string().required("Select a salesperson"),
        number: Yup.string().required("Invoice Number is required"),
        date: Yup.string().required("Invoice Date is required"),
    });

    const form = useFormik({
        initialValues: {
            id: "",
            customerId: "",
            number: "",
            date: "",
            customerDisplayName: "",
            salespersonId: "",
            customerNotes: "",
            termsAndConditions: "",
            status: "",
            discount: 0,
            orderNumber: "",
            dueDate: "",
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
                const response = await (id ? axiosRequest.put("Sales/EditInvoice", values) : axiosRequest.post("Sales/CreateInvoice", values));

                if (response.status === 200) {
                    if (id) {
                        navigate(`/admin/modules/sales/invoices/${id}`);
                    } else {
                        navigate("/admin/modules/sales/invoices");
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

    useEffect(() => {
        const initialRequests = [
            axiosRequest.get(`Sales/GetAllCustomers?PageIndex=1&PageSize=5000`),
            axiosRequest.get(`Sales/GetAllSalespersons?PageIndex=1&PageSize=5000`),
            axiosRequest.get(`Inventory/GetAllItems?PageIndex=1&PageSize=5000`),
        ];

        if (id) {
            initialRequests.push(axiosRequest.get(`Sales/GetInvoiceById?id=${id}`));
        }

        Promise.all(initialRequests)
            .then((response) => {
                if (id) {
                    const invoice = response[3].data?.data;

                    form.values.items = invoice.items;

                    const f = { ...form.values, ...invoice };
                    form.setValues(f);
                }

                const tempCustomers = response[0].data?.data?.items
                const sortedCustomers = tempCustomers.sort((a: any, b: any) => a.customerDisplayName.localeCompare(b.customerDisplayName))
                setCustomers(sortedCustomers)
                

                const tempSalespersons = response[1].data?.data?.items
                const sortedSalespersons = tempSalespersons.sort((a: any, b: any) => a.name.localeCompare(b.name))
                setSalespersons(sortedSalespersons);
                
                setItems(response[2].data?.data?.items);

            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

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
                            {id ? "Edit Invoice" : "New Invoice"}
                        </Heading>

                        <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                            <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/sales/invoices/${id}` : `/admin/modules/sales/invoices`}>
                                <CloseButton size="lg" />
                            </ChakraLink>
                        </Flex>
                    </>
                )}
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <form noValidate onSubmit={form.handleSubmit}>
                        <FormControl isInvalid={form.touched.customerId && !!form.errors.customerId}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel color={viewOnly ? "" : "red"}>Customer Name{viewOnly ? "" : "*"}</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Select
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        name="customerId"
                                        placeholder="Select a customer"
                                        value={form.values.customerId}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    >
                                        {customers.map((customer, index) => (
                                            <option key={index} value={customer.customerDisplayName}>
                                                
                                                {customer.customerDisplayName}
                                            </option>
                                        ))}
                                    </Select>
                                    {form.touched.customerId && !!form.errors.customerId ? <FormErrorMessage>{form.errors.customerId}</FormErrorMessage> : ""}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.number && !!form.errors.number}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel color={viewOnly ? "" : "red"}>Invoice#{viewOnly ? "" : "*"}</FormLabel>
                                </Box>
                                <Box width="40%" className="afu-input">
                                    <Input
                                        readOnly={viewOnly}
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        name="number"
                                        type="text"
                                        isRequired={true}
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
                                    <FormLabel>Order Number</FormLabel>
                                </Box>
                                <Box width="40%" className="afu-input">
                                    <Input
                                        readOnly={viewOnly}
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        name="orderNumber"
                                        type="text"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.orderNumber}
                                        onChange={form.handleChange}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.date && !!form.errors.date}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel color={viewOnly ? "" : "red"}>Invoice Date{viewOnly ? "" : "*"}</FormLabel>
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
                                    <FormLabel>Due Date</FormLabel>
                                </Box>
                                <Box width="40%" className="afu-input">
                                    <Input
                                        readOnly={viewOnly}
                                        pointerEvents={viewOnly ? "none" : "all"}
                                        type="date"
                                        name="dueDate"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={formatDate(form.values.dueDate)}
                                        onChange={form.handleChange}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.salespersonId && !!form.errors.salespersonId}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="200px">
                                    <FormLabel>Salesperson</FormLabel>
                                </Box>
                                <Box width="40%" className="afu-input">
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
                            items={items.sort((a: any, b: any) => a.name.localeCompare(b.name))}
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
                                <Button
                                    variant="brand"
                                    type="submit"
                                    isDisabled={!form.isValid || form.isSubmitting}
                                    onClick={() => setSubmitStatus("Confirmed")}
                                >
                                    Save
                                </Button>
                                <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/sales/invoices/${id}` : "/admin/modules/sales/invoices"}>
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

export default InvoiceFormComponent;
