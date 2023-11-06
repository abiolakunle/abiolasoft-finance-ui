import { useState } from "react";
import { Badge, Box, Button, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import ItemSalesTableComponent from "./ItemSalesTableComponent";
import { useLocation, useParams } from "react-router-dom";
import axiosRequest from "utils/api";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { formatNumberWithCommas } from "utils/number";

const ItemSalesComponent = () => {
    const [pageData, setPageData] = useState(null);
    const { itemId } = useParams();
    const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(), new Date()]);
    const location = useLocation();

    const loadData = (startDate: Date, endDate: Date) => {
        axiosRequest
            .get(`Sales/GetItemSalesHistory?ItemId=${itemId}&SalesOrderStartDate=${startDate.toISOString()}&SalesOrderEndDate=${endDate.toISOString()}`)
            .then((response) => {
                if (response.data && response.data.data) {
                    setPageData(response.data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <>
            <Flex
                pt={{ base: "130px", md: "80px", xl: "80px" }}
                my="0px"
                h="fit-content"
                align={{ base: "center", xl: "center" }}
                justify={{
                    base: "space-between",
                    xl: "space-between",
                }}
                gap="20px"
            >
                <Flex pr="32px" h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <Heading as="h4" size="md">
                        Sales - {location.state?.itemName}
                    </Heading>
                    {pageData && (
                        <>
                            <Badge ml="1" fontSize="0.9em" colorScheme="green">
                                Quantity sold: &nbsp; {formatNumberWithCommas(pageData.totalQuantity)}
                            </Badge>

                            <Badge ml="1" fontSize="0.9em" colorScheme="green">
                                Amount: &nbsp; {"₦" + formatNumberWithCommas(pageData.totalAmount)}
                            </Badge>
                        </>
                    )}
                </Flex>

                <Flex pr="32px" h="fit-content" alignItems="center" justifyContent="space-between" gap="20px">
                    <RangeDatepicker propsConfigs={{ inputProps: { maxW: "250px" } }} selectedDates={selectedDates} onDateChange={setSelectedDates} />
                    <Button variant="brand" onClick={() => loadData(selectedDates[0], selectedDates[1])}>
                        &nbsp; Filter &nbsp;
                    </Button>
                </Flex>
            </Flex>
            <Box pt={{ base: "16px", md: "16px", xl: "16px" }}>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
                    {pageData && <ItemSalesTableComponent tableData={pageData.lines} />}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default ItemSalesComponent;
