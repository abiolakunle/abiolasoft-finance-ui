import { Flex, Text, useColorModeValue, Select, Input } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import GeneralTable from "app-components/general-table/GeneralTable";

type RowObj = {
    itemId: string;
    quantity: string;
    tax: string;
    rate: number;
    amount: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function NewInvoiceFormTableComponent(props: { tableData: any; items: any[] }) {
    const { tableData, items } = props;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [data, setData] = React.useState(() => [...tableData]);

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
                    <Input
                        type="number"
                        name="tax"
                        isRequired={true}
                        variant="outline"
                        borderRadius="8px"
                        value={info.getValue()}
                        onChange={(e) => inputChanged(e, info.row.id)}
                    />
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

    return <GeneralTable data={data} columns={columns} />;
}
