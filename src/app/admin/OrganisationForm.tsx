import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "components/card/Card";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import axiosRequest from "utils/api";

const OrganizationForm = () => {

    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
    });

    const form = useFormik({
        initialValues: {
            
            name: ""

            
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axiosRequest.post("UserManagement/CreateOrganization", values)

                if (response.status === 200) {
                    
                    navigate(`/admin/organizations`);
                    
                } else {
                    console.error("Error creating item");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });


    return (
        <Box marginLeft="auto" marginRight="auto" maxW="768px" pt={{ base: "130px", sm: "32px", md: "80px", xl: "80px" }}>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                mb={{ sm: "8px", md: "16px" }}
                mt={{ sm: "32px", md: "32px" }}
                ml={{ sm: "16px", md: "16px" }}
                mr={{ sm: "16px", md: "16px" }}
            >
                <Heading as="h4" size="md">
                    New Organization
                </Heading>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <form noValidate onSubmit={form.handleSubmit}>
                        <FormControl>
                            <Flex mb="16px" justifyContent="flex-start" width="100%" gap="20px" alignItems="center" className="afu-label-input">
                                <Box className="afu-label" minWidth="250px">
                                    <FormLabel color="red">New Organization Name*</FormLabel>
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
                            <ChakraLink
                                as={ReactRouterLink}
                                to={ `/admin/organizations`}
                            >
                                <Button variant="outline">Cancel</Button>
                            </ChakraLink>
                        </Flex>
                    </form>
                </Card>
            </Box>
            ;
        </Box>
    );
}

export default OrganizationForm
