import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, Select, Stack, Textarea, InputRightAddon, InputGroup } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { apiBaseUrl } from "environment";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";

import { HSeparator } from "components/separator/Separator";
import NewInvoiceFormTableComponent from "./NewInvoiceFormTableComponent"

const NewInvoiceFormComponent = ({ viewOnly }: { viewOnly?: boolean }) => {
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);
    const [salesPersons, setSalesPersons] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        customerDisplayName: "",
        customerId: "",
        number: "",
        date: "",
        salesPersonId: "",
        customerNotes: "",
        termsAndConditions: "",
        status: "",
        discount:"",
        orderNumber: "",
        dueDate: "",
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

    const { id } = useParams();
    let navigate = useNavigate();
    const readOnly = true


    // const formData = "2023-03-27T20:27:04.2431926+00:00";

    const formatDate = (dateString: string) => {
        const match = dateString.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/);

        if (match) {
            const datePart = match[1];
            return datePart;
        }

        return "";
    };
    

    useEffect(() => {
        const initialRequests = [
            axios.get(apiBaseUrl + `Sales/GetAllCustomers?PageIndex=1&PageSize=5000`),
            axios.get(apiBaseUrl + `Sales/GetAllSalesPersons?PageIndex=1&PageSize=5000`),
            axios.get(apiBaseUrl + `Inventory/GetAllItems?PageIndex=1&PageSize=5000`),
        ];

        if (id) {
            initialRequests.push(axios.get(apiBaseUrl + `Sales/GetInvoiceById?id=${id}`));
        }

        Promise.all(initialRequests)
            .then((response) => {
                setCustomers(response[0].data?.data?.items);
                setSalesPersons(response[1].data?.data?.items);
                setItems(response[2].data?.data?.items);

                if (id) {
                    const salesOrder = response[3].data?.data;
                   
                    if (!!salesOrder) {
                        setFormData({ ...formData, ...salesOrder });
                        
                        console.log(salesOrder.salesPersonId)
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    const handleInputChange: any = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (status: "Confirmed" | "Draft") => {
        formData.status = status;
        try {
            const response = await (id ? axios.put(apiBaseUrl + "Sales/EditInvoice", formData) : axios.post(apiBaseUrl + "Sales/CreateInvoice", formData));

            if (response.status === 200) {
                if (id) {
                    navigate(`/admin/modules/sales/invoice/${id}`);
                } else {
                    navigate("/admin/modules/sales/customer-invoice");
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
                    New Customer Invoice
                </Heading>
                
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="200px">
                                <FormLabel color={viewOnly ? "" : "red"}>Customer Name{viewOnly ? "" : "*"}</FormLabel>
                            </Box>
                            <Box width="100%"  className="afu-input">
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
                            <FormLabel color={viewOnly ? "" : "red"}>Invoice#{viewOnly ? "" : "*"}</FormLabel>
                            </Box>
                            <Box width="40%" className="afu-input">
                                <Input readOnly={viewOnly}
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
                                <FormLabel>Order Number</FormLabel>
                            </Box>
                            <Box width="40%" className="afu-input">
                                <Input

                                    readOnly={viewOnly}
                                    pointerEvents={viewOnly ? "none" : "all"}
                                    name="orderNumber"
                                    type="text"
                                    
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.orderNumber}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="200px">
                                <FormLabel color="red">Invoice Date*</FormLabel>
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
                                    value={formatDate(formData.dueDate)}
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

                    <NewInvoiceFormTableComponent tableData={formData.items} items={items} />

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
                                <Text fontWeight="bold">Sub Total</Text> <Text fontWeight="bold">0.00</Text>
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
                            <ChakraLink as={ReactRouterLink} to={"/admin/modules/sales/customer-invoices"}>
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

export default NewInvoiceFormComponent;
