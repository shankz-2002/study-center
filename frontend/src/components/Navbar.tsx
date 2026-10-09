import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const userInitial =
    user?.firstName?.charAt(0)?.toUpperCase() ||
    user?.lastName?.charAt(0)?.toUpperCase() ||
    "U";

  // ---- Design tokens ----
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";
  const navTextColor = "#334155";
  const navHoverBg = "rgba(99, 102, 241, 0.08)";
  const navHoverColor = "#4f46e5";

  const navButtonSx = {
    color: navTextColor,
    fontWeight: 600,
    fontSize: "0.9rem",
    letterSpacing: "-0.1px",
    textTransform: "none",
    borderRadius: "12px",
    px: 2,
    py: 1,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: navHoverBg,
      color: navHoverColor,
      transform: "translateY(-1px)",
    },
  };

  const handleDrawerToggle = () => setDrawerOpen((v) => !v);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  /* ---------------- Admin nav items (used in both desktop + drawer) ---------------- */
  const adminItems = [
    {
      label: "Admin Dashboard",
      href: "/admin/dashboard",
      icon: <DashboardOutlinedIcon sx={{ fontSize: 20 }} />,
    },
    {
      label: "Manage Fields",
      href: "/admin/field",
      icon: <GridViewOutlinedIcon sx={{ fontSize: 20 }} />,
    },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        color: "#0f172a",
        borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
        boxShadow:
          "0 1px 0 rgba(15, 23, 42, 0.02), 0 8px 24px -12px rgba(99, 102, 241, 0.12)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: brandGradient,
          opacity: 0.9,
        },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 76 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* ---------------- Logo ---------------- */}
          <Box
            component="a"
            href="/home"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              textDecoration: "none",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "translateY(-1px)" },
            }}
          >
            <Box
              sx={{
                width: { xs: 34, md: 38 },
                height: { xs: 34, md: 38 },
                borderRadius: "12px",
                background: brandGradient,
                display: "grid",
                placeItems: "center",
                boxShadow:
                  "0 6px 16px -6px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              <AutoStoriesIcon
                sx={{ color: "#fff", fontSize: { xs: 18, md: 20 } }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.25 }}>
              <Typography
                component="span"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                  letterSpacing: "-0.6px",
                  color: "#0f172a",
                  lineHeight: 1,
                }}
              >
                Learn
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                  letterSpacing: "-0.6px",
                  lineHeight: 1,
                  background: brandGradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Hub
              </Typography>
            </Box>
          </Box>

          {/* ---------------- Desktop Navigation ---------------- */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Button
              href="/home"
              startIcon={<MenuBookIcon sx={{ fontSize: 18 }} />}
              sx={navButtonSx}
            >
              Home
            </Button>

            {user ? (
              user.role === "ADMIN" ? (
                // ---- Admin (desktop) ----
                <>
                  {adminItems.map((item) => (
                    <Button
                      key={item.href}
                      href={item.href}
                      startIcon={item.icon}
                      sx={navButtonSx}
                    >
                      {item.label}
                    </Button>
                  ))}

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      mx: 1,
                      my: 2,
                      borderColor: "rgba(15, 23, 42, 0.08)",
                    }}
                  />

                  <Tooltip title="Logout" arrow>
                    <IconButton
                      onClick={logout}
                      sx={{
                        color: "#64748b",
                        borderRadius: "12px",
                        p: 1.1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(244, 63, 94, 0.08)",
                          color: "#e11d48",
                        },
                      }}
                    >
                      <LogoutIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                // ---- Normal user (desktop) ----
                <>
                  <Button
                    href="/profile"
                    startIcon={<PersonIcon sx={{ fontSize: 18 }} />}
                    sx={navButtonSx}
                  >
                    Profile
                  </Button>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      mx: 1,
                      my: 2,
                      borderColor: "rgba(15, 23, 42, 0.08)",
                    }}
                  />

                  <Tooltip title={user.firstName || "User"} arrow>
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                        p: "2px",
                        borderRadius: "50%",
                        background: brandGradient,
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 34,
                          height: 34,
                          bgcolor: "#fff",
                          color: "#4f46e5",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          border: "2px solid #fff",
                        }}
                      >
                        {userInitial}
                      </Avatar>
                    </Box>
                  </Tooltip>

                  <Tooltip title="Logout" arrow>
                    <IconButton
                      onClick={logout}
                      sx={{
                        ml: 0.5,
                        color: "#64748b",
                        borderRadius: "12px",
                        p: 1.1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(244, 63, 94, 0.08)",
                          color: "#e11d48",
                        },
                      }}
                    >
                      <LogoutIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                </>
              )
            ) : (
              <Button
                href="/login"
                variant="contained"
                disableElevation
                sx={{
                  ml: 1,
                  background: brandGradient,
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "none",
                  borderRadius: "12px",
                  px: 3,
                  py: 1.1,
                  color: "#fff",
                  boxShadow:
                    "0 8px 20px -8px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow:
                      "0 12px 28px -8px rgba(139, 92, 246, 0.8), inset 0 1px 0 rgba(255,255,255,0.3)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Get Started
              </Button>
            )}
          </Box>

          {/* ---------------- Mobile right-side controls ---------------- */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {user && (
              <>
                {user.role !== "ADMIN" && (
                  <Avatar
                    onClick={handleMenuOpen}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "#fff",
                      color: "#4f46e5",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      border: "2px solid transparent",
                      backgroundImage: brandGradient,
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      cursor: "pointer",
                    }}
                  >
                    {userInitial}
                  </Avatar>
                )}

                <IconButton
                  onClick={handleDrawerToggle}
                  aria-label="open menu"
                  sx={{
                    color: "#0f172a",
                    borderRadius: "10px",
                    p: 1,
                    "&:hover": { backgroundColor: navHoverBg },
                  }}
                >
                  <MenuIcon sx={{ fontSize: 22 }} />
                </IconButton>
              </>
            )}

            {!user && (
              <Button
                href="/login"
                variant="contained"
                disableElevation
                sx={{
                  background: brandGradient,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.9,
                  color: "#fff",
                  boxShadow:
                    "0 6px 16px -8px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* ---------------- Mobile Drawer ---------------- */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "saturate(180%) blur(20px)",
              WebkitBackdropFilter: "saturate(180%) blur(20px)",
              borderLeft: "1px solid rgba(15, 23, 42, 0.06)",
            },
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 2,
            borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "10px",
                background: brandGradient,
                display: "grid",
                placeItems: "center",
                boxShadow:
                  "0 6px 16px -6px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              <AutoStoriesIcon sx={{ color: "#fff", fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.1rem",
                letterSpacing: "-0.5px",
                color: "#0f172a",
              }}
            >
              Learn
              <Box
                component="span"
                sx={{
                  background: brandGradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Hub
              </Box>
            </Typography>
          </Box>

          <IconButton
            onClick={handleDrawerToggle}
            aria-label="close menu"
            sx={{
              color: "#64748b",
              borderRadius: "10px",
              "&:hover": { backgroundColor: navHoverBg, color: navHoverColor },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Drawer items */}
        <List sx={{ px: 1.5, py: 2 }}>
          <ListItemButton
            component="a"
            href="/home"
            onClick={handleDrawerToggle}
            sx={drawerItemSx}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <MenuBookIcon sx={{ fontSize: 20, color: "#6366f1" }} />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              slotProps={{
                primary: { sx: { fontWeight: 600, fontSize: "0.95rem" } },
              }}
            />
          </ListItemButton>

          {user?.role === "ADMIN" ? (
            <>
              {adminItems.map((item) => (
                <ListItemButton
                  key={item.href}
                  component="a"
                  href={item.href}
                  onClick={handleDrawerToggle}
                  sx={drawerItemSx}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Box sx={{ color: "#6366f1", display: "flex" }}>
                      {item.icon}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: "0.95rem" } },
                    }}
                  />
                </ListItemButton>
              ))}
            </>
          ) : (
            user && (
              <ListItemButton
                component="a"
                href="/profile"
                onClick={handleDrawerToggle}
                sx={drawerItemSx}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <PersonIcon sx={{ fontSize: 20, color: "#6366f1" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: "0.95rem" } },
                  }}
                />
              </ListItemButton>
            )
          )}

          {user && (
            <>
              <Divider sx={{ my: 2, borderColor: "rgba(15, 23, 42, 0.08)" }} />
              <ListItemButton
                onClick={() => {
                  handleDrawerToggle();
                  logout();
                }}
                sx={{
                  ...drawerItemSx,
                  color: "#e11d48",
                  "&:hover": {
                    backgroundColor: "rgba(244, 63, 94, 0.08)",
                    color: "#e11d48",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <LogoutIcon sx={{ fontSize: 20, color: "#e11d48" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: "0.95rem" } },
                  }}
                />
              </ListItemButton>
            </>
          )}

          {!user && (
            <Box sx={{ px: 1.5, mt: 2 }}>
              <Button
                fullWidth
                href="/login"
                variant="contained"
                disableElevation
                onClick={handleDrawerToggle}
                sx={{
                  background: brandGradient,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "12px",
                  py: 1.3,
                  color: "#fff",
                  boxShadow:
                    "0 8px 20px -8px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                Get Started
              </Button>
            </Box>
          )}
        </List>
      </Drawer>

      {/* ---------------- Mobile avatar dropdown menu ---------------- */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 180,
              borderRadius: "14px",
              border: "1px solid rgba(15, 23, 42, 0.06)",
              boxShadow:
                "0 12px 32px -12px rgba(99, 102, 241, 0.35), 0 4px 12px -6px rgba(139, 92, 246, 0.2)",
            },
          },
        }}
      >
        <MenuItem
          component="a"
          href="/profile"
          onClick={handleMenuClose}
          sx={{
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#334155",
            py: 1.2,
            "&:hover": { backgroundColor: "rgba(99, 102, 241, 0.06)" },
          }}
        >
          <PersonIcon sx={{ fontSize: 18, mr: 1.25, color: "#6366f1" }} />
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleMenuClose();
            logout();
          }}
          sx={{
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#e11d48",
            py: 1.2,
            "&:hover": { backgroundColor: "rgba(244, 63, 94, 0.06)" },
          }}
        >
          <LogoutIcon sx={{ fontSize: 18, mr: 1.25, color: "#e11d48" }} />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

/* ---------------- Shared drawer item style ---------------- */
const drawerItemSx = {
  borderRadius: "12px",
  mb: 0.5,
  px: 1.5,
  py: 1.2,
  color: "#334155",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(99, 102, 241, 0.06)",
    color: "#4f46e5",
  },
  "& .MuiListItemIcon-root": { color: "inherit" },
};

export default Navbar;
