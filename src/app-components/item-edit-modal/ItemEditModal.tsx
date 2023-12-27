import { Modal, ModalBody, ModalContent, ModalOverlay, useToast } from "@chakra-ui/react";
import ItemFormComponent from "app/admin/modules/inventory-module/pages/item-form/ItemFormComponent";
import { useNavigate } from "react-router-dom";

const ItemEditModal = ({ itemId, onSave, isOpen, onClose }: { itemId: string; onSave: Function; isOpen: boolean; onClose: any }) => {
    const toast = useToast();
    const navigate = useNavigate();

    const submit = async () => {};

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW="1024px" paddingTop="32px" margin={{ sm: "16px" }}>
                {/* <ModalHeader>Delete </ModalHeader> */}

                <ModalBody>
                    <ItemFormComponent
                        itemId={itemId}
                        isNotRoute={true}
                        onSave={(data: any) => {
                            onClose();
                            data && onSave(data);
                        }}
                    />
                </ModalBody>
                {/* <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={submit} ml={3}>
                        Delete
                    </Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
    );
};

export default ItemEditModal;
