// Chakra imports
import { Flex, useColorModeValue, Text } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
    //   Chakra color mode
    let logoColor = useColorModeValue("navy.700", "white");

    return (
        <Flex alignItems="center" flexDirection="column">
            {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
            <Text className="logo" my="32px" h="26px" fontSize={"2xl"}>
                <Text as="span" fontWeight={"extrabold"}>
                    ABIOLASOFT{"  "}
                </Text>
                <Text as="span" color={logoColor}>
                    FINANCE
                </Text>
            </Text>

            <HSeparator mb="20px" />
        </Flex>
    );
}

export default SidebarBrand;
