import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftAddon, Select, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { apiBaseUrl } from "environment";
import React, { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const NewCustomerComponent = () => {
    const [formData, setFormData] = useState({
        customerFirstName: "",
        customerLastName: "",
        companyName: "",
        customerDisplayName: "",
        customerEmail: "",
        customerPhone: "",
        customerAddress: "",
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
            const response = await axios.post(apiBaseUrl + "api/Sales/CreateCustomer", formData);

            if (response.status === 200) {
                console.log("new customer registered successfully");
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
                    New Customer
                </Heading>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">First Name*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    name="customerFirstName"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.customerFirstName}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Last Name*</FormLabel>
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
                                <FormLabel>Company Name</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input width="100%" variant="outline" borderRadius="8px" name="companyName" value={formData.companyName} onChange={handleInputChange} />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Display Name*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    name="customerDisplayName"
                                    value={formData.customerDisplayName}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Emain Address*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    name="customerEmail"
                                    value={formData.customerEmail}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Phone Number*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    type="tel"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    name="customerPhone"
                                    value={formData.customerPhone}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel color="red">Home Address*</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    name="customerAddress"
                                    value={formData.customerAddress}
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
                            Submit
                        </Button>
                        <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/customerssalesinfo/`}>
                            <Button variant="outline">Cancel</Button>
                        </ChakraLink>
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default NewCustomerComponent;
