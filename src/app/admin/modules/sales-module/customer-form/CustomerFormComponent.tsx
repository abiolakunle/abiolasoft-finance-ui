import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "components/card/Card";
import { useEffect } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import axiosRequest from "utils/api";

const CustomerFormComponent = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        customerDisplayName: Yup.string().required("Display Name is required"),
    });

    const form = useFormik({
        initialValues: {
            id: "",
            customerFirstName: "",
            customerPhone: 0,
            customerLastName: "",
            customerDisplayName: "",
            companyName: "",
            customerEmail: "",
            customerAddress: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await (id ? axiosRequest.put("Sales/EditCustomer", values) : axiosRequest.post("Sales/CreateCustomer", values));

                if (response.status === 200) {
                    if (id) {
                        navigate(`/admin/modules/sales/customer/${id}`);
                    } else {
                        navigate("/admin/modules/sales/customers");
                    }
                } else {
                    console.error("Error creating item");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });

    useEffect(() => {
        if (id) {
            axiosRequest
                .get(`Sales/GetCustomerById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        form.setValues({
                            id,
                            customerFirstName: data.customerFirstName,
                            customerLastName: data.customerLastName,
                            customerPhone: data.customerPhone,
                            customerDisplayName: data.customerDisplayName,
                            companyName: data.companyName,
                            customerAddress: data.customerAddress,
                            customerEmail: data.customerEmail,
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
                    {id ? "Edit Customer" : "New Customer"}
                </Heading>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <form noValidate onSubmit={form.handleSubmit}>
                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>First Name</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="customerFirstName"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.customerFirstName}
                                        onChange={form.handleChange}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Last Name</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="customerLastName"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.customerLastName}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Phone Number</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="customerPhone"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.customerPhone}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
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
                                    <Input
                                        name="companyName"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.companyName}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Email Address</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="customerEmail"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.customerEmail}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.customerDisplayName && !!form.errors.customerDisplayName}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Display Name*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="customerDisplayName"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.customerDisplayName}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.customerDisplayName && !!form.errors.customerDisplayName ? (
                                        <FormErrorMessage>{form.errors.customerDisplayName}</FormErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Home Address</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="customerAddress"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.customerAddress}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
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
                            <Button variant="brand" type="submit" isDisabled={!form.isValid || form.isSubmitting}>
                                Save
                            </Button>
                            <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/sales/customer/${id}` : "/admin/modules/sales/customers"}>
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

export default CustomerFormComponent;
