import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { To, useNavigate } from "react-router-dom";
import axiosRequest from "utils/api";





    


const DeleteModal = ({redirect, id, deleteEndpoint, isOpen, onClose } : any) => {

    const toast = useToast()
    const navigate = useNavigate()

    

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
        <Modal  isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent width={{sm: "85%"}}>
                <ModalHeader>Delete Sales Order</ModalHeader>

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

