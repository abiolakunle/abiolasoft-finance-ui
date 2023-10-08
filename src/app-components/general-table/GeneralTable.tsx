import { Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import React from "react";
import "./GeneralTable.css";

const GeneralTable = ({ data, columns, classes, meta, variant }: any) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    const table = useReactTable({
        data,
        columns,
        meta,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });
    return (
        <Table className={classes} variant={variant || "simple"} color="gray.500" mb="24px">
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
    );
};

export default GeneralTable;
