import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Container,
    Box,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Divider,
    useScrollTrigger,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import logoImg from "../images/logo.svg";
import gsap from "gsap";

const pages = ["About", "Services", "Industries", "Resources", "Contact"];
const subLinks = {
    About: [
        { name: "Company Overview", path: "/about/overview", description: "Who we are and what we do." },
        { name: "Our Team", path: "/about/team", description: "Meet the people behind our success." },
        { name: "Our Expertise", path: "/about/expertise", description: "Our specialized skills and experience." },
        { name: "Why Choose Us", path: "/about/why-choose-us", description: "What makes us stand out." },
        { name: "Mission & Vision", path: "/about/mission-vision", description: "Our goals and future aspirations." },
        { name: "Careers", path: "/about/careers", description: "Join our team and grow with us." },
        { name: "Events", path: "/about/events", description: "Stay updated on our latest events." }
    ],

    Services: [
        { name: "Game Development", path: "/services/game", description: "Creating immersive gaming experiences." },
        { name: "Mobile App Development", path: "/services/mobile", description: "Building user-friendly mobile applications." },
        { name: "Web and CMS Development", path: "/services/web", description: "Custom websites and CMS solutions." },
        { name: "E-commerce Development", path: "/services/ecommerce", description: "Robust online store solutions." },
        { name: "Blockchain Development", path: "/services/blockchain", description: "Secure and decentralized applications." },
        { name: "Salesforce Solutions", path: "/services/salesforce", description: "Optimized CRM and automation tools." },
        { name: "AI & Machine Learning", path: "/services/ai-ml", description: "Smart AI-driven solutions for businesses." },
        { name: "IoT & Embedded Systems", path: "/services/iot", description: "Connecting smart devices and automation." },
        { name: "DevOps Services", path: "/services/devops", description: "Streamlining development and operations." }
    ],

    Industries: [
        { name: "Education", path: "/industries/education", description: "Tech-driven learning experiences." },
        { name: "Healthcare", path: "/industries/healthcare", description: "Innovative solutions for healthcare." },
        { name: "Real Estate", path: "/industries/real-estate", description: "Smart technology for real estate." },
        { name: "Retail", path: "/industries/retail", description: "Enhancing shopping experiences." },
        { name: "Tourism", path: "/industries/tourism", description: "Travel and hospitality solutions." },
        { name: "Fintech", path: "/industries/fintech", description: "Revolutionizing financial services." },
        { name: "Game", path: "/industries/game", description: "Gaming industry solutions and tools." },
        { name: "Entertainment", path: "/industries/entertainment", description: "Innovating media and entertainment." },
        { name: "Logistics", path: "/industries/logistics", description: "Optimized supply chain and transport." },
        { name: "Sports", path: "/industries/sports", description: "Technology in sports and fitness." },
        { name: "On-Demand", path: "/industries/on-demand", description: "Solutions for on-demand services." }
    ],

   

    Resources: [
        { name: "Blogs", path: "/resources/blogs", description: "Insights, trends, and news." }
    ]
};

// Elevation Effect on Scroll
const ElevationScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

    return React.cloneElement(children, {
        elevation: trigger ? 6 : 0,
        sx: {
            background: trigger ? "#121212" : "transparent",
            transition: "background 0.3s ease-in-out",
        },
    });
};

