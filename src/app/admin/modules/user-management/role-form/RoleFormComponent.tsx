import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import { apiBaseUrl } from "environment";
import { useEffect, useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation, useNavigate, useParams } from "react-router-dom";

const RoleFormComponent = () => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
    });

    const { id } = useParams();
    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (id) {
            setFormData({
                id,
                name: location.state?.roleName,
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
            const response = await (id ? axios.put(apiBaseUrl + "UserManagement/UpdateRoleName", formData) : axios.post(apiBaseUrl + "UserManagement/CreateRole", formData));

            if (response.status === 200) {
                if (id) {
                    navigate(`/admin/modules/user-management/roles/${id}`);
                } else {
                    navigate("/admin/modules/user-management/roles");
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
                    {id ? "Edit Role Name" : "New Role"}
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
                        <ChakraLink as={ReactRouterLink} to={id ? `/admin/modules/user-management/roles/${id}` : "/admin/modules/user-management/roles"}>
                            <Button variant="outline">Cancel</Button>
                        </ChakraLink>
                    </Flex>
                </Card>
            </Box>
            ;
        </>
    );
};

export default RoleFormComponent;
