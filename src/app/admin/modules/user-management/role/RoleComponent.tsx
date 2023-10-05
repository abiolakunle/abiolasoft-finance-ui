import {
    Card,
    Flex,
    Text,
    Box,
    Heading,
    IconButton,
    Button,
    CloseButton,
    Stat,
    StatLabel,
    StatNumber,
    Badge,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
    useDisclosure,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { HSeparator } from "components/separator/Separator";
import { formatDateTime } from "utils/dateUtils";
import axiosRequest from "utils/api";
import UserIsPermitted from "app-components/Permitted/UserIsPermitted";
import { ChevronDownIcon } from "@chakra-ui/icons";

const RoleComponent = () => {
    const { id } = useParams();

    let navigate = useNavigate();

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [role, setUser] = useState({
        id: "",
        name: "",
        createdAt: "",
        modifiedAt: "",
        permissions: [],
    });

    useEffect(() => {
        if (id) {
            axiosRequest
                .get(`UserManagement/GetRoleById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setUser({
                            id,
                            name: data.name,
                            permissions: data.permissions,
                            createdAt: data.createdAt,
                            modifiedAt: data.modifiedAt,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);

    const managePermissions = () => {
        navigate(`/admin/modules/user-management/roles/${id}/manage-permissions`, { state: { roleName: role.name } });
    };

    const submit = async () => {
        try {
            await axiosRequest.delete(`UserManagement/DeleteRole`, { data: { id } });
            toast({
                title: "Success",
                description: "Deleted Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            navigate(`/admin/modules/user-management/roles`);
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
                    base: "space-between",
                    xl: "space-between",
                }}
                gap="20px"
            >
                <Heading as="h4" size="md"></Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <UserIsPermitted to="Update Role Name">
                        <ChakraLink state={{ roleName: role.name }} as={ReactRouterLink} to={`/admin/modules/user-management/roles/${id}/edit`}>
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </UserIsPermitted>

                    <UserIsPermitted to="Manage Role Permissions">
                        <Button variant="brand" onClick={managePermissions}>
                            Manage Permissions
                        </Button>
                    </UserIsPermitted>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <UserIsPermitted to="Delete Role">
                            <MenuList>
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </MenuList>
                        </UserIsPermitted>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Delete Role</ModalHeader>

                                <ModalBody>Are You Sure You Want To Delete?</ModalBody>
                                <ModalFooter>
                                    <Button variant="ghost" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="red" ml={3} onClick={submit}>
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Menu>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/user-management/roles`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Name</StatLabel>
                                <StatNumber>{role.name || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <HSeparator mb="16px" />
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Last Modified Date</StatLabel>
                                <StatNumber>{role.modifiedAt ? formatDateTime(role.modifiedAt, true) : "--"}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="40%">
                            <Stat>
                                <StatLabel>Date Created</StatLabel>
                                <StatNumber>{role.createdAt ? formatDateTime(role.createdAt, true) : "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <HSeparator mb="16px" />
                    <Flex mb="16px" direction="column">
                        <Text fontSize="lg" mb="18px">
                            Permissions
                        </Text>

                        <Box>
                            {role.permissions.map((r, i) => {
                                return (
                                    <Badge mr="8px" key={i} fontSize="sm" mb="8px" display="inline-block" variant="outline" colorScheme="purple">
                                        {r}
                                    </Badge>
                                );
                            })}
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default RoleComponent;
