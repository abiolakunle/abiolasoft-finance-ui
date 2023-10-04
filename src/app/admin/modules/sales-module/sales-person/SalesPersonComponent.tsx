import {
    Card,
    Flex,
    Box,
    Heading,
    IconButton,
    CloseButton,
    Stat,
    StatLabel,
    StatNumber,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit, MdSettings } from "react-icons/md";
import { useEffect, useState } from "react";
import { HSeparator } from "components/separator/Separator";
import axiosRequest from "utils/api";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import Permitted from "app-components/Permitted/Permitted";

const SalesPersonComponent = () => {
    const { id } = useParams();

    let navigate = useNavigate();

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [salesPerson, setSalesPerson] = useState({
        id: "",
        name: "",
        email: "",
        createdAt: "",
    });

    useEffect(() => {
        if (id) {
            axiosRequest
                .get(`Sales/GetSalespersonById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setSalesPerson(data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);

    const submit = async () => {
        try {
            await axiosRequest.delete(`Sales/DeleteSalesperson`, { data: { id } });
            toast({
                title: "Success",
                description: "Deleted Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            navigate(`/admin/modules/sales/sales-persons`);
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
                    Sales Person
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <Permitted to="Edit Salesperson">
                        {/* <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/sales-persons/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink> */}

                    </Permitted>
                    

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <Permitted to="Delete Salesperson">
                            <MenuList>
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </MenuList>
                        </Permitted>
                        

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Delete Salesperson</ModalHeader>

                                <ModalBody>Are You Sure You Want To Delete?</ModalBody>
                                <ModalFooter>
                                    <Button variant="ghost" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button onClick={submit} colorScheme="red" ml={3}>
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Menu>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/sales-persons`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Sales Person's Name</StatLabel>
                                <StatNumber>{salesPerson.name || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <HSeparator mb="16px" />
                    <Flex mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>Email Address</StatLabel>
                                <StatNumber>{salesPerson.email || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default SalesPersonComponent;
