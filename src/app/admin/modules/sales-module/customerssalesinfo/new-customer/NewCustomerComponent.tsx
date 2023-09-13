import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftAddon, Select, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { apiBaseUrl } from "environment";
import React, { useEffect, useState } from "react";



const NewCustomerComponent = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        Address: "",
        
        next: "",
        phoneNext: "",
        
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
            const response = await axios.post(apiBaseUrl + "api/Sales/RegNewCustomer", formData);

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
                New Item
            </Heading>
        </Flex>
        <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
            <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel color="red">Name*</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input name="name" isRequired={true} width="100%" variant="outline" borderRadius="8px" value={formData.name} onChange={handleInputChange} />
                        </Box>
                    </Flex>
                </FormControl>
                
                <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel>Email Address</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input width="100%" variant="outline" borderRadius="8px" name="email" value={formData.email} onChange={handleInputChange} />
                        </Box>
                    </Flex>
                </FormControl>

                <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel>Phone Number</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input width="100%" variant="outline" borderRadius="8px" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                        </Box>
                    </Flex>
                </FormControl>

                <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel>Address</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input width="100%" variant="outline" borderRadius="8px" name="address" value={formData.Address} onChange={handleInputChange} />
                        </Box>
                    </Flex>
                </FormControl>


                <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel>Who To Contact If We Cannnot Reach You</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input width="100%" variant="outline" borderRadius="8px" name="next" value={formData.next} onChange={handleInputChange} />
                        </Box>
                    </Flex>
                </FormControl>

                <FormControl>
                    <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                        <Box className="afu-label" minWidth="250px">
                            <FormLabel>Phone Number</FormLabel>
                        </Box>
                        <Box width="100%" className="afu-input">
                            <Input width="100%" variant="outline" borderRadius="8px" name="phoneNext" value={formData.phoneNext} onChange={handleInputChange} />
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
                    <Button variant="outline">Cancel</Button>
                </Flex>


            </Card>
        </Box>


    </>
  )
}

export default NewCustomerComponent
