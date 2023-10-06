import {
    Portal,
    Box,
    Flex,
    Stack,
    useDisclosure,
    Button,
    Image,
    Link,
    HStack,
    Text,
    useColorModeValue,
    Icon,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    MenuButton,
    MenuList,
    Menu,
    Avatar,
    MenuItem,
    InputGroup,
    InputLeftElement,
    IconButton,
    Input,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    useColorMode,
} from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin";

import { SidebarContext } from "contexts/SidebarContext";
import { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { renderThumb, renderTrack, renderView } from "components/scrollbar/Scrollbar";
import Brand from "components/sidebar/components/Brand";
import { NavLink, useLocation } from "react-router-dom";
import { MdInfoOutline, MdNotificationsNone, MdOutlineViewModule, MdUpgrade } from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import navImage from "assets/img/layout/Navbar.png";
import PropTypes from "prop-types";
import { SearchIcon } from "@chakra-ui/icons";
import { IoMenuOutline } from "react-icons/io5";

export function ItemContent(props: { info: string }) {
    const textColor = useColorModeValue("navy.700", "white");
    return (
        <>
            <Flex
                justify="center"
                align="center"
                borderRadius="16px"
                minH={{ base: "60px", md: "70px" }}
                h={{ base: "60px", md: "70px" }}
                minW={{ base: "60px", md: "70px" }}
                w={{ base: "60px", md: "70px" }}
                me="14px"
                bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
            >
                <Icon as={MdUpgrade} color="white" w={8} h={14} />
            </Flex>
            <Flex flexDirection="column">
                <Text mb="5px" fontWeight="bold" color={textColor} fontSize={{ base: "md", md: "md" }}>
                    New Update: {props.info}
                </Text>
                <Flex alignItems="center">
                    <Text fontSize={{ base: "sm", md: "sm" }} lineHeight="100%" color={textColor}>
                        A new update for your downloaded item is available!
                    </Text>
                </Flex>
            </Flex>
        </>
    );
}

export function SearchBar(props: {
    variant?: string;
    background?: string;
    children?: JSX.Element;
    placeholder?: string;
    borderRadius?: string | number;
    [x: string]: any;
}) {
    // Pass the computed styles into the `__css` prop
    const { variant, background, children, placeholder, borderRadius, ...rest } = props;

    const searchIconColor = useColorModeValue("gray.700", "white");
    const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
    const inputText = useColorModeValue("gray.700", "gray.100");
    return (
        <InputGroup w={{ base: "100%", md: "200px" }} {...rest}>
            <InputLeftElement
                children={
                    <IconButton
                        aria-label="search"
                        bg="inherit"
                        borderRadius="inherit"
                        _active={{
                            bg: "inherit",
                            transform: "none",
                            borderColor: "transparent",
                        }}
                        _focus={{
                            boxShadow: "none",
                        }}
                        icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
                    />
                }
            />
            <Input
                variant="search"
                fontSize="sm"
                bg={background ? background : inputBg}
                color={inputText}
                fontWeight="500"
                _placeholder={{ color: "gray.400", fontSize: "14px" }}
                borderRadius={borderRadius ? borderRadius : "30px"}
                placeholder={placeholder ? placeholder : "Search..."}
            />
        </InputGroup>
    );
}

export function SidebarResponsive(props: { routes: RoutesType[]; baseRoute: string }) {
    let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
    let menuColor = useColorModeValue("gray.400", "white");
    // // SIDEBAR
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const location = useLocation();

    useEffect(() => {
        onClose();
    }, [location]);

    const { routes } = props;
    // let isWindows = navigator.platform.startsWith("Win");
    //  BRAND

    return (
        <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
            <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
                <Icon as={IoMenuOutline} color={menuColor} my="auto" w="20px" h="20px" me="10px" _hover={{ cursor: "pointer" }} />
            </Flex>
            <Drawer isOpen={isOpen} onClose={onClose} placement={document.documentElement.dir === "rtl" ? "right" : "left"} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent w="285px" maxW="285px" bg={sidebarBackgroundColor}>
                    <DrawerCloseButton zIndex="3" onClick={onClose} _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }} />
                    <DrawerBody maxW="285px" px="0rem" pb="0">
                        <Scrollbars autoHide renderTrackVertical={renderTrack} renderThumbVertical={renderThumb} renderView={renderView}>
                            <SidebarContent baseRoute={props.baseRoute} routes={routes} />
                        </Scrollbars>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    );
}

