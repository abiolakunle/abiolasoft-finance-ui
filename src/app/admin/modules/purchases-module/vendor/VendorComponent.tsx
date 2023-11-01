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
    Toast,
    useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { HSeparator } from "components/separator/Separator";
import axiosRequest from "utils/api";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import IfUserIsPermitted from "app-components/if-user-is-permitted/IfUserIsPermitted";
import DeleteModal from "app-components/delete-modal/DeleteModal";

const VendorComponent = () => {
    const { id, organizationId } = useParams();

    const toast = useToast();

    let navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const redirect = `/admin/organizations/${organizationId}/modules/purchases/vendors`;

    const deleteEndpoint = `Purchases/DeleteVendor`;

    const [vendor, setVendor] = useState({
        id: "",
        primaryContactFirstName: "",
        primaryContactLastName: "",
        companyName: "",
        vendorDisplayName: "",
        vendorEmail: "",
        vendorPhone: "",
        vendorAddress: "",
    });

    useEffect(() => {
        if (id) {
            axiosRequest
                .get(`Purchases/GetVendorById?id=${id}`)
                .then((response) => {
                    const data = response?.data?.data;
                    if (!!data) {
                        setVendor({
                            id,
                            primaryContactFirstName: data.primaryContactFirstName,
                            primaryContactLastName: data.primaryContactLastName,
                            companyName: data.companyName,
                            vendorDisplayName: data.vendorDisplayName,
                            vendorEmail: data.vendorEmail,
                            vendorPhone: data.vendorPhone,
                            vendorAddress: data.vendorAddress,
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
                    base: "space-between",
                    xl: "space-between",
                }}
                gap="20px"
            >
                <Heading as="h4" size="md">
                    Vendor
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <IfUserIsPermitted to="Edit Vendor">
                        <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/purchases/vendors/${id}/edit`}>
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Edit" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </IfUserIsPermitted>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <IfUserIsPermitted to="Delete Vendor">
                            <MenuList>
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </MenuList>
                        </IfUserIsPermitted>

                        <DeleteModal redirect={redirect} id={id} deleteEndpoint={deleteEndpoint} isOpen={isOpen} onClose={onClose} />
                    </Menu>

                    <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/purchases/vendors`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <Card p="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex justifyContent="space-between" mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>FIRST NAME</StatLabel>
                                <StatNumber>{vendor.primaryContactFirstName || "--"}</StatNumber>
                            </Stat>
                        </Box>

                        <Box w="45%">
                            <Stat>
                                <StatLabel>LAST NAME</StatLabel>
                                <StatNumber>{vendor.primaryContactLastName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <Flex justifyContent="space-between" mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>DISPLAY NAME</StatLabel>
                                <StatNumber>{vendor.vendorDisplayName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                        <Box w="45%">
                            <Stat>
                                <StatLabel>COMPANY NAME</StatLabel>
                                <StatNumber>{vendor.companyName || "--"}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <HSeparator mb="16px" />
                    <Flex justifyContent="space-between" mb="16px" minH="80px">
                        <Box w="45%">
                            <Stat>
                                <StatLabel>PHONE NUMBER</StatLabel>
                                <StatNumber>{vendor.vendorPhone || "--"}</StatNumber>
                            </Stat>
                        </Box>

                        <Box w="45%">
                            <Stat>
                                <StatLabel>E-MAIL</StatLabel>
                                <StatNumber>{vendor.vendorEmail}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <Flex justifyContent="space-between" mb="16px" minH="80px">
                        <Box w="40%">
                            <Stat>
                                <StatLabel>ADDRESS</StatLabel>
                                <StatNumber>{vendor.vendorAddress}</StatNumber>
                            </Stat>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </>
    );
};

export default VendorComponent;
