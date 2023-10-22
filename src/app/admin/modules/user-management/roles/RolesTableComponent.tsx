import { Flex, Checkbox, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { formatDateTime } from "utils/dateUtils";
import GeneralTable from "app-components/general-table/GeneralTable";

type RowObj = {
    name: string;
    createdAt: string;
    modifiedAt: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function UsersTableComponent(props: { tableData: any }) {
    const { tableData } = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const { organizationId } = useParams();

    const columns = [
        columnHelper.accessor("name", {
            id: "name",
            header: () => (
                <Text justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    NAME
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    <Checkbox defaultChecked={info.getValue()[1]} colorScheme="brandScheme" me="10px" />
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/user-management/roles/${info.row.original.id}`}>
                            {info.getValue()}
                        </ChakraLink>
                    </Text>
                </Flex>
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
                    {formatDateTime(info.getValue(), true)}
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

    return (
        <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
            <GeneralTable data={data} columns={columns} />
        </Card>
    );
}