function HeaderLinks(props: { secondary: boolean; routes: any[]; baseRoute: string }) {
    const { secondary, routes, baseRoute } = props;
    const { colorMode, toggleColorMode } = useColorMode();

    const navbarIcon = useColorModeValue("gray.400", "white");
    let menuBg = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.700", "brand.400");
    const ethColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
    const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
    const ethBox = useColorModeValue("white", "navy.800");
    const shadow = useColorModeValue("14px 17px 40px 4px rgba(112, 144, 176, 0.18)", "14px 17px 40px 4px rgba(112, 144, 176, 0.06)");
    const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
    return (
        <Flex
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
            bg={menuBg}
            flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
            p="10px"
            borderRadius="30px"
            boxShadow={shadow}
        >
            <SearchBar
                mb={() => {
                    if (secondary) {
                        return { base: "10px", md: "unset" };
                    }
                    return "unset";
                }}
                me="10px"
                borderRadius="30px"
            />
            <Flex bg={ethBg} display={secondary ? "flex" : "none"} borderRadius="30px" ms="auto" p="6px" align="center" me="6px">
                <Flex align="center" justify="center" bg={ethBox} h="29px" w="29px" borderRadius="30px" me="7px">
                    <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
                </Flex>
                <Text w="max-content" color={ethColor} fontSize="sm" fontWeight="700" me="6px">
                    1,924
                    <Text as="span" display={{ base: "none", md: "unset" }}>
                        {" "}
                        ETH
                    </Text>
                </Text>
            </Flex>
            <SidebarResponsive routes={routes} baseRoute={baseRoute} />
            <Menu>
                <MenuButton p="0px">
                    <Icon mt="6px" as={MdNotificationsNone} color={navbarIcon} w="18px" h="18px" me="10px" />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p="20px"
                    borderRadius="20px"
                    bg={menuBg}
                    border="none"
                    mt="22px"
                    me={{ base: "30px", md: "unset" }}
                    minW={{ base: "unset", md: "400px", xl: "450px" }}
                    maxW={{ base: "360px", md: "unset" }}
                >
                    <Flex w="100%" mb="20px">
                        <Text fontSize="md" fontWeight="600" color={textColor}>
                            Notifications
                        </Text>
                        <Text fontSize="sm" fontWeight="500" color={textColorBrand} ms="auto" cursor="pointer">
                            Mark all read
                        </Text>
                    </Flex>
                    <Flex flexDirection="column">
                        <MenuItem _hover={{ bg: "none" }} _focus={{ bg: "none" }} px="0" borderRadius="8px" mb="10px">
                            <ItemContent info="AbiolaSoft UI Dashboard PRO" />
                        </MenuItem>
                        <MenuItem _hover={{ bg: "none" }} _focus={{ bg: "none" }} px="0" borderRadius="8px" mb="10px">
                            <ItemContent info="Horizon Design System Free" />
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>

            <Menu>
                <MenuButton p="0px">
                    <Icon mt="6px" as={MdInfoOutline} color={navbarIcon} w="18px" h="18px" me="10px" />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p="20px"
                    me={{ base: "30px", md: "unset" }}
                    borderRadius="20px"
                    bg={menuBg}
                    border="none"
                    mt="22px"
                    minW={{ base: "unset" }}
                    maxW={{ base: "360px", md: "unset" }}
                >
                    <Image src={navImage} borderRadius="16px" mb="28px" maxH={"200px"} />
                    <Flex flexDirection="column">
                        <Link w="100%" href="https://abiolasoft-ui.com/pro">
                            <Button w="100%" h="44px" mb="10px" variant="brand">
                                Buy AbiolaSoft UI PRO
                            </Button>
                        </Link>
                        <Link w="100%" href="https://abiolasoft-ui.com/documentation/docs/introduction">
                            <Button w="100%" h="44px" mb="10px" border="1px solid" bg="transparent" borderColor={borderButton}>
                                See Documentation
                            </Button>
                        </Link>
                        <Link w="100%" href="https://github.com/abiolasoft-ui/abiolasoft-ui-chakra-ts">
                            <Button w="100%" h="44px" variant="no-hover" color={textColor} bg="transparent">
                                Try Horizon Free
                            </Button>
                        </Link>
                    </Flex>
                </MenuList>
            </Menu>

            <Button variant="no-hover" bg="transparent" p="0px" minW="unset" minH="unset" h="18px" w="max-content" onClick={toggleColorMode}>
                <Icon me="10px" h="18px" w="18px" color={navbarIcon} as={colorMode === "light" ? IoMdMoon : IoMdSunny} />
            </Button>
            <Menu>
                <MenuButton p="0px">
                    <Avatar _hover={{ cursor: "pointer" }} color="white" name="Adela Parkson" bg="#11047A" size="sm" w="40px" h="40px" />
                </MenuButton>
                <MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
                    <Flex w="100%" mb="0px">
                        <Text
                            ps="20px"
                            pt="16px"
                            pb="10px"
                            w="100%"
                            borderBottom="1px solid"
                            borderColor={borderColor}
                            fontSize="sm"
                            fontWeight="700"
                            color={textColor}
                        >
                            👋&nbsp; Hey, Adela
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" p="10px">
                        <MenuItem _hover={{ bg: "none" }} _focus={{ bg: "none" }} borderRadius="8px" px="14px">
                            <Text fontSize="sm">Profile Settings</Text>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "none" }} _focus={{ bg: "none" }} borderRadius="8px" px="14px">
                            <Text fontSize="sm">Newsletter Settings</Text>
                        </MenuItem>
                        <MenuItem _hover={{ bg: "none" }} _focus={{ bg: "none" }} color="red.400" borderRadius="8px" px="14px">
                            <Text fontSize="sm">Log out</Text>
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
}

