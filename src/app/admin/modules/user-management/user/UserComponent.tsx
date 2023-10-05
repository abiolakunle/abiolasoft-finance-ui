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
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
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

const UserComponent = () => {
    const { id } = useParams();

    let navigate = useNavigate();

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [user, setUser] = useState({
        id: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        createdAt: "",
        modifiedAt: "",
        roles: [],
    });

    useEffect(() => {
        if (id) {
            axiosRequest
                .get(`UserManagement/GetUserById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setUser({
                            id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            phoneNumber: data.phoneNumber,
                            email: data.email,
                            createdAt: data.createdAt,
                            modifiedAt: data.modifiedAt,
                            roles: data.roles,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);

    const changePassword = () => {
        navigate(`/admin/modules/user-management/user/${id}/change-password`);
    };

    const manageRoles = () => {
        navigate(`/admin/modules/user-management/user/${id}/manage-roles`, { state: { userName: `${user.firstName} ${user.lastName}` } });
    };

    const submit = async () => {
        try {
            await axiosRequest.delete(`UserManagement/DeleteUser`, { data: { id } });
            toast({
                title: "Success",
                description: "Deleted Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            navigate(`/admin/modules/user-management/users`);
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
                <Heading as="h4" size="md">
                    {user.firstName} {user.lastName}
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <UserIsPermitted to="Update User">
                        <ChakraLink as={ReactRouterLink} to={`/admin/modules/user-management/users/${id}/edit`}>
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </UserIsPermitted>
                    <UserIsPermitted to="Manage User Roles">
                        <Button variant="brand" onClick={manageRoles}>
                            Manage Roles
                        </Button>
                    </UserIsPermitted>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={changePassword}>Change Password</MenuItem>

                            <UserIsPermitted to="Delete User">
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </UserIsPermitted>
                        </MenuList>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Delete User</ModalHeader>

                                <ModalBody>Are You Sure You Want To Delete?</ModalBody>
                                <ModalFooter>
                                    <Button variant="ghost" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="red" onClick={submit} ml={3}>
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Menu>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/user-management/users`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>First Name</StatLabel>
                                <StatNumber>{user.firstName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="40%">
                            <Stat>
                                <StatLabel>Last Name</StatLabel>
                                <StatNumber>{user.lastName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Email</StatLabel>
                                <StatNumber>{user.email || "--"}</StatNumber>
                            </Stat>
                        </Box>

                        <Box w="45%">
                            <Stat>
                                <StatLabel>Phone Number</StatLabel>
                                <StatNumber>{user.phoneNumber}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                    <HSeparator mb="16px" />
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Last Modified Date</StatLabel>
                                <StatNumber>{user.modifiedAt ? formatDateTime(user.modifiedAt, true) : "--"}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="40%">
                            <Stat>
                                <StatLabel>Date Created</StatLabel>
                                <StatNumber>{user.createdAt ? formatDateTime(user.createdAt, true) : "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <HSeparator mb="16px" />
                    <Flex mb="16px" direction="column">
                        <Text fontSize="lg" mb="18px">
                            Roles
                        </Text>

                        <Box>
                            {user.roles.map((r, i) => {
                                return (
                                    <Badge mr="8px" key={i} fontSize="sm" mb="8px" display="inline-block" variant="outline" colorScheme="purple">
                                        {r.name}
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

export default UserComponent;
