import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Card from "components/card/Card";
import { formatNumberWithCommas } from "utils/number";

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
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    let defaultData = tableData;
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

    const [data, _setData] = React.useState(() => [...defaultData]);
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });
    return (
        <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
            {/* <Flex
                px="25px"
                mb="8px"
                justifyContent="space-between"
                align="center"
            >
                <Text
                    color={textColor}
                    fontSize="22px"
                    fontWeight="700"
                    lineHeight="100%"
                >
                    Check Table
                </Text>
                <Menu />
            </Flex> */}
            <Box>
                <Table variant="simple" color="gray.500" mb="24px">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            pe="10px"
                                            pl="0px"
                                            borderColor={borderColor}
                                            cursor="pointer"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <Flex
                                                justifyContent="space-between"
                                                align="center"
                                                fontSize={{
                                                    sm: "10px",
                                                    lg: "12px",
                                                }}
                                                color="gray.400"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{
                                                    asc: "",
                                                    desc: "",
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </Flex>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td
                                                key={cell.id}
                                                pl="0px"
                                                fontSize={{ sm: "14px" }}
                                                minW={{
                                                    sm: "150px",
                                                    md: "200px",
                                                    lg: "auto",
                                                }}
                                                borderColor="transparent"
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Box>
        </Card>
    );
}
