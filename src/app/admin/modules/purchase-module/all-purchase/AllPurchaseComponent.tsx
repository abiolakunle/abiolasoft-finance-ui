import React from 'react'
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy, MdOutlineCalendarToday } from "react-icons/md";
import CheckTable from "views/admin/rtl/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import allpurchaselist from "views/admin/default/components/allpurchaselist";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import tableDataCheck from "views/admin/default/variables/tableDataCheck";
import tableDataComplex from "views/admin/default/variables/tableDataComplex";
import { Avatar, Box, Button, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Card from 'components/card/Card';


const AllPurchaseComponent = () => {
  // const { ...rest } = props;

  

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
          <Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' >
		  	    
		      </Card>
                
        </SimpleGrid>
    

    </Box>
  )
} 

export default AllPurchaseComponent
