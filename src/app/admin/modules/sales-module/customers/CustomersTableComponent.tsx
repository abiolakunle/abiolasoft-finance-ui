import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";

import Card from "components/card/Card";

import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useEffect } from "react";

type RowObj = {
    customerFirstName: [string, boolean];
    customerLastName: [string, boolean];
    customerPhone: number;
    customerDisplayName: string;
    companyName: string;
    customerEmail: string;
};

const columnHelper = createColumnHelper<RowObj>();

function CustomersTableComponent(props: { tableData: any }) {
    const { tableData } = props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    const columns = [
        columnHelper.accessor("customerDisplayName", {
            id: "customerDisplayName",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    NAME
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Checkbox defaultChecked={info.getValue()[1]} colorScheme="brandScheme" me="10px" />
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/customer/${info.row.original.id}`}>
                            {info.getValue()}
                        </ChakraLink>
                    </Text>
                </Flex>
            ),
        }),

        columnHelper.accessor("companyName", {
            id: "companyName",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    COMPANYS NAME
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),

        columnHelper.accessor("customerEmail", {
            id: "customerEmail",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    EMAIL
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),

        columnHelper.accessor("customerPhone", {
            id: "customerPhone",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    PHONE NUMBER
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
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

export default CustomersTableComponent;
