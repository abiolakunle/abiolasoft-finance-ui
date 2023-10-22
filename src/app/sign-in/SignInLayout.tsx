import { useState } from "react";
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import Footer from "components/footer/FooterAuth";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import { NavLink } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import illustration from "assets/img/auth/auth.svg";
import { SidebarContext } from "contexts/SidebarContext";
import SignIn from "./SignIn";

export default function Auth() {
    // states and functions
    const [toggleSidebar, setToggleSidebar] = useState(false);

    const authBg = useColorModeValue("white", "navy.900");
    document.documentElement.dir = "ltr";
    return (
        <Box>
            <SidebarContext.Provider
                value={{
                    toggleSidebar,
                    setToggleSidebar,
                }}
            >
                <Box
                    bg={authBg}
                    float="right"
                    minHeight="100vh"
                    height="100%"
                    position="relative"
                    w="100%"
                    transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                    transitionDuration=".2s, .2s, .35s"
                    transitionProperty="top, bottom, width"
                    transitionTimingFunction="linear, linear, ease"
                >
                    <Box mx="auto" minH="100vh">
                        <Flex position="relative" h="max-content">
                            <Flex
                                h={{
                                    sm: "initial",
                                    md: "unset",
                                    lg: "100vh",
                                    xl: "97vh",
                                }}
                                w="100%"
                                maxW={{ md: "66%", lg: "1313px" }}
                                mx="auto"
                                pt={{ sm: "50px", md: "0px" }}
                                px={{ lg: "30px", xl: "0px" }}
                                ps={{ xl: "70px" }}
                                justifyContent="start"
                                direction="column"
                            >
                                <NavLink
                                    to="/admin"
                                    style={() => ({
                                        width: "fit-content",
                                        marginTop: "40px",
                                    })}
                                >
                                    <Flex align="center" ps={{ base: "25px", lg: "0px" }} pt={{ lg: "0px", xl: "0px" }} w="fit-content">
                                        <Icon as={FaChevronLeft} me="12px" h="13px" w="8px" color="secondaryGray.600" />
                                        <Text ms="0px" fontSize="sm" color="secondaryGray.600">
                                            Back to AbiolaSoft
                                        </Text>
                                    </Flex>
                                </NavLink>
                                <SignIn />
                                <Box display={{ base: "none", md: "block" }} h="100%" minH="100vh" w={{ lg: "50vw", "2xl": "44vw" }} position="absolute" right="0px">
                                    <Flex
                                        bg={`url(${illustration})`}
                                        justify="center"
                                        align="end"
                                        w="100%"
                                        h="100%"
                                        bgSize="contain"
                                        bgRepeat="no-repeat"
                                        bgPosition="50%"
                                        position="absolute"
                                        borderBottomLeftRadius={{
                                            lg: "120px",
                                            xl: "200px",
                                        }}
                                    />
                                </Box>
                                <Footer />
                            </Flex>
                            <FixedPlugin />
                        </Flex>
                    </Box>
                </Box>
            </SidebarContext.Provider>
        </Box>
    );
}
