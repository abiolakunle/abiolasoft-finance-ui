import { CloseButton, Button, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit, MdSettings } from "react-icons/md";
import InvoiceFormComponent from "../invoice-form/InvoiceFormComponent";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"

const InvoiceComponent = () => {
    const { id } = useParams();

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex
                pt={{ base: "130px", md: "80px", xl: "130px" }}
                my="0px"
                h="fit-content"
                mb="-130px"
                align={{ base: "center", xl: "center" }}
                justify={{
                    base: "space-between",
                    xl: "space-between",
                }}
                gap="20px"
            >
                <Heading as="h4" size="md">
                    Invoice
                </Heading>

                <Flex h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/invoices/${id}/edit`}>
                        <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Call Fred" fontSize="20px" icon={<MdEdit />} />
                    </ChakraLink>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onOpen}>Delete</MenuItem>
                        </MenuList>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Delete Invoice</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    Are You Sure You Want To Delete?
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="ghost" onClick={onClose}>
                                    Cancel
                                    </Button>
                                    <Button colorScheme="brand" mr={3}>Delete</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                    </Menu>

                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/invoices`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <InvoiceFormComponent viewOnly={true} />
        </>
    );
};

export default InvoiceComponent;
