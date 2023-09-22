import { Flex, Box, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Select, Input } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";

import Card from "components/card/Card";

type RowObj = {
    itemId: string;
    quantity: string;
    tax: string;
    rate: number;
    amount: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function InvoiceFormItemsTableComponent(props: { tableData: any; items: any[] }) {
    const { tableData, items } = props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    let defaultData = tableData;

    const [data, setData] = React.useState(() => [...defaultData]);

    const inputChanged = (e: any, i: number) => {};

    const columns = [
        columnHelper.accessor("itemId", {
            id: "itemId",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    ITEM DETAILS
                </Text>
            ),
            cell: (info: any) => {
                return (
                    <Flex align="center">
                        <Select name="itemId" placeholder="Select an item" value={info.getValue()} onChange={(e) => inputChanged(e, info.row.id)}>
                            {items.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                );
            },
        }),
        columnHelper.accessor("quantity", {
            id: "quantity",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    QUANTITY
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Input
                        type="number"
                        name="quantity"
                        isRequired={true}
                        variant="outline"
                        borderRadius="8px"
                        value={info.getValue()}
                        onChange={(e) => inputChanged(e, info.row.id)}
                    />
                </Flex>
            ),
        }),

        columnHelper.accessor("rate", {
            id: "rate",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    RATE
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Input
                        type="number"
                        name="rate"
                        isRequired={true}
                        variant="outline"
                        borderRadius="8px"
                        value={info.getValue()}
                        onChange={(e) => inputChanged(e, info.row.id)}
                    />
                </Flex>
            ),
        }),
        columnHelper.accessor("tax", {
            id: "tax",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    TAX
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Input type="number" name="tax" isRequired={true} variant="outline" borderRadius="8px" value={info.getValue()} onChange={(e) => inputChanged(e, info.row.id)} />
                </Flex>
            ),
        }),
        columnHelper.accessor("amount", {
            id: "amount",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    AMOUNT
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),
    ];

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
