import { Flex, Checkbox, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { formatDateTime } from "utils/dateUtils";
import { useEffect } from "react";
import GeneralTable from "app-components/general-table/GeneralTable";

type RowObj = {
    date: string;
    number: string;
    customerName: string;
    referenceNumber: string;
    status: number;
};

const columnHelper = createColumnHelper<RowObj>();

function CreditNotesTableComponent(props: { tableData: any }) {
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
                        <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/sales/credit-notes/${info.row.original.id}`}>
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
                    CREDIT NOTE #
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),

        columnHelper.accessor("referenceNumber", {
            id: "customerName",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    CUSTOMER NAME
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            ),
        }),

        columnHelper.accessor("customerName", {
            id: "customerName",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    CUSTOMER NAME
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

export default CreditNotesTableComponent;