import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import axiosRequest from "utils/api";

const VendorFormComponent = () => {
    const [formData, setFormData] = useState({
        id: "",
        vendorFirstName: "",
        vendorPhone: 0,
        vendorLastName: "",
        vendorDisplayName: "",
        companyName: "",
        vendorEmail: "",
        vendorAddress: "",
    });

    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axiosRequest
                .get(`Purchases/GetVendorById=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setFormData({
                            id,
                            vendorFirstName: data.vendorFirstName,
                            vendorLastName: data.vendorLastName,
                            vendorPhone: data.vendorPhone,
                            vendorDisplayName: data.vendorDisplayName,
                            companyName: data.companyName,
                            vendorAddress: data.vendorAddress,
                            vendorEmail: data.vendorEmail,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await (id ? axiosRequest.put("Purchases/EditVendor", formData) : axiosRequest.post("Purchases/CreateVendor", formData));

            if (response.status === 200) {
                if (id) {
                    navigate(`/admin/modules/purchases/vendor/${id}`);
                } else {
                    navigate("/admin/modules/purhases/vendors");
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
                    New Vendor
                </Heading>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>FIRST NAME</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    name="customerFirstName"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.vendorFirstName}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>LAST NAME</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    name="customerLastName"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.vendorLastName}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>PHONE NUMBER</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    name="customerPhone"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.vendorPhone}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>COMPANY NAME</FormLabel>
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
                                <Input name="customerEmail" width="100%" variant="outline" borderRadius="8px" value={formData.vendorEmail} onChange={handleInputChange} />
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
                                    value={formData.vendorDisplayName}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl>
                        <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                            <Box className="afu-label" minWidth="250px">
                                <FormLabel>HOME ADDRESS</FormLabel>
                            </Box>
                            <Box width="100%" className="afu-input">
                                <Input
                                    name="customerAddress"
                                    isRequired={true}
                                    width="100%"
                                    variant="outline"
                                    borderRadius="8px"
                                    value={formData.vendorAddress}
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
                            Save
                        </Button>
                        <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/purhases/vendor/${id}` : "/admin/modules/purhases/vendors"}>
                            <Button variant="outline">Cancel</Button>
                        </ChakraLink>
                    </Flex>
                </Card>
            </Box>
            ;
        </>
    );
};

export default VendorFormComponent;