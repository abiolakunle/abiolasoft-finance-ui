import { Flex, Checkbox, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDateTime } from "utils/dateUtils";
import { useEffect } from "react";
import GeneralTable from "app-components/general-table/GeneralTable";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import Card from "components/card/Card";

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
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const columns = [
        columnHelper.accessor("dateAdjusted", {
            id: "dateAdjusted",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    DATE
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center" minW="100px">
                    <Checkbox defaultChecked={info.getValue()[1]} colorScheme="brandScheme" me="10px" />
                    <ChakraLink as={ReactRouterLink} to={`/admin/modules/inventory/inventory-adjustments/${info.row.original.id}`}>
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                            {info.getValue() ? formatDateTime(info.getValue()) : "--"}
                        </Text>
                    </ChakraLink>
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
                <Text color={textColor} maxW="200px" fontSize="sm" fontWeight="700">
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
                <Text color={textColor} fontSize="sm" maxW="400px" fontWeight="700">
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

    return (
        <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
            <GeneralTable data={data} columns={columns} />
        </Card>
    );
}
