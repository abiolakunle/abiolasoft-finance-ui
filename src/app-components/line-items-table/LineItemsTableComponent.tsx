import { Flex, Box, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Select, Input, Icon, Button, IconButton } from "@chakra-ui/react";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import Card from "components/card/Card";
import { useEffect, useState } from "react";
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { formatNumberWithCommas } from "utils/number";
import "./LineItemsTableComponent.css";

export const defaultItem = {
    itemId: "",
    itemName: "",
    description: "",
    quantity: 1,
    rate: 0,
    tax: 0,
};

type RowObj = {
    itemId: string;
    quantity: string;
    tax: string;
    rate: number;
    amount: string;
    delete: string;
};

const columnHelper = createColumnHelper<RowObj>();

export const TableCellInput = ({ getValue, row, column, table, maxW, currency }: any) => {
    const initialValue = getValue();
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
        tableMeta?.updateData(row.index, column.id, value);
    };

    return (
        <Flex align="center" maxW={maxW}>
            <NumericFormat
                customInput={Input}
                allowLeadingZeros={false}
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale
                borderRadius="8px"
                prefix={currency}
                name={column.id}
                variant="outline"
                value={value}
                onBlur={onBlur}
                onValueChange={(e) => setValue(e.value)}
            />
        </Flex>
    );
};

