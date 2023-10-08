import { Flex, Checkbox, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import { formatDateTime } from "utils/dateUtils";
import { useEffect } from "react";
import { formatNumberWithCommas } from "utils/number";
import GeneralTable from "app-components/general-table/GeneralTable";

type RowObj = {
    name: [string, boolean];
    sku: string;
    stockOnHand: number;
    reorderPoint: string;
    createdAt: string;
    costPrice: string;
    sellingPrice: string;
    totalSalesOrderQuantity: string;
    totalPurchaseOrderQuantity: string;
    openingStock: string;
    quantityAdjusted: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ItemsTableComponent(props: { tableData: any }) {
    const { tableData } = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const columns = [
        columnHelper.accessor("name", {
            id: "name",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    NAME
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Checkbox defaultChecked={info.getValue()[1]} colorScheme="brandScheme" me="10px" />
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/items/${info.row.original.id}`}>
                            {info.getValue()}
                        </ChakraLink>
                    </Text>
                </Flex>
            ),
        }),
        columnHelper.accessor("stockOnHand", {
            id: "stockOnHand",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    STOCK ON HAND
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("sellingPrice", {
            id: "sellingPrice",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    SELLING PRICE (₦)
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("costPrice", {
            id: "costPrice",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    COST PRICE (₦)
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("totalSalesOrderQuantity", {
            id: "totalSalesOrderQuantity",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    TOTAL SOLD
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("totalPurchaseOrderQuantity", {
            id: "totalPurchaseOrderQuantity",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    TOTAL PURCHASED
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("quantityAdjusted", {
            id: "quantityAdjusted",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    QUANTITY ADJUSTED
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("openingStock", {
            id: "openingStock",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    OPENING STOCK
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("createdAt", {
            id: "createdAt",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    DATE CREATED
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatDateTime(info.getValue(), true)}
                </Text>
            ),
        }),
    ];
    const [data, setData] = React.useState(() => [...tableData]);

    useEffect(() => {
        setData(tableData);
    }, [tableData]);

    return <GeneralTable data={data} columns={columns} />;
}
