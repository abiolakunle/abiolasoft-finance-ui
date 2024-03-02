import { Box, Heading, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import axiosRequest from "utils/api";
import { formatNumberWithCommas } from "utils/number";

export default function InventoryDashboardComponent() {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [info, setInfo] = useState({
        totalInventoryCostPrice: 0,
        totalInventorySalesPrice: 0,
        totalInventoryProfit: 0,
    });

    useEffect(() => {
        axiosRequest
            .get("Inventory/GetDashboardInformation")
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
                Inventory Cost
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }} gap="20px" mb="20px">
                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="Current Inventory Cost Price"
                    value={info.totalInventoryCostPrice >= 0 ? `₦${formatNumberWithCommas(info.totalInventoryCostPrice)}` : "--"}
                />

                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="Current Inventory Sales Price"
                    value={info.totalInventorySalesPrice >= 0 ? `₦${formatNumberWithCommas(info.totalInventorySalesPrice)}` : "--"}
                />

                <MiniStatistics
                    startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />}
                    name="Current Inventory Profit"
                    value={info.totalInventoryProfit >= 0 ? `₦${formatNumberWithCommas(info.totalInventoryProfit)}` : "--"}
                />
            </SimpleGrid>
        </Box>
    );
}
