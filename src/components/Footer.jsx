import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import logoImg from "../images/logo.svg";

const services = [
  { name: "Virtual Reality", link: "/services/virtual-reality" },
  { name: "Augmented Reality", link: "/services/augmented-reality" },
  { name: "Spatial Computing", link: "/services/spatial-computing" },
  { name: "Metaverse & Digital Twin", link: "/services/metaverse-digital-twin" },
  { name: "WebXR / WebAR", link: "/services/webxr-webar" },
  { name: "Intelligent XR", link: "/services/intelligent-xr" },
  { name: "3D Modeling & Animation", link: "/services/3d-modeling-animation" },
  { name: "Game Development", link: "/services/game-development" },
  { name: "Staff Augmentation", link: "/services/staff-augmentation" },
  { name: "AI & Machine Learning", link: "/services/ai-machine-learning" },
];

const chunkArray = (array, chunkSize) => {
  return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
    array.slice(index * chunkSize, index * chunkSize + chunkSize)
  );
};

const Footer = () => {
  const serviceColumns = chunkArray(services, 10);

  return (
    <>
      <hr />
      <Box
        component="footer"
        sx={{
          color: "white",
          py: 6,
          px: { xs: 3, sm: 6, md: 12 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          gap: 6,
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
          maxWidth: "1490px",
          margin: "auto",
        }}
      >
        {/* Left Section - Logo */}
        <Box sx={{ mb: { xs: 4, md: 0 }, flex: 1 }}>
          <Typography sx={{ mb: 2 }}>
            <img src={logoImg} alt="Metaphi logo" />
          </Typography>
          <Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" }, color: "#bbb" }}>
            © 2024 Metaphi Innovations
          </Typography>
        </Box>

        {/* Services Section */}
        <Box sx={{ flex: 1, mb: { xs: 4, md: 0 } }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            Services
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: { xs: "center", md: "flex-start" } }}>
            {serviceColumns.map((column, columnIndex) => (
              <Box key={columnIndex} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {column.map((service) => (
                  <Link
                    key={service.name}
                    href={service.link}
                    underline="none"
                    sx={{
                      color: "#bbb",
                      cursor: "pointer",
                      transition: "color 0.3s ease",
                      "&:hover": { color: "white" },
                      fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                    }}
                  >
                    {service.name}
                  </Link>
                ))}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Offices Section */}
        <Box sx={{ flex: 1, mb: { xs: 4, md: 0 } }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            Offices
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" } }}>
            India
          </Typography>
          <Typography sx={{ color: "#bbb", fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" } }}>
            Mumbai, Maharashtra
          </Typography>
        </Box>

        {/* Contact Section */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            Contact us
          </Typography>
          <Box sx={{ display: "flex", gap: 1, justifyContent: { xs: "center", md: "flex-start" } }}>
            <IconButton sx={{ color: "#0077B5" }}>
              <LinkedIn />
            </IconButton>
            <IconButton sx={{ color: "#1DA1F2" }}>
              <Twitter />
            </IconButton>
            <IconButton sx={{ color: "#FF0000" }}>
              <YouTube />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            Interested in working with us?
          </Typography>
          {["Careers", "Write to us →"].map((item) => (
            <Link
              key={item}
              href="#"
              underline="none"
              sx={{
                color: "#0FA3B1",
                fontWeight: "bold",
                fontSize: { xs: "0.85rem", sm: "1rem" },
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {item}
            </Link>
          ))}
        </Box>
      </Box>
    </>

  );
};

export default Footer;
