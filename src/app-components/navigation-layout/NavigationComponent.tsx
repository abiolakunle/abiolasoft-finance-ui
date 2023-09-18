import { Portal, Box, Flex, Stack, useDisclosure, Button, Image, Link, HStack, Text, useColorModeValue, Icon } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin";
import Navbar from "components/navbar/NavbarAdmin";
import { SidebarContext } from "contexts/SidebarContext";
import { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { renderThumb, renderTrack, renderView } from "components/scrollbar/Scrollbar";
import Brand from "components/sidebar/components/Brand";
import { NavLink, useLocation } from "react-router-dom";
import SidebarCard from "components/sidebar/components/SidebarCard";
import { MdOutlineViewModule } from "react-icons/md";

export function SidebarLinks(props: { baseRoute: string; routes: any[] }) {
    //   Chakra color mode
    let location = useLocation();
    let activeColor = useColorModeValue("gray.700", "white");
    let inactiveColor = useColorModeValue("secondaryGray.600", "secondaryGray.600");
    let activeIcon = useColorModeValue("brand.500", "white");
    let textColor = useColorModeValue("secondaryGray.500", "white");
    let brandColor = useColorModeValue("brand.500", "brand.400");

    const { routes } = props;

    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName: string) => {
        if (routeName !== "/") {
            return location.pathname.includes(props.baseRoute + routeName);
        }

        return location.pathname === props.baseRoute + routeName;
    };

    // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
    const createLinks = (routes: any[]) => {
        return routes.map((route: any, index: number) => {
            return !route.excludeFromSideNav ? (
                <NavLink key={index} to={props.baseRoute + route.path}>
                    {route.icon ? (
                        <Box>
                            <HStack spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"} py="5px" ps="10px">
                                <Flex w="100%" alignItems="center" justifyContent="center">
                                    <Box color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor} me="18px">
                                        {route.icon}
                                    </Box>
                                    <Text
                                        me="auto"
                                        color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
                                        fontWeight={activeRoute(route.path.toLowerCase()) ? "bold" : "normal"}
                                    >
                                        {route.name}
                                    </Text>
                                </Flex>
                                <Box h="36px" w="4px" bg={activeRoute(route.path.toLowerCase()) ? brandColor : "transparent"} borderRadius="5px" />
                            </HStack>
                        </Box>
                    ) : (
                        <Box>
                            <HStack spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"} py="5px" ps="10px">
                                <Text
                                    me="auto"
                                    color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
                                    fontWeight={activeRoute(route.path.toLowerCase()) ? "bold" : "normal"}
                                >
                                    {route.name}
                                </Text>
                                <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                            </HStack>
                        </Box>
                    )}
                </NavLink>
            ) : null;
        });
    };
    //  BRAND
    return <>{createLinks(routes)}</>;
}

function SidebarContent(props: { baseRoute: string; routes: any[] }) {
    // SIDEBAR
    return (
        <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
            <Brand />
            <Stack direction="column" mt="8px" mb="auto">
                <Box ps="20px" pe={{ lg: "16px", "2xl": "16px" }}>
                    <SidebarLinks {...props} />
                </Box>
            </Stack>

            <Box ps="20px" pe={{ lg: "16px", "2xl": "20px" }} mt="60px" mb="40px" borderRadius="30px">
                <GeneralLinks />
            </Box>
        </Flex>
    );
}

export function GeneralLinks() {
    let textColor = useColorModeValue("secondaryGray.500", "white");

    return (
        <NavLink to="/admin/modules">
            <Box>
                <HStack spacing="26px" py="5px" ps="10px">
                    <Flex w="100%" alignItems="center" justifyContent="center">
                        <Box color={textColor} me="18px">
                            <Icon as={MdOutlineViewModule} width="20px" height="20px" color="inherit" />
                        </Box>
                        <Text me="auto" color={textColor} fontWeight="normal">
                            Modules
                        </Text>
                    </Flex>
                    <Box h="36px" w="4px" bg="transparent" borderRadius="5px" />
                </HStack>
            </Box>
        </NavLink>
    );
}

function Sidebar(props: { routes: any[]; baseRoute: string; [x: string]: any }) {
    let variantChange = "0.2s linear";
    let shadow = useColorModeValue("14px 17px 40px 4px rgba(112, 144, 176, 0.08)", "unset");
    // Chakra Color Mode
    let sidebarBg = useColorModeValue("white", "navy.800");
    let sidebarMargins = "0px";

    // SIDEBAR
    return (
        <Box display={{ sm: "none", xl: "block" }} position="fixed" minH="100%">
            <Box bg={sidebarBg} transition={variantChange} w="300px" h="100vh" m={sidebarMargins} minH="100%" overflowX="hidden" boxShadow={shadow}>
                <Scrollbars autoHide renderTrackVertical={renderTrack} renderThumbVertical={renderThumb} renderView={renderView}>
                    <SidebarContent {...props} />
                </Scrollbars>
            </Box>
        </Box>
    );
}

// Custom Chakra theme
export default function NavigationComponent(props: { baseRoute: string; routes: any[]; [x: string]: any }) {
    const { routes } = props;
    // states and functions
    const [fixed] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);

    const getActiveRoute = (routes: any[]): string => {
        let activeRoute = "Default Brand Text";
        for (let i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return activeRoute;
    };
    const getActiveNavbar = (routes: any[]): boolean => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].secondary;
            }
        }
        return activeNavbar;
    };
    const getActiveNavbarText = (routes: any[]): string | boolean => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return activeNavbar;
    };

    const { onOpen } = useDisclosure();

    return (
        <Box>
            <SidebarContext.Provider
                value={{
                    toggleSidebar,
                    setToggleSidebar,
                }}
            >
                <Sidebar display="none" {...props} />
                <Box
                    float="right"
                    minHeight="100vh"
                    height="100%"
                    overflow="auto"
                    position="relative"
                    maxHeight="100%"
                    w={{ base: "100%", xl: "calc( 100% - 290px )" }}
                    maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
                    transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                    transitionDuration=".2s, .2s, .35s"
                    transitionProperty="top, bottom, width"
                    transitionTimingFunction="linear, linear, ease"
                >
                    <Portal>
                        <Box>
                            <Navbar
                                onOpen={onOpen}
                                logoText={"AbiolaSoft Finance"}
                                brandText={getActiveRoute(routes)}
                                secondary={getActiveNavbar(routes)}
                                message={getActiveNavbarText(routes)}
                                fixed={fixed}
                                {...props}
                            />
                        </Box>
                    </Portal>
                    <Box mx="auto" p={{ base: "20px", md: "30px" }} pe="20px" minH="100vh" pt="50px">
                        {props.children}
                    </Box>
                    <Box>
                        <Footer />
                    </Box>
                </Box>
            </SidebarContext.Provider>
        </Box>
    );
}
