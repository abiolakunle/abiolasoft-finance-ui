import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Card from "components/card/Card";
import { useEffect } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { PhoneIcon } from "@chakra-ui/icons";
import axiosRequest from "utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserFormComponent = () => {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required"),
        phoneNumber: Yup.string(),
    });

    const form = useFormik({
        initialValues: {
            id: "",
            phoneNumber: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await (id ? axiosRequest.put("UserManagement/UpdateUser", values) : axiosRequest.post("UserManagement/CreateUser", values));

                if (response.status === 200) {
                    if (id) {
                        navigate(`/admin/modules/user-management/users/${id}`);
                    } else {
                        navigate("/admin/modules/user-management/users");
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
        if (id) {
            axiosRequest
                .get(`UserManagement/GetUserById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        form.setValues({
                            id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            phoneNumber: data.phoneNumber,
                            email: data.email,
                            password: "",
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
                    {id ? "Edit User" : "New User"}
                </Heading>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <form noValidate onSubmit={form.handleSubmit}>
                        <FormControl isInvalid={form.touched.firstName && !!form.errors.firstName}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">First Name*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="firstName"
                                        id="firstName"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.firstName}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.firstName && !!form.errors.firstName ? <FormErrorMessage>{form.errors.firstName}</FormErrorMessage> : ""}
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl isInvalid={form.touched.lastName && !!form.errors.lastName}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Last Name*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="lastName"
                                        id="lastName"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.lastName}
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.lastName && !!form.errors.lastName ? <FormErrorMessage>{form.errors.lastName}</FormErrorMessage> : ""}
                                </Box>
                            </Flex>
                        </FormControl>

                        {!id && (
                            <FormControl isInvalid={form.touched.email && !!form.errors.email}>
                                <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                    <Box className="afu-label" minWidth="250px">
                                        <FormLabel color="red">Email*</FormLabel>
                                    </Box>
                                    <Box width="100%" className="afu-input">
                                        <Input
                                            width="100%"
                                            type="email"
                                            variant="outline"
                                            borderRadius="8px"
                                            id="email"
                                            name="email"
                                            value={form.values.email}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        />
                                        {form.touched.email && !!form.errors.email ? <FormErrorMessage>{form.errors.email}</FormErrorMessage> : ""}
                                        {!(form.touched.email && !!form.errors.email) && <FormHelperText>Email address should be active and accessible</FormHelperText>}
                                    </Box>
                                </Flex>
                            </FormControl>
                        )}

                        <FormControl isInvalid={form.touched.phoneNumber && !!form.errors.phoneNumber}>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="baseline" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Phone Number</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <PhoneIcon color="gray.300" />
                                        </InputLeftElement>
                                        <Input
                                            width="100%"
                                            type="tel"
                                            variant="outline"
                                            borderRadius="8px"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            value={form.values.phoneNumber}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        />
                                        {form.touched.phoneNumber && !!form.errors.firstName ? <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage> : ""}
                                    </InputGroup>
                                </Box>
                            </Flex>
                        </FormControl>

                        {!id && (
                            <FormControl isInvalid={form.touched.password && !!form.errors.password}>
                                <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="baseline" className="afu-label-input">
                                    <Box className="afu-label" minWidth="250px">
                                        <FormLabel color="red">Password*</FormLabel>
                                    </Box>
                                    <Box width="100%" className="afu-input">
                                        <Input
                                            width="100%"
                                            variant="outline"
                                            borderRadius="8px"
                                            id="password"
                                            name="password"
                                            value={form.values.password}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        />
                                        {form.touched.password && !!form.errors.password ? <FormErrorMessage>{form.errors.password}</FormErrorMessage> : ""}
                                    </Box>
                                </Flex>
                            </FormControl>
                        )}

                        <Flex
                            pt={{ base: "16px", md: "16px", xl: "16px" }}
                            align={{ base: "center", xl: "center" }}
                            justify={{
                                base: "flex-end",
                                xl: "flex-end",
                            }}
                            gap="20px"
                        >
                            <Button variant="brand" type="submit">
                                Save
                            </Button>
                            <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/user-management/users/${id}` : "/admin/modules/user-management/users"}>
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

export default UserFormComponent;
