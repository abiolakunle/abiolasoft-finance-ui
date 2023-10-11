import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axiosRequest from "utils/api";

const DeleteModal = ({ redirect, id, deleteEndpoint, isOpen, onClose }: any) => {
    const toast = useToast();
    const navigate = useNavigate();

    const submit = async () => {
        try {
            await axiosRequest.delete(deleteEndpoint, { data: { id } });
            toast({
                title: "Success",
                description: "Deleted Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            navigate(redirect);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent margin={{ sm: "16px" }}>
                <ModalHeader>Delete </ModalHeader>

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
    );
};

export default DeleteModal;
