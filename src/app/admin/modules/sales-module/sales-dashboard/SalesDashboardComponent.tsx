import { Avatar, Box, Flex, FormLabel, Heading, Icon, Select, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Usa from "assets/img/dashboards/usa.png";
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from "react-icons/md";
import CheckTable from "views/admin/rtl/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import tableDataCheck from "views/admin/default/variables/tableDataCheck";
import tableDataComplex from "views/admin/default/variables/tableDataComplex";
import { Fragment, useEffect, useState } from "react";
import axiosRequest from "utils/api";

export default function SalesDashboardComponent() {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [info, setInfo] = useState({
        totalSalesOrderToday: 0,
        totalSalesOrderThisWeek: 0,
        totalSalesOrderThisMonth: 0,
        totalSalesOrderAllTime: 0,
        topSellingItems: [],
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
                    value={info.totalSalesOrderToday >= 0 ? `₦${info.totalSalesOrderToday}` : "--"}
                />
                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="This Week"
                    value={info.totalSalesOrderThisWeek >= 0 ? `₦${info.totalSalesOrderThisWeek}` : "--"}
                />
                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="This Month"
                    value={info.totalSalesOrderThisMonth >= 0 ? `₦${info.totalSalesOrderThisMonth}` : "--"}
                />

                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="All Time"
                    value={info.totalSalesOrderAllTime >= 0 ? `₦${info.totalSalesOrderAllTime}` : "--"}
                />
                {/* <MiniStatistics
                    endContent={
                        <Flex me="-16px" mt="10px">
                            <FormLabel htmlFor="balance">
                                <Avatar src={Usa} />
                            </FormLabel>
                            <Select id="balance" variant="mini" mt="5px" me="0px" defaultValue="usd">
                                <option value="usd">USD</option>
                                <option value="eur">EUR</option>
                                <option value="gba">GBA</option>
                            </Select>
                        </Flex>
                    }
                    name="Your balance"
                    value="$1,000"
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w="56px"
                            h="56px"
                            bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                            icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
                        />
                    }
                    name="New Tasks"
                    value="154"
                />
                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />} />}
                    name="Total Projects"
                    value="2935"
                /> */}
            </SimpleGrid>

            {info.topSellingItems && (
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
                                    value={d.quantity}
                                />
                            );
                        })}
                    </SimpleGrid>
                </Fragment>
            )}

            {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
                <TotalSpent />
                <WeeklyRevenue />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
                <CheckTable tableData={tableDataCheck} />
                <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
                    <DailyTraffic />
                    <PieCard />
                </SimpleGrid>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
                <ComplexTable tableData={tableDataComplex} />
                <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
                    <Tasks />
                    <MiniCalendar h="100%" minW="100%" selectRange={false} />
                </SimpleGrid>
            </SimpleGrid> */}
        </Box>
    );
}
