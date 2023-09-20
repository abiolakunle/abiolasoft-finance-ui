import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { apiBaseUrl } from "environment";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";

const SalesOrderFormComponent = () => {
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);
    const [salesPersons, setSalesPersons] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        number: "",
        referenceNumber: "",
        date: "",
        expectedShipmentDate: "",
        customerId: "",
        customerNote: "",
        salesPersonId: "",
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
                    setFormData({ ...formData });
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

    const handleSubmit = async () => {
        try {
            const response = await (id ? axios.put(apiBaseUrl + "Sales/EditSalesOrders", formData) : axios.post(apiBaseUrl + "Sales/CreateSalesOrder", formData));

            if (response.status === 200) {
                if (id) {
                    navigate(`/admin/modules/sales/sales-orders/${id}`);
                } else {
                    navigate("/admin/modules/sales/sales-order");
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
                    New Sales Order
                </Heading>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="200px">
                                <FormLabel color="red">Customer Name*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Select name="id" placeholder="Select a Company Name" value={formData.id} onChange={handleInputChange}>
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
                                <FormLabel color="red">Sales Order#*</FormLabel>
                            </Box>
                            <Box width="40%" className="afu-input">
                                <Input name="number" isRequired={true} width="100%" variant="outline" borderRadius="8px" value={formData.number} onChange={handleInputChange} />
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
                                    name="referenceNumber"
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
                                <FormLabel color="red">Date*</FormLabel>
                            </Box>
                            <Box width="40%" className="afu-input">
                                <Input
                                    type="date"
                                    name="date"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.date}
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
                                    type="date"
                                    name="expectedShipmentDate"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.expectedShipmentDate}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    {/* <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel >LAST NAME</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input
                                name="customerLastName"
                                isRequired={true}
                                width="100%"
                                variant="outline"
                                borderRadius="8px"
                                value={formData.customerLastName}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Flex>
                </FormControl>

                <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel >PHONE NUMBER</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input
                                name="customerPhone"
                                isRequired={true}
                                width="100%"
                                variant="outline"
                                borderRadius="8px"
                                value={formData.customerPhone}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Flex>
                </FormControl> */}

                    {/* <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel >COMPANY NAME</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input
                                name="companyName"
                                isRequired={true}
                                width="100%"
                                variant="outline"
                                borderRadius="8px"
                                value={formData.companyName}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Flex>
                </FormControl>

                <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel>EMAIL ADDRESS</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input name="customerEmail" width="100%" variant="outline" borderRadius="8px" value={formData.customerEmail} onChange={handleInputChange} />
                        </Box>
                    </Flex>
                </FormControl>

                <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel color="red">DISPLAY NAME*</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input
                                name="customerDisplayName"
                                isRequired={true}
                                width="100%"
                                variant="outline"
                                borderRadius="8px"
                                value={formData.customerDisplayName}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Flex>
                </FormControl>

                <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel >HOME ADDRESS</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input
                                name="customerAddress"
                                isRequired={true}
                                width="100%"
                                variant="outline"
                                borderRadius="8px"
                                value={formData.customerAddress}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Flex>
                </FormControl> */}

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
                        <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/sales/customer/${id}` : "/admin/modules/sales/customers"}>
                            <Button variant="outline">Cancel</Button>
                        </ChakraLink>
                    </Flex>
                </Card>
            </Box>
            ;
        </>
    );
};

export default SalesOrderFormComponent;
