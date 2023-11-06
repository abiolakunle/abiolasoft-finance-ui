import { Flex, Checkbox, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { formatDateTime } from "utils/dateUtils";
import { useEffect } from "react";
import GeneralTable from "app-components/general-table/GeneralTable";
import { formatNumberWithCommas } from "utils/number";

type RowObj = {
    date: string;
    number: string;
    vendorName: string;
    orderNumber: string;
    status: number;
    dueDate: string;
    balanceDue: string;
    totalAmount: string;
};

const columnHelper = createColumnHelper<RowObj>();

function BillsTableComponent(props: { tableData: any }) {
    const { tableData } = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const { organizationId } = useParams();

    const columns = [
        columnHelper.accessor("date", {
            id: "date",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    DATE
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Checkbox defaultChecked={info.getValue()[1]} colorScheme="brandScheme" me="10px" />
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        <ChakraLink
                            as={ReactRouterLink}
                            to={`/admin/organizations/${organizationId}/modules/purchases/purchase-orders/${info.row.original.id}`}
                        >
                            {formatDateTime(info.getValue())}
                        </ChakraLink>
                    </Text>
                </Flex>
            ),
        }),
        columnHelper.accessor("number", {
            id: "number",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    BILL#
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),

        columnHelper.accessor("orderNumber", {
            id: "orderNumber",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    REFERENCE#
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),

        columnHelper.accessor("vendorName", {
            id: "vendorName",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    VENDOR NAME
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
        columnHelper.accessor("dueDate", {
            id: "dueDate",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    DUE DATE
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatDateTime(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("totalAmount", {
            id: "totalAmount",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    AMOUNT (₦)
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {formatNumberWithCommas(info.getValue())}
                </Text>
            ),
        }),
        columnHelper.accessor("balanceDue", {
            id: "balanceDue",
            header: () => (
                <Text justifyContent="space-between" align="left" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    BALANCE DUE (₦)
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

export default BillsTableComponent;
