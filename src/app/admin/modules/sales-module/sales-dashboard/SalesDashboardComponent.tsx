import { Box, Heading, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { MdAttachMoney, MdFileCopy } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";
import axiosRequest from "utils/api";
import { formatNumberWithCommas } from "utils/number";

export default function SalesDashboardComponent() {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [info, setInfo] = useState({
        totalSalesOrderToday: 0,
        totalSalesOrderThisWeek: 0,
        totalSalesOrderThisMonth: 0,
        totalSalesOrderAllTime: 0,
        topSellingItems: [],
        totalProfit: 0,
    });

    useEffect(() => {
        axiosRequest
            .get("Sales/GetDashboardInformation")
            .then((response) => {
                const data = response?.data?.data;
                setInfo(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Heading as="h4" size="md" mt="32px" mb="16px">
                Total Sales Orders
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap="20px" mb="20px">
                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="Today"
                    value={info.totalSalesOrderToday >= 0 ? `₦${formatNumberWithCommas(info.totalSalesOrderToday)}` : "--"}
                />
                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="This Week"
                    value={info.totalSalesOrderThisWeek >= 0 ? `₦${formatNumberWithCommas(info.totalSalesOrderThisWeek)}` : "--"}
                />
                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="This Month"
                    value={info.totalSalesOrderThisMonth >= 0 ? `₦${formatNumberWithCommas(info.totalSalesOrderThisMonth)}` : "--"}
                />

                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="All Time"
                    value={info.totalSalesOrderAllTime >= 0 ? `₦${formatNumberWithCommas(info.totalSalesOrderAllTime)}` : "--"}
                />
            </SimpleGrid>

            {info.topSellingItems?.length ? (
                <Fragment>
                    <Heading as="h4" size="md" mt="32px" mb="16px">
                        Top Selling Items
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap="20px" mb="20px">
                        {info.topSellingItems?.map((d, idx) => {
                            return (
                                <MiniStatistics
                                    key={idx}
                                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />} />}
                                    name={d.name}
                                    value={`${formatNumberWithCommas(d.quantity)}`}
                                />
                            );
                        })}
                    </SimpleGrid>
                </Fragment>
            ) : (
                ""
            )}

            <Heading as="h4" size="md" mt="32px" mb="16px">
                Profit
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap="20px" mb="20px">
                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="All Time Profit"
                    value={info.totalProfit >= 0 ? `₦${formatNumberWithCommas(info.totalProfit)}` : "--"}
                />
            </SimpleGrid>
        </Box>
    );
}