HeaderLinks.propTypes = {
    variant: PropTypes.string,
    fixed: PropTypes.bool,
    secondary: PropTypes.bool,
    onOpen: PropTypes.func,
    routes: PropTypes.array,
    baseRoute: PropTypes.string,
};

function AdminNavbar(props: {
    secondary: boolean;
    message: string | boolean;
    brandText: string;
    logoText: string;
    fixed: boolean;
    routes: any[];
    baseRoute: string;
    onOpen: (...args: any[]) => any;
}) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", changeNavbar);

        return () => {
            window.removeEventListener("scroll", changeNavbar);
        };
    });

    const { secondary, brandText } = props;

    // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
    let mainText = useColorModeValue("navy.700", "white");
    let secondaryText = useColorModeValue("gray.700", "white");
    let navbarPosition = "fixed" as const;
    let navbarFilter = "none";
    let navbarBackdrop = "blur(20px)";
    let navbarShadow = "none";
    let navbarBg = useColorModeValue("rgba(244, 247, 254, 0.2)", "rgba(11,20,55,0.5)");
    let navbarBorder = "transparent";
    let secondaryMargin = "0px";
    let paddingX = "15px";
    let gap = "0px";
    const changeNavbar = () => {
        if (window.scrollY > 1) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    return (
        <Box
            position={navbarPosition}
            boxShadow={navbarShadow}
            bg={navbarBg}
            borderColor={navbarBorder}
            filter={navbarFilter}
            backdropFilter={navbarBackdrop}
            backgroundPosition="center"
            backgroundSize="cover"
            borderRadius="16px"
            borderWidth="1.5px"
            borderStyle="solid"
            transitionDelay="0s, 0s, 0s, 0s"
            transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
            transition-property="box-shadow, background-color, filter, border"
            transitionTimingFunction="linear, linear, linear, linear"
            alignItems={{ xl: "center" }}
            display={secondary ? "block" : "flex"}
            minH="75px"
            justifyContent={{ xl: "center" }}
            lineHeight="25.6px"
            mx="auto"
            mt={secondaryMargin}
            pb="8px"
            right={{ base: "12px", md: "30px", lg: "30px", xl: "30px" }}
            px={{
                sm: paddingX,
                md: "10px",
            }}
            ps={{
                xl: "12px",
            }}
            pt="8px"
            top={{ base: "12px", md: "16px", xl: "18px" }}
            w={{
                base: "calc(100vw - 6%)",
                md: "calc(100vw - 8%)",
                lg: "calc(100vw - 6%)",
                xl: "calc(100vw - 350px)",
                "2xl": "calc(100vw - 365px)",
            }}
        >
            <Flex
                w="100%"
                flexDirection={{
                    sm: "column",
                    md: "row",
                }}
                alignItems={{ xl: "center" }}
                mb={gap}
            >
                <Box mb={{ sm: "8px", md: "0px" }}>
                    <Breadcrumb alignItems="baseline">
                        <BreadcrumbItem color={secondaryText} fontSize="sm" mb="5px">
                            <BreadcrumbLink href="#" color={secondaryText} textTransform="capitalize">
                                {props.baseRoute.replace("/admin/modules/", "")}
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem color={secondaryText} fontSize="sm">
                            <BreadcrumbLink href="#" color={secondaryText}>
                                {brandText}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    {/* Here we create navbar brand, based on route name */}
                    <Link
                        color={mainText}
                        href="#"
                        bg="inherit"
                        borderRadius="inherit"
                        fontWeight="bold"
                        fontSize="28px"
                        _hover={{ color: { mainText } }}
                        _active={{
                            bg: "inherit",
                            transform: "none",
                            borderColor: "transparent",
                        }}
                        _focus={{
                            boxShadow: "none",
                        }}
                    >
                        {brandText}
                    </Link>
                </Box>
                <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
                    <HeaderLinks baseRoute={props.baseRoute} routes={props.routes} onOpen={props.onOpen} secondary={props.secondary} fixed={props.fixed} />
                </Box>
            </Flex>
        </Box>
    );
}

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
    const { routes, baseRoute } = props;
    // states and functions
    const [fixed] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);

    const getActiveRoute = (routes: any[]): string => {
        let activeRoute = routes[0].name;
        for (let i = 0; i < routes.length; i++) {
            console.log("p", i, routes, routes[i].path);
            if (routes[i].path !== "/" && window.location.href.indexOf(baseRoute + routes[i].path) !== -1) {
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
                            <AdminNavbar
                                onOpen={onOpen}
                                logoText={"AbiolaSoft Finance"}
                                brandText={getActiveRoute(routes)}
                                secondary={getActiveNavbar(routes)}
                                message={getActiveNavbarText(routes)}
                                fixed={fixed}
                                routes={routes}
                                baseRoute={baseRoute}
                                {...props}
                            />
                        </Box>
                    </Portal>
                    <Box mx="auto" pl={{ sm: "8px", md: "20px" }} p={{ base: "20px", md: "30px" }} pe={{ sm: "8px", md: "20px" }} minH="100vh" pt="50px">
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
