import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Card from "components/card/Card";
import { formatDateTime } from "utils/dateUtils";
import { useEffect } from "react";

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
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ItemsTableComponent(props: { tableData: any }) {
    const { tableData } = props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    const columns = [
        columnHelper.accessor("name", {
            id: "name",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
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
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    STOCK ON HAND
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("sellingPrice", {
            id: "sellingPrice",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    SELLING PRICE
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("costPrice", {
            id: "costPrice",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    COST PRICE
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("totalSalesOrderQuantity", {
            id: "totalSalesOrderQuantity",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    TOTAL SOLD
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("totalPurchaseOrderQuantity", {
            id: "totalPurchaseOrderQuantity",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    TOTAL PURCHASED
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("createdAt", {
            id: "createdAt",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
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
                <Table variant="simple" color="gray.500" mb="24px" mt="12px">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            pe="10px"
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
