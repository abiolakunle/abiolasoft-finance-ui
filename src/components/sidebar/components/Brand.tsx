import { Flex, useColorModeValue, Text, Image } from "@chakra-ui/react";
import FinCoreLogo from "assets/img/branding/logo.svg";

import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
    //   Chakra color mode
    let logoColor = useColorModeValue("navy.700", "white");

    return (
        <Flex alignItems="left" flexDirection="column">
            <Flex pl="20px" alignItems="center" flexDirection="row">
                <Image w="40px" h="40px" src={FinCoreLogo} alt="logo" />

                <Text pl="10px" className="logo" my="32px" h="26px" fontSize={"2xl"}>
                    <Text as="span" fontWeight={"extrabold"}>
                        FinCore{"  "}
                    </Text>
                    <Text as="span" color={logoColor}>
                        {/* FINANCE */}
                    </Text>
                </Text>
            </Flex>

            <HSeparator mb="20px" />
        </Flex>
    );
}

export default SidebarBrand;
