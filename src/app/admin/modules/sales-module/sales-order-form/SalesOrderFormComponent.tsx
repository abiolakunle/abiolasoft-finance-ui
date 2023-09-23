import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, Select, Stack, Textarea, InputRightAddon, InputGroup, CloseButton } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { apiBaseUrl } from "environment";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import SalesOrderFormItemsTableComponent from "./SalesOrderFormItemsTableComponent";
import { HSeparator } from "components/separator/Separator";
import { formatDate } from "utils/dateUtils";

const SalesOrderFormComponent = ({ viewOnly }: { viewOnly?: boolean }) => {
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);
    const [salesPersons, setSalesPersons] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        number: "",
        referenceNumber: "",
        date: "",
        expectedShipmentDate: "",
        paymentTermsDays: "",
        customerId: "",
        customerNotes: "",
        termsAndConditions: "",
        salesPersonId: "",
        discount: "",
        status: "",
        items: [
            {
                itemId: "",
                itemName: "",
                description: "",
                quantity: 0,
                rate: 0,
                tax: 0,
            },
        ],
    });

    const [summary, setSummary] = useState({
        subTotal: 0,
    });

    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const initialRequests = [
            axios.get(apiBaseUrl + `Sales/GetAllCustomers?PageIndex=1&PageSize=5000`),
            axios.get(apiBaseUrl + `Sales/GetAllSalesPersons?PageIndex=1&PageSize=5000`),
            axios.get(apiBaseUrl + `Inventory/GetAllItems?PageIndex=1&PageSize=5000`),
        ];

        if (id) {
            initialRequests.push(axios.get(apiBaseUrl + `Sales/GetSalesOrderById?id=${id}`));
        }

        Promise.all(initialRequests)
            .then((response) => {
                setCustomers(response[0].data?.data?.items);
                setSalesPersons(response[1].data?.data?.items);
                setItems(response[2].data?.data?.items);

                if (id) {
                    const salesOrder = response[3].data?.data;
                    setFormData({ ...formData, ...salesOrder });
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (status: "Confirmed" | "Draft") => {
        formData.status = status;
        try {
            const response = await (id ? axios.put(apiBaseUrl + "Sales/EditSalesOrder", formData) : axios.post(apiBaseUrl + "Sales/CreateSalesOrder", formData));

            if (response.status === 200) {
                if (id) {
                    navigate(`/admin/modules/sales/sales-orders/${id}`);
                } else {
                    navigate("/admin/modules/sales/sales-orders");
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
                    base: "space-between",
                    xl: "space-between",
                }}
                gap="20px"
            >
                {!viewOnly && (
                    <>
                        <Heading as="h4" size="md">
                            {id ? "Edit Sales Order" : "New Sales Order"}
                        </Heading>

                        <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                            <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/sales/sales-orders/${id}` : `/admin/modules/sales/sales-orders`}>
                                <CloseButton size="lg" />
                            </ChakraLink>
                        </Flex>
                    </>
                )}
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="200px">
                                <FormLabel color={viewOnly ? "" : "red"}>Customer Name{viewOnly ? "" : "*"}</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Select
                                    pointerEvents={viewOnly ? "none" : "all"}
                                    name="customerId"
                                    placeholder="Select a customer"
                                    value={formData.customerId}
                                    onChange={handleInputChange}
                                >
                                    {customers.map((customer, index) => (
                                        <option key={index} value={customer.id}>
                                            {customer.customerDisplayName}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="200px">
                                <FormLabel color={viewOnly ? "" : "red"}>Sales Order#{viewOnly ? "" : "*"}</FormLabel>
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
                                    value={formData.number}
                                    onChange={handleInputChange}
                                />
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
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.referenceNumber}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="200px">
                                <FormLabel color={viewOnly ? "" : "red"}>Sales Order Date{viewOnly ? "" : "*"}</FormLabel>
                            </Box>
                            <Box width="40%" className="afu-input">
                                <Input
                                    readOnly={viewOnly}
                                    pointerEvents={viewOnly ? "none" : "all"}
                                    type="date"
                                    name="date"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formatDate(formData.date)}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="200px">
                                <FormLabel>Expected Shipment Date</FormLabel>
                            </Box>
                            <Box width="40%" className="afu-input">
                                <Input
                                    readOnly={viewOnly}
                                    pointerEvents={viewOnly ? "none" : "all"}
                                    type="date"
                                    name="expectedShipmentDate"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formatDate(formData.expectedShipmentDate)}
                                    onChange={handleInputChange}
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
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.paymentTermsDays}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="200px">
                                <FormLabel>Salesperson</FormLabel>
                            </Box>
                            <Box width="40%" className="afu-input">
                                <Select
                                    pointerEvents={viewOnly ? "none" : "all"}
                                    name="salesPersonId"
                                    placeholder="Select a salesperson"
                                    value={formData.salesPersonId}
                                    onChange={handleInputChange}
                                >
                                    {salesPersons.map((person, index) => (
                                        <option key={index} value={person.id}>
                                            {person.name}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                        </Flex>
                    </FormControl>

                    <SalesOrderFormItemsTableComponent
                        tableData={formData.items}
                        items={items}
                        onTableUpdate={(subTotal: number) => {
                            setSummary({
                                ...summary,
                                subTotal,
                            });
                        }}
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
                        <Flex mb="0px" direction="column" justifyContent="flex-start" width="45%" gap="20px" alignItems="baseline" className="afu-label-input">
                            <Flex mb="0px" direction="column" justifyContent="flex-start" width="100%" gap="0px" alignItems="baseline" className="afu-label-input">
                                <Box className="afu-label" minWidth="50px">
                                    <FormLabel>Terms & Conditions</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <FormControl>
                                        <Textarea
                                            readOnly={viewOnly}
                                            size="sm"
                                            placeholder={
                                                viewOnly ? formData.customerNotes || "None" : "Enter the terms and conditions of your business to be displayed in your transaction"
                                            }
                                            name="termsAndConditions"
                                            value={formData.termsAndConditions}
                                            onChange={handleInputChange}
                                        />
                                    </FormControl>
                                </Box>
                            </Flex>
                            <Flex mb="0px" direction="column" justifyContent="flex-start" width="100%" gap="0px" alignItems="baseline" className="afu-label-input">
                                <Box className="afu-label" minWidth="50px">
                                    <FormLabel>Customer Notes</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <FormControl>
                                        <Textarea
                                            readOnly={viewOnly}
                                            size="sm"
                                            placeholder={viewOnly ? formData.customerNotes || "None" : "Enter any notes to be displayed in your transaction"}
                                            name="customerNotes"
                                            value={formData.customerNotes}
                                            onChange={handleInputChange}
                                        />
                                    </FormControl>
                                </Box>
                            </Flex>
                        </Flex>

                        <Stack padding="16px" borderRadius="8px" backgroundColor="blackAlpha.50" direction="column" width="50%" mt="8px" mb="auto">
                            <Flex width="100%" justifyContent="space-between">
                                <Text fontWeight="bold">Sub Total</Text> <Text fontWeight="bold">{summary.subTotal}</Text>
                            </Flex>

                            <Flex width="100%" justifyContent="space-between" alignItems="baseline">
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
                                                isRequired={true}
                                                width="100%"
                                                variant="outline"
                                                borderRadius="8px"
                                                value={formData.discount}
                                                onChange={handleInputChange}
                                            />
                                            <InputRightAddon children="%" borderRightRadius="8px" />
                                        </InputGroup>
                                    </FormControl>
                                </Flex>
                                <Text fontWeight="bold">0.00</Text>
                            </Flex>
                            <HSeparator mt="16px" />
                            <Flex width="100%" justifyContent="space-between">
                                <Text fontWeight="bold">Total (NGN)</Text> <Text fontWeight="bold">0.00</Text>
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
                            <Button variant="outline" onClick={() => handleSubmit("Draft")}>
                                Save as Draft
                            </Button>
                            <Button variant="brand" onClick={() => handleSubmit("Confirmed")}>
                                Save
                            </Button>
                            <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/sales/sales-orders/${id}` : "/admin/modules/sales/sales-orders"}>
                                <Button variant="outline">Cancel</Button>
                            </ChakraLink>
                        </Flex>
                    )}
                </Card>
            </Box>
            ;
        </>
    );
};

export default SalesOrderFormComponent;
