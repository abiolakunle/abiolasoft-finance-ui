import { CloseButton, Button, Flex, Box, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdEdit } from "react-icons/md";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import IfUserIsPermitted from "app-components/if-user-is-permitted/IfUserIsPermitted";
import DeleteModal from "app-components/delete-modal/DeleteModal";
import { ReceiptFormComponent } from "../receipt-form/ReceiptFormComponent";
import printJs from "print-js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const ReceiptComponent = () => {
    const { id, organizationId } = useParams();

    const redirect = `/admin/organizations/${organizationId}/modules/sales/receipts/`;

    const deleteEndpoint = `Sales/DeleteReceipt`;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handlePrintPDF = () => {
        const input = document.getElementById("receipt-container");

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 15, 40, 180, 180);
            pdf.save("receipt.pdf");
        });
    };

    const handleNormalDownload = () => {
        const input = document.getElementById("receipt-container");
        const htmlContent = input.innerHTML;

        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "receipt.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

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
                flexWrap={{ sm: "wrap", md: "nowrap" }}
            >
                <Heading as="h4" size="md">
                    Receipt
                </Heading>

                <Flex
                    h="fit-content"
                    width={{ sm: "100%", md: "fit-content" }}
                    flexWrap={{ sm: "wrap", md: "nowrap" }}
                    alignItems="center"
                    justifyContent={{ xl: "space-between", sm: "flex-end" }}
                    gap="20px"
                >
                    <IfUserIsPermitted to="Edit Receipt">
                        <ChakraLink order={{ sm: "1" }} as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/sales/receipts/${id}/edit`}>
                            <IconButton variant="outline" colorScheme="brand" borderRadius="10px" aria-label="Edit" fontSize="20px" icon={<MdEdit />} />
                        </ChakraLink>
                    </IfUserIsPermitted>

                    <Flex
                        pt={{ base: "16px", md: "16px", xl: "16px" }}
                        align={{ base: "center", xl: "center" }}
                        justify={{
                            base: "flex-end",
                            xl: "flex-end",
                        }}
                        gap="20px"
                        flexWrap={{ sm: "wrap", md: "nowrap" }}
                    >
                        <Menu>
                            <MenuButton order={{ sm: "2", md: "3" }} width={{ sm: "wrap", xl: "100%" }} as={Button} rightIcon={<ChevronDownIcon />}>
                                Print...
                            </MenuButton>
                            <MenuList>
                                <IfUserIsPermitted to="Delete Receipt">
                                    <MenuItem onClick={handlePrintPDF}>Download as PDF</MenuItem>
                                    <MenuItem onClick={handleNormalDownload}>Print</MenuItem>
                                </IfUserIsPermitted>
                            </MenuList>
                        </Menu>
                        {/* <Button marginBottom="15px" width={{ sm: "100%", md: "fit-content" }} variant="outline">
                            Print
                        </Button> */}
                    </Flex>

                    <Menu>
                        <MenuButton order={{ sm: "2", md: "3" }} width={{ sm: "wrap", xl: "100%" }} as={Button} rightIcon={<ChevronDownIcon />}>
                            More
                        </MenuButton>
                        <MenuList>
                            <IfUserIsPermitted to="Delete Receipt">
                                <MenuItem onClick={onOpen}>Delete</MenuItem>
                            </IfUserIsPermitted>
                        </MenuList>

                        <DeleteModal redirect={redirect} id={id} deleteEndpoint={deleteEndpoint} isOpen={isOpen} onClose={onClose} />
                    </Menu>

                    <ChakraLink order={{ sm: "3", md: "4" }} as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/sales/receipts`}>
                        <CloseButton size="lg" />
                    </ChakraLink>
                </Flex>
            </Flex>
            <ReceiptFormComponent viewOnly={true} />
        </>
    );
};
