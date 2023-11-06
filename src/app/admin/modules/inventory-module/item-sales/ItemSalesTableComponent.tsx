import { Flex, Checkbox, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Card from "components/card/Card";
import { formatDateTime } from "utils/dateUtils";
import { useEffect } from "react";
import { formatNumberWithCommas } from "utils/number";
import GeneralTable from "app-components/general-table/GeneralTable";

type RowObj = {
    quantity: [string, boolean];
    rate: string;
    totalAmount: number;
    orderDate: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ItemSalesTableComponent(props: { tableData: any }) {
    const { tableData } = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const { organizationId } = useParams();

    const columns = [
        columnHelper.accessor("orderDate", {
            id: "orderDate",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    ORDER DATE
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Checkbox defaultChecked={info.getValue()[1]} colorScheme="brandScheme" me="10px" />
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/inventory/items/${info.row.original.id}`}>
                            {formatDateTime(info.getValue())}
                        </ChakraLink>
                    </Text>
                </Flex>
            ),
        }),
        columnHelper.accessor("quantity", {
            id: "quantity",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    QUANTITY
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("rate", {
            id: "rate",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    RATE (₦)
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("totalAmount", {
            id: "totalAmount",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    TOTAL AMOUNT (₦)
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
    ];
    const [data, setData] = React.useState(() => [...tableData]);

    useEffect(() => {
        setData(tableData);
    }, [tableData]);

    return (
        <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
            <GeneralTable data={data} columns={columns} />
        </Card>
    );
}
