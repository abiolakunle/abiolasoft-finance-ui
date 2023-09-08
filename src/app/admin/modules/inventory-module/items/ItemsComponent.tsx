import { Box, SimpleGrid } from "@chakra-ui/react";
import tableDataCheck from "views/admin/default/variables/tableDataCheck";
import ItemsTableComponent from "./ItemsTableComponent";

const ItemsComponent = () => {
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                columns={{ base: 1, md: 1, xl: 1 }}
                gap="20px"
                mb="20px"
            >
                <ItemsTableComponent tableData={tableDataCheck} />
            </SimpleGrid>
        </Box>
    );
};

export default ItemsComponent;
