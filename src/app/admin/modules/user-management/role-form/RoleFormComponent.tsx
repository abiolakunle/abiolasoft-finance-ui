import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import Card from "components/card/Card";
import { useEffect } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axiosRequest from "utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";

const RoleFormComponent = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Role name is required"),
    });

    const { id, organizationId } = useParams();

    const form = useFormik({
        initialValues: {
            id: "",
            name: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (formData) => {
            try {
                const response = await (id
                    ? axiosRequest.put("UserManagement/UpdateRoleName", formData)
                    : axiosRequest.post("UserManagement/CreateRole", formData));

                if (response.status === 200) {
                    if (id) {
                        navigate(`/admin/organizations/${organizationId}/modules/user-management/roles/${id}`);
                    } else {
                        navigate(`/admin/organizations/${organizationId}/modules/user-management/roles`);
                    }
                } else {
                    console.error("Error creating item");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });
    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (id) {
            form.setValues({
                id,
                name: location.state?.roleName,
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
                    {id ? "Edit Role Name" : "New Role"}
                </Heading>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <form noValidate onSubmit={form.handleSubmit}>
                        <FormControl isInvalid={form.touched.name && !!form.errors.name}>
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
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.name && !!form.errors.name ? <FormErrorMessage>{form.errors.name}</FormErrorMessage> : ""}
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
                            <Button isDisabled={!form.isValid || form.isSubmitting} variant="brand" type="submit">
                                Save
                            </Button>
                            <ChakraLink
                                as={ReactRouterLink}
                                to={
                                    id
                                        ? `/admin/organizations/${organizationId}/modules/user-management/roles/${id}`
                                        : `/admin/organizations/${organizationId}/modules/user-management/roles`
                                }
                            >
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

export default RoleFormComponent;
