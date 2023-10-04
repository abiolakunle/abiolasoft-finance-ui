import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "components/card/Card";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import axiosRequest from "utils/api";

const SalesPersonFormComponent = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
    });

    const form = useFormik({
        initialValues: {
            id: "",
            name: "",

            email: "",
            createdAt: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await (id ? axiosRequest.put("Sales/EditSalesperson", values) : axiosRequest.post("Sales/CreateSalesperson", values));

                if (response.status === 200) {
                    if (id) {
                        navigate(`/admin/modules/sales/salespersons/${id}`);
                    } else {
                        navigate("/admin/modules/sales/salespersons");
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

                            name: data.name,
                            createdAt: data.CreatedAt,
                            email: data.email,
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
                    New Item
                </Heading>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <form noValidate onSubmit={form.handleSubmit}>
                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">Name*</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="name"
                                        isRequired={true}
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.name}
                                        onChange={form.handleChange}
                                    />
                                </Box>
                            </Flex>
                        </FormControl>

                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel>Email</FormLabel>
                                </Box>
                                <Box width="100%" className="afu-input">
                                    <Input
                                        name="email"
                                        width="100%"
                                        variant="outline"
                                        borderRadius="8px"
                                        value={form.values.email}
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
                            <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/sales/sales-persons/${id}` : "/admin/modules/sales/sales-persons"}>
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

export default SalesPersonFormComponent;
