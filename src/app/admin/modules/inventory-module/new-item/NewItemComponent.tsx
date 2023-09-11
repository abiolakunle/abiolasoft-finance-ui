import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const NewItemComponent = () => {
    return (
        <>
            <Heading as="h4" size="md">
                New Item
            </Heading>
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>New Item</Box>;
        </>
    );
};

export default NewItemComponent;