const Navbar = (props) => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const dropDownRef = useRef(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        gsap.fromTo(".nav-item", { opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 });
    }, []);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    let closeTimeout;

    const handleMouseEnter = (page) => {
        clearTimeout(closeTimeout);

        if (!activeDropdown) {
            setActiveDropdown(page);

            setTimeout(() => {
                if (dropDownRef.current) {
                    gsap.set(dropDownRef.current, {
                        opacity: 0,
                        y: -20,
                        scaleY: 0.8,
                        visibility: "hidden",
                        pointerEvents: "none",
                    });

                    gsap.fromTo(
                        dropDownRef.current,
                        {
                            opacity: 0,
                            y: -20,
                            scaleY: 0.8,
                            transformOrigin: "top center",
                            pointerEvents: "none",
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scaleY: 1,
                            duration: 0.4,
                            ease: "power2.out",
                            onStart: () => {
                                dropDownRef.current.style.visibility = "visible";
                            },
                            onComplete: () => {
                                dropDownRef.current.style.pointerEvents = "auto";
                            }
                        }
                    );
                }
            });
        } else {
            setActiveDropdown(page);
        }
    };

    const handleMouseLeave = () => {
        closeTimeout = setTimeout(() => {
            if (dropDownRef.current) {
                gsap.to(dropDownRef.current, {
                    opacity: 0,
                    y: -20,
                    scaleY: 0.9,
                    transformOrigin: "top center",
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => setActiveDropdown(null),
                });
            }
        }, 200);
    };

    const handleDropdownClick = (page) => {
        setOpenDropdown(openDropdown === page ? null : page);
    };


    return (
        <>
            <ElevationScroll {...props}>
                <AppBar position="fixed" sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(10px)", }}>
                    <Container maxWidth="xl">
                        <Toolbar
                            disableGutters
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                px: { xs: 2, md: 6 },
                                position: "relative",
                            }}
                        >
                            {/* Logo (Left Side) */}
                            <Box sx={{ position: "absolute", left: 20 }}>
                                <Link to="/">
                                    <img src={logoImg} alt="Logo" style={{ height: "30px" }} />
                                </Link>
                            </Box>

                            {/* Desktop Navigation */}
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    gap: 3,
                                    alignItems: "center",
                                    position: "absolute",
                                    left: "51.3%",
                                    transform: "translateX(-52.5%)",

                                }}
                            >
                                {pages
                                    .filter((page) => page !== "Contact")
                                    .map((page) => {
                                        const isActive = subLinks[page]?.some((subLink) => location.pathname === subLink.path);

                                        return subLinks[page] ? (
                                            <Box
                                                key={page}
                                                sx={{ position: "relative" }}
                                                onMouseEnter={() => handleMouseEnter(page)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <Button
                                                    disableRipple
                                                    className="nav-item"
                                                    sx={{
                                                        color: "white",
                                                        fontWeight: isActive ? "bold" : "normal",
                                                        "&:hover": { color: "#00C853" },
                                                    }}
                                                >
                                                    {page}
                                                </Button>

                                                {/* Invisible Hover Bridge */}
                                                {activeDropdown === page && (
                                                    <Box
                                                        sx={{
                                                            position: "fixed",
                                                            top: "37px",
                                                            left: "0%",
                                                            width: "100%",
                                                            height: "45px",
                                                            backgroundColor: "tranaparent",
                                                            zIndex: 5,
                                                        }}
                                                        onMouseEnter={() => handleMouseEnter(page)}
                                                    />
                                                )}

                                                {/* Dropdown Menu */}

                                                {activeDropdown === page && (
                                                    <Box
                                                        ref={dropDownRef}
                                                        sx={{
                                                            position: "fixed",
                                                            top: "100%",
                                                            left: "50%",
                                                            transform: "translate3d(-50%, 0, 0)",
                                                            width: "790px",
                                                            backgroundColor: "rgba(24, 24, 24, 0.95)",
                                                            backdropFilter: "blur(5px)",
                                                            willChange: "backdrop-filter",
                                                            borderRadius: "10px",
                                                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                                            padding: "18px",
                                                            display: "grid",
                                                            gridTemplateColumns: "0.9fr 1px 1.3fr",
                                                            gap: "20px",
                                                            zIndex: 1000,
                                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                                            marginTop: "10px",
                                                        }}

                                                    >
                                                        {/* Left Side - Core Section */}
                                                        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                                            <Typography
                                                                sx={{
                                                                    color: "rgba(255, 255, 255, 0.6)",
                                                                    fontSize: "14px",
                                                                    fontWeight: "600",
                                                                    textTransform: "uppercase",
                                                                }}
                                                            >
                                                                Services
                                                            </Typography>
                                                            {subLinks[page].slice(0, 4).map((subLink) => (
                                                                <Box
                                                                    key={subLink.path}
                                                                    sx={{
                                                                        display: "flex",
                                                                        flexDirection: "column",
                                                                        justifyContent: "center",
                                                                        padding: "8px 12px",
                                                                        borderRadius: "6px",
                                                                        minHeight: "60px",
                                                                        transition: "all 0.2s ease-in-out",
                                                                        "&:hover": {
                                                                            backgroundColor: "rgba(0, 255, 150, 0.15)",
                                                                            boxShadow: "0px 4px 10px rgba(0, 255, 150, 0.3)",
                                                                        },
                                                                    }}
                                                                >
                                                                    <NavLink
                                                                        to={subLink.path}
                                                                        style={{
                                                                            textDecoration: "none",
                                                                            display: "block",
                                                                            color: "rgba(255, 255, 255, 0.9)",
                                                                            fontSize: "15px",
                                                                            fontWeight: "500",
                                                                        }}
                                                                        className="dropdown-item"
                                                                    >
                                                                        {subLink.name}
                                                                        <Typography sx={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", marginTop: "2px" }}>
                                                                            {subLink.description}
                                                                        </Typography>
                                                                    </NavLink>

                                                                </Box>
                                                            ))}
                                                        </Box>

                                                        {/* Divider */}
                                                        <Box sx={{ width: "1px", backgroundColor: "rgba(255, 255, 255, 0.2)", height: "100%", alignSelf: "stretch" }} />

                                                        {/* Right Side - More Section */}
                                                        <Box
                                                            sx={{
                                                                display: subLinks[page].slice(4).length < 4 ? "flex" : "grid",
                                                                flexDirection: subLinks[page].slice(4).length < 4 ? "column" : "unset",
                                                                gridTemplateColumns: subLinks[page].slice(4).length >= 5 ? "repeat(2, 1fr)" : "1fr",
                                                                gap: "12px",
                                                                paddingX: "12px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    color: "rgba(255, 255, 255, 0.6)",
                                                                    fontSize: "14px",
                                                                    fontWeight: "600",
                                                                    textTransform: "uppercase",
                                                                    gridColumn: subLinks[page].slice(4).length >= 5 ? "span 2" : "span 1",
                                                                    paddingBottom: "6px",
                                                                    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                                                                }}
                                                            >
                                                                More
                                                            </Typography>

                                                            {subLinks[page].slice(4).map((subLink) => (
                                                                <Box
                                                                    key={subLink.path}
                                                                    sx={{
                                                                        display: "flex",
                                                                        flexDirection: "column",
                                                                        justifyContent: "center",
                                                                        padding: "8px 12px",
                                                                        borderRadius: "6px",
                                                                        minHeight: subLinks[page].slice(4).length < 4 ? "45px" : "60px",
                                                                        transition: "all 0.2s ease-in-out",
                                                                        "&:hover": {
                                                                            backgroundColor: "rgba(0, 255, 150, 0.15)",
                                                                            boxShadow: "0px 4px 10px rgba(0, 255, 150, 0.3)",
                                                                        },
                                                                    }}
                                                                >
                                                                    <NavLink
                                                                        to={subLink.path}
                                                                        style={{
                                                                            textDecoration: "none",
                                                                            display: "block",
                                                                            color: "rgba(255, 255, 255, 0.9)",
                                                                            fontSize: "15px",
                                                                            fontWeight: "500",
                                                                        }}
                                                                        className="dropdown-item"
                                                                    >
                                                                        {subLink.name}
                                                                        <Typography sx={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", marginTop: "2px" }}>
                                                                            {subLink.description}
                                                                        </Typography>
                                                                    </NavLink>

                                                                </Box>
                                                            ))}
                                                        </Box>

                                                    </Box>
                                                )}

                                            </Box>
                                        ) : (
                                            <NavLink
                                                key={page}
                                                to={`/${page.toLowerCase()}`}
                                                className="nav-item"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "white",
                                                    fontSize: "16px",
                                                    fontWeight: location.pathname === `/${page.toLowerCase()}` ? "bold" : "400",
                                                    transition: "all 0.3s ease-in-out",
                                                }}
                                            >
                                                {page}
                                            </NavLink>
                                        );
                                    })}
                            </Box>

                            {/* Contact Button */}
                            <Box sx={{ position: "absolute", right: 20, display: { xs: "none", md: "block" } }}>
                                <Link to="/contact">
                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: "linear-gradient(90deg, #0D47A1, #00C853)",
                                            color: "white",
                                            borderRadius: "830px",
                                        }}
                                    >
                                        Contact Us
                                    </Button>
                                </Link>
                            </Box>

                            {/* Mobile Menu Button */}
                            <IconButton
                                size="large"
                                color="inherit"
                                onClick={handleDrawerToggle}
                                disableRipple
                                sx={{
                                    display: { xs: "block", md: "none" },
                                    position: "absolute",
                                    right: 20,
                                    pr: 0,
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>

            {/* Mobile Sidebar */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 250,
                        backgroundColor: "#242424",
                        color: "white",
                        padding: "10px 0"
                    }
                }}
            >
                <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    {/* Logo and Close Button */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                        <NavLink to="/" onClick={handleDrawerToggle}>
                            <img src={logoImg} alt="Logo" style={{ height: "40px" }} />
                        </NavLink>
                        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ backgroundColor: "#00C853" }} />

                    {/* Sidebar Navigation */}
                    <List>
                        {pages.map((page) => {
                            const hasDropdown = subLinks[page];

                            return (
                                <Box key={page}>
                                    {/* Main Nav Item */}
                                    <ListItem
                                        button
                                        component={!hasDropdown ? NavLink : "div"}  
                                        to={!hasDropdown ? `/${page.toLowerCase()}` : undefined}
                                        onClick={() => (hasDropdown ? handleDropdownClick(page) : handleDrawerToggle())}
                                        sx={{
                                            color: "white",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "10px 16px",
                                            "&:hover": {
                                                backgroundColor: "rgba(0, 255, 150, 0.15)",
                                            },
                                        }}
                                    >
                                        <ListItemText primary={page} />
                                        {hasDropdown ? (openDropdown === page ? <ExpandLess /> : <ExpandMore />) : null}
                                    </ListItem>

                                    {/* Dropdown Links with Overlay */}
                                    {hasDropdown && (
                                        <Collapse in={openDropdown === page} timeout="auto" unmountOnExit>
                                            <Box
                                                sx={{
                                                    paddingLeft: "16px",
                                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {/* Overlay Effect */}
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        background: "linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                                                        zIndex: -1,
                                                    }}
                                                />

                                                {subLinks[page].map((subLink, index) => (
                                                    <Box key={subLink.path} sx={{ position: "relative" }}>
                                                        {/* Overlay Between Items */}
                                                        {index !== 0 && (
                                                            <Box
                                                                sx={{
                                                                    height: "1px",
                                                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                                    margin: "4px 0",
                                                                }}
                                                            />
                                                        )}

                                                        <ListItem
                                                            button
                                                            component={NavLink}
                                                            to={subLink.path}
                                                            onClick={handleDrawerToggle} 
                                                            sx={{
                                                                color: "rgba(255, 255, 255, 0.9)",
                                                                padding: "8px 12px",
                                                                "&:hover": {
                                                                    backgroundColor: "rgba(0, 255, 150, 0.15)",
                                                                },
                                                            }}
                                                        >
                                                            <ListItemText primary={subLink.name} />
                                                        </ListItem>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Collapse>
                                    )}

                                    <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
                                </Box>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>

        </>
    );
};

export default Navbar;
