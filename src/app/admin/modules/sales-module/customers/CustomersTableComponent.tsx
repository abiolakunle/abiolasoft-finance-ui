import { Flex, Checkbox, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import Card from "components/card/Card";
import { createColumnHelper } from "@tanstack/react-table";

import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useEffect } from "react";
import GeneralTable from "app-components/general-table/GeneralTable";

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
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const { organizationId } = useParams();

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
                        <ChakraLink as={ReactRouterLink} to={`/admin/organizations/${organizationId}/modules/sales/customer/${info.row.original.id}`}>
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

    return (
        <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
            <GeneralTable data={data} columns={columns} />
        </Card>
    );
}

export default CustomersTableComponent;
