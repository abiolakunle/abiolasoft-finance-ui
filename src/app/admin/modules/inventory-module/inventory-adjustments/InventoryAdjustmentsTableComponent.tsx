import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Card from "components/card/Card";
import { formatDateTime } from "utils/dateUtils";
import { useEffect } from "react";

type RowObj = {
    id: string;
    dateAdjusted: string;
    reason: string;
    description: number;
    status: string;
    type: string;
    createdBy: string;
    createdAt: string;
    modifiedBy: string;
    modifiedAt: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function InventoryAdjustmentsTableComponent(props: { tableData: any }) {
    const { tableData } = props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    const columns = [
        columnHelper.accessor("dateAdjusted", {
            id: "dateAdjusted",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    DATE
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Checkbox defaultChecked={info.getValue()[1]} colorScheme="brandScheme" me="10px" />
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        {info.getValue() ? formatDateTime(info.getValue()) : "--"}
                    </Text>
                </Flex>
            ),
        }),
        columnHelper.accessor("reason", {
            id: "reason",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    REASON
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("description", {
            id: "description",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    DESCRIPTION
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("status", {
            id: "status",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    STATUS
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("type", {
            id: "type",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    TYPE
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("createdBy", {
            id: "createdBy",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    CREATED BY
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
                    CREATED TIME
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue() ? formatDateTime(info.getValue(), true) : "--"}
                </Text>
            ),
        }),

        columnHelper.accessor("modifiedBy", {
            id: "modifiedBy",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    LAST MODIFIED BY
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("modifiedAt", {
            id: "modifiedAt",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    LAST MODIFIED TIME
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue() ? formatDateTime(info.getValue(), true) : "--"}
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
                                                <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/inventory-adjustments/${row.original.id}`}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </ChakraLink>
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