export const TableCellSelect = ({ getValue, row, column, table, options }: any) => {
    const initialValue = getValue();
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onSelect = (value: any) => {
        tableMeta?.updateData(row.index, column.id, value);
        setValue(value);
    };

    return (
        <Flex align="center">
            <Select name="itemId" placeholder="Select an item" required={true} value={value} onChange={(e) => onSelect(e.target.value)}>
                {options.map((option: any, index: number) => (
                    <option key={index} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </Select>
        </Flex>
    );
};

export default function LineItemsTableComponent(props: {
    tableLines: any;
    viewOnly: boolean;
    items: any[];
    onTableLineUpdate: Function;
    onTableLineAdded: Function;
    onTableLineRemoved: Function;
}) {
    const { tableLines, items, onTableLineUpdate, viewOnly, onTableLineAdded, onTableLineRemoved } = props;
    const [sorting, setSorting] = useState<SortingState>([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    const [data, setData] = useState(() => [...tableLines]);

    const addRow = () => {
        const setFunc = (old: any[]) => [...old, { ...defaultItem }];
        onTableLineAdded();
        setData(setFunc);
    };

    useEffect(() => {
        setData([...tableLines]);
    }, [tableLines]);

    const columns = [
        columnHelper.accessor("itemId", {
            id: "itemId",
            header: () => (
                <Text justifyContent="space-between" align="left" minW={{ md: "400px" }} fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    ITEM DETAILS
                </Text>
            ),
            cell: (info: any) => (
                <Flex
                    width="100%"
                    gap={{ sm: "10px", md: "0px" }}
                    alignItems="center"
                    flexWrap={{ sm: "wrap", md: "nowrap" }}
                    pl={{ sm: "8px", md: "0px" }}
                    justifyContent={{ sm: "start", md: "center" }}
                >
                    <Text display={{ sm: "block", md: "none" }} fontSize="16px" textTransform="capitalize" minW="100px">
                        Item Name
                    </Text>
                    <Box textAlign={{ sm: "right", md: "left" }} width="100%">
                        <TableCellSelect options={items} {...info} />
                    </Box>
                </Flex>
            ),
        }),
        columnHelper.accessor("quantity", {
            id: "quantity",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    QUANTITY
                </Text>
            ),
            cell: (info: any) => (
                <Flex
                    width="100%"
                    gap={{ sm: "10px", md: "0px" }}
                    alignItems="center"
                    flexWrap={{ sm: "nowrap", md: "nowrap" }}
                    pl={{ sm: "8px", md: "0px" }}
                    justifyContent={{ sm: "start", md: "center" }}
                >
                    <Text display={{ sm: "block", md: "none" }} fontSize="16px" textTransform="capitalize" minW="100px">
                        {info.column.id}
                    </Text>
                    <Box textAlign={{ sm: "right", md: "left" }} width="100%">
                        <TableCellInput type="number" name="quantity" maxW={{ sm: "100%", md: "100px" }} {...info} />
                    </Box>
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
                <Flex
                    width="100%"
                    gap={{ sm: "10px", md: "0px" }}
                    alignItems="center"
                    flexWrap={{ sm: "nowrap", md: "nowrap" }}
                    pl={{ sm: "8px", md: "0px" }}
                    justifyContent={{ sm: "start", md: "center" }}
                >
                    <Text display={{ sm: "block", md: "none" }} fontSize="16px" textTransform="capitalize" minW="100px">
                        {info.column.id}
                    </Text>
                    <Box textAlign={{ sm: "right", md: "left" }} width="100%">
                        <TableCellInput type="number" maxW={{ md: "180px" }} width={{ sm: "100%", md: "fit-content" }} name="rate" currency="₦" {...info} />
                    </Box>
                </Flex>
            ),
        }),
        // columnHelper.ac)cessor("tax", {
        //     id: "tax",
        //     header: () => (
        //         <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
        //             TAX
        //         </Text>
        //     ),
        //     cell: (info: any) => (
        //         <Flex align="center">
        //             <Input type="number" name="tax" isRequired={true} variant="outline" borderRadius="8px" value={info.getValue()} onChange={(e) => inputChanged(e, info.row.id)} />
        //         </Flex>
        //     ),
        // }),
        columnHelper.accessor("amount", {
            id: "amount",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    AMOUNT (₦)
                </Text>
            ),
            cell: (info) => (
                <Flex
                    width="100%"
                    gap={{ sm: "10px", md: "0px" }}
                    alignItems="center"
                    flexWrap={{ sm: "nowrap", md: "nowrap" }}
                    pl={{ sm: "8px", md: "0px" }}
                    justifyContent={{ sm: info.column.id === "amount" ? "space-between" : "start", md: "center" }}
                >
                    <Text display={{ sm: "block", md: "none" }} fontSize="16px" textTransform="capitalize" minW="100px">
                        {info.column.id}
                    </Text>
                    <Box textAlign={{ sm: "right", md: "left" }} width="100%">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                            {formatNumberWithCommas(+info.row.original.quantity * +info.row.original.rate)}
                        </Text>
                    </Box>
                </Flex>
            ),
        }),
        !viewOnly &&
            columnHelper.accessor("delete", {
                id: "delete",
                header: () => <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400"></Text>,
                cell: (info: any) => {
                    return (
                        <Flex
                            width="100%"
                            gap={{ sm: "10px", md: "0px" }}
                            alignItems="center"
                            flexWrap={{ sm: "nowrap", md: "nowrap" }}
                            pl={{ sm: "8px", md: "0px" }}
                            justifyContent={{ sm: "start", md: "center" }}
                        >
                            <Text display={{ sm: "block", md: "none" }} fontSize="16px" textTransform="capitalize" minW="100px">
                                {info.column.id}
                            </Text>
                            <Box textAlign={{ sm: "right", md: "left" }} width="100%">
                                <IconButton
                                    isDisabled={info.row.id === "0" && data.length === 1}
                                    onClick={() => {
                                        info.table.options.meta?.removeRow(info.row.index);
                                    }}
                                    size="sm"
                                    isRound={true}
                                    variant="outline"
                                    colorScheme="red"
                                    aria-label="Remove"
                                    fontSize="20px"
                                    icon={<MdOutlineDeleteOutline />}
                                />
                            </Box>
                        </Flex>
                    );
                },
            }),
    ].filter((v) => v);

    const meta = {
        updateData: (rowIndex: number, columnId: string, value: string) => {
            setData((old) => {
                return old.map((row, index) => {
                    if (index === rowIndex) {
                        onTableLineUpdate({ name: columnId, value }, rowIndex);

                        const rowUpdate = {
                            ...old[rowIndex],
                            [columnId]: value,
                        };

                        setItemPriceOnRow(columnId, rowUpdate, value, rowIndex);

                        return rowUpdate;
                    }
                    return row;
                });
            });
        },
        removeRow: (rowIndex: number) => {
            const setFilterFunc = (old: any[]) => old.filter((_row: any, index: number) => index !== rowIndex);
            setData(setFilterFunc);
            onTableLineRemoved(rowIndex);
        },
    };

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        meta,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });
    return (
        <Card pointerEvents={viewOnly ? "none" : "all"} flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Box>
                <Table className="responsiveTable" variant="striped" color="gray.500" mb="24px">
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
                                                align="left"
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
                                <Tr pl={{ sm: "0px", md: "16px" }} key={row.id} borderTop={{ sm: "2px solid grey", md: "none" }}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td
                                                key={cell.id}
                                                fontSize={{ sm: "14px" }}
                                                minW={{
                                                    sm: "100%",
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
            <Flex>
                {!viewOnly && (
                    <Button onClick={addRow} leftIcon={<Icon as={MdAdd} width="20px" height="20px" color="inherit" />}>
                        Add Another line
                    </Button>
                )}
            </Flex>
        </Card>
    );

    function setItemPriceOnRow(columnId: string, rowUpdate: any, value: string, rowIndex: number) {
        if (columnId === "itemId") {
            rowUpdate.rate = items.find((i) => i.id === value).price;
            onTableLineUpdate({ name: "rate", value: rowUpdate.rate }, rowIndex);
        }
    }
}
