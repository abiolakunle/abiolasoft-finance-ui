import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "components/card/Card";
import { useEffect } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import axiosRequest from "utils/api";

const VendorFormComponent = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        vendorDisplayName: Yup.string().required("Display Name is required"),
    });

    const form = useFormik({
        initialValues: {
            id: "",
            primaryContactFirstName: "",
            vendorPhone: 0,
            primaryContactLastName: "",
            vendorDisplayName: "",
            companyName: "",
            vendorEmail: "",
            vendorAddress: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await (id ? axiosRequest.put("Purchases/EditVendor", values) : axiosRequest.post("Purchases/CreateVendor", values));

                if (response.status === 200) {
                    if (id) {
                        navigate(`/admin/modules/purchases/vendors/${id}`);
                    } else {
                        navigate("/admin/modules/purchases/vendors");
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
                .get(`Purchases/GetVendorById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        form.setValues({
                            id,
                            primaryContactFirstName: data.primaryContactFirstName,
                            primaryContactLastName: data.primaryContactLastName,
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
                    {id ? "Edit Vendor" : "New Vendor"}
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
                                        name="primaryContactFirstName"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.primaryContactFirstName}
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
                                        name="primaryContactLastName"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.primaryContactLastName}
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
                                        name="vendorPhone"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.vendorPhone}
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
                                        name="vendorEmail"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.vendorEmail}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.vendorDisplayName && !!form.errors.vendorDisplayName}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Display Name*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="vendorDisplayName"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.vendorDisplayName}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.vendorDisplayName && !!form.errors.vendorDisplayName ? (
                                        <FormErrorMessage>{form.errors.vendorDisplayName}</FormErrorMessage>
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
                                        name="vendorAddress"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.vendorAddress}
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
                            <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/purchases/vendors/${id}` : "/admin/modules/purchases/vendors"}>
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

export default VendorFormComponent;
