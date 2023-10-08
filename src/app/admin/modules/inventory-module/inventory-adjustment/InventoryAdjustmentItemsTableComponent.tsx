import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import { formatNumberWithCommas } from "utils/number";
import GeneralTable from "app-components/general-table/GeneralTable";

type RowObj = {
    name: string;
    quantityAdjusted: string;
    adjustedValue: number;
    costPrice: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function InventoryAdjustmentItemsTableComponent(props: { tableData: any; adjustmentType: "Quantity" | "Value" }) {
    const { tableData, adjustmentType } = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const columns = [
        columnHelper.accessor("name", {
            id: "name",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    Item Details
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/items/${info.row.original.id}`}>
                            {info.getValue()}
                        </ChakraLink>
                    </Text>
                </Flex>
            ),
        }),
        adjustmentType === "Quantity" &&
            columnHelper.accessor("quantityAdjusted", {
                id: "quantityAdjusted",
                header: () => (
                    <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                        Quantity Adjusted
                    </Text>
                ),
                cell: (info) => (
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        {info.getValue()}
                    </Text>
                ),
            }),

        adjustmentType === "Value" &&
            columnHelper.accessor("adjustedValue", {
                id: "adjustedValue",
                header: () => (
                    <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                        Value Adjusted
                    </Text>
                ),
                cell: (info) => (
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        ₦{formatNumberWithCommas(info.getValue())}
                    </Text>
                ),
            }),
        adjustmentType === "Quantity" &&
            columnHelper.accessor("costPrice", {
                id: "adjustedValue",
                header: () => (
                    <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                        Cost Price
                    </Text>
                ),
                cell: (info) => (
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        {info.getValue()}
                    </Text>
                ),
            }),
    ].filter((i) => i);

    const [data, _setData] = React.useState(() => [...tableData]);

    return <GeneralTable data={data} columns={columns} />;
}
