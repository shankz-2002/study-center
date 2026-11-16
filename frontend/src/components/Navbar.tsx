import { useState } from "react";
import type { MouseEvent } from "react";

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

import { useTheme } from "@mui/material/styles";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useAuth } from "../context/useAuth";
import { useThemeMode } from "../theme/ThemeContextStore";
function Navbar() {
  const { user, logout } = useAuth();

  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();

  const isDark = mode === "dark";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const userInitial =
    user?.firstName?.charAt(0)?.toUpperCase() ||
    user?.lastName?.charAt(0)?.toUpperCase() ||
    "U";

  // ---- Design tokens ----

  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  const navTextColor = theme.palette.text.primary;
  const navHoverBg = theme.palette.action.hover;
  const navHoverColor = theme.palette.primary.main;

  const navButtonSx = {
    color: navTextColor,
    fontWeight: 600,
    fontSize: "0.9rem",
    letterSpacing: "-0.1px",
    textTransform: "none" as const,
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

  const handleDrawerToggle = () => {
    setDrawerOpen((previous) => !previous);
  };

  const handleMenuOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ---- Admin navigation items ----

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

  // ---- Theme toggle button ----

  const themeToggle = (
    <Tooltip
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      arrow
    >
      <IconButton
        onClick={toggleTheme}
        aria-label="Toggle theme"
        sx={{
          color: "text.primary",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: isDark
          ? "rgba(15, 23, 42, 0.92)"
          : "rgba(255, 255, 255, 0.82)",

        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",

        color: "text.primary",

        borderBottom: 1,
        borderColor: "divider",

        boxShadow: isDark
          ? "0 4px 20px rgba(0,0,0,0.2)"
          : "0 8px 24px -12px rgba(99, 102, 241, 0.12)",
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
              "&:hover": {
                transform: "translateY(-1px)",
              },
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
                sx={{
                  color: "#fff",
                  fontSize: { xs: 18, md: 20 },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 0.25,
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                  letterSpacing: "-0.6px",
                  color: "text.primary",
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
                      borderColor: "divider",
                    }}
                  />

                  <Tooltip title={user.firstName || "User"} arrow>
                    <Box
                      onClick={handleMenuOpen}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleMenuOpen(
                            e as unknown as MouseEvent<HTMLElement>,
                          );
                        }
                      }}
                      sx={{
                        display: "inline-flex",
                        p: "2px",
                        borderRadius: "50%",
                        background: brandGradient,
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 34,
                          height: 34,
                          bgcolor: "background.paper",
                          color: "primary.main",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          border: "2px solid",
                          borderColor: "background.paper",
                        }}
                      >
                        {userInitial}
                      </Avatar>
                    </Box>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title={user.firstName || "User"} arrow>
                  <Box
                    onClick={handleMenuOpen}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleMenuOpen(e as unknown as MouseEvent<HTMLElement>);
                      }
                    }}
                    sx={{
                      display: "inline-flex",
                      p: "2px",
                      borderRadius: "50%",
                      background: brandGradient,
                      cursor: "pointer",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 18px -6px rgba(139, 92, 246, 0.6)",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 34,
                        height: 34,
                        bgcolor: "background.paper",
                        color: "primary.main",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        border: "2px solid",
                        borderColor: "background.paper",
                      }}
                    >
                      {userInitial}
                    </Avatar>
                  </Box>
                </Tooltip>
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

            {/* Desktop theme toggle */}

            {themeToggle}
          </Box>

          {/* ---------------- Mobile Controls ---------------- */}

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {/* Mobile theme toggle */}

            {themeToggle}

            {user && (
              <>
                <Avatar
                  onClick={handleMenuOpen}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.main",
                    color: "#fff",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "2px solid",
                    borderColor: "background.paper",
                    outline: "2px solid",
                    outlineColor: "primary.main",
                  }}
                >
                  {userInitial}
                </Avatar>

                <IconButton
                  onClick={handleDrawerToggle}
                  aria-label="open menu"
                  sx={{
                    color: "text.primary",
                    borderRadius: "10px",
                    p: 1,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
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
        ModalProps={{
          keepMounted: true,
        }}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: "background.paper",
              color: "text.primary",
              borderLeft: 1,
              borderColor: "divider",
              backdropFilter: "saturate(180%) blur(20px)",
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
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
            }}
          >
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
              <AutoStoriesIcon
                sx={{
                  color: "#fff",
                  fontSize: 18,
                }}
              />
            </Box>

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.1rem",
                letterSpacing: "-0.5px",
                color: "text.primary",
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
              color: "text.secondary",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "action.hover",
                color: "primary.main",
              },
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
              <MenuBookIcon
                sx={{
                  fontSize: 20,
                  color: "primary.main",
                }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Home"
              slotProps={{
                primary: {
                  sx: {
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  },
                },
              }}
            />
          </ListItemButton>

          {user?.role === "ADMIN" &&
            adminItems.map((item) => (
              <ListItemButton
                key={item.href}
                component="a"
                href={item.href}
                onClick={handleDrawerToggle}
                sx={drawerItemSx}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Box
                    sx={{
                      color: "primary.main",
                      display: "flex",
                    }}
                  >
                    {item.icon}
                  </Box>
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      },
                    },
                  }}
                />
              </ListItemButton>
            ))}

          {/* Theme toggle in drawer */}

          <Divider sx={{ my: 1, borderColor: "divider" }} />

          <ListItemButton onClick={toggleTheme} sx={drawerItemSx}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              {isDark ? (
                <LightModeIcon
                  sx={{
                    color: "primary.main",
                    fontSize: 20,
                  }}
                />
              ) : (
                <DarkModeIcon
                  sx={{
                    color: "primary.main",
                    fontSize: 20,
                  }}
                />
              )}
            </ListItemIcon>

            <ListItemText
              primary={isDark ? "Light Mode" : "Dark Mode"}
              slotProps={{
                primary: {
                  sx: {
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  },
                },
              }}
            />
          </ListItemButton>

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

      {/* ---------------- Avatar dropdown menu ---------------- */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: "14px",
              backgroundColor: "background.paper",
              color: "text.primary",
              border: 1,
              borderColor: "divider",
              boxShadow: isDark
                ? "0 12px 32px rgba(0,0,0,0.35)"
                : "0 12px 32px -12px rgba(99, 102, 241, 0.35), 0 4px 12px -6px rgba(139, 92, 246, 0.2)",
            },
          },
        }}
      >
        {/* Header: name and email */}

        {user && (
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "text.primary",
                letterSpacing: "-0.2px",
                lineHeight: 1.3,
              }}
            >
              {[user.firstName, user.lastName].filter(Boolean).join(" ") ||
                "User"}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.78rem",
                color: "text.secondary",
                fontWeight: 500,
                mt: 0.25,
                wordBreak: "break-word",
              }}
            >
              {user.email}
            </Typography>
          </Box>
        )}

        <Divider sx={{ borderColor: "divider" }} />

        {/* Profile */}

        {user?.role !== "ADMIN" && (
          <MenuItem
            component="a"
            href="/profile"
            onClick={handleMenuClose}
            sx={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "text.primary",
              py: 1.2,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <PersonIcon
              sx={{
                fontSize: 18,
                mr: 1.25,
                color: "primary.main",
              }}
            />
            Profile
          </MenuItem>
        )}

        {/* Logout */}

        {user && (
          <MenuItem
            onClick={() => {
              handleMenuClose();
              logout();
            }}
            sx={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "error.main",
              py: 1.2,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <LogoutIcon
              sx={{
                fontSize: 18,
                mr: 1.25,
                color: "error.main",
              }}
            />
            Logout
          </MenuItem>
        )}
      </Menu>
    </AppBar>
  );
}

// ---------------- Shared drawer item style ----------------

const drawerItemSx = {
  borderRadius: "12px",
  mb: 0.5,
  px: 1.5,
  py: 1.2,
  color: "text.primary",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "action.hover",
    color: "primary.main",
  },

  "& .MuiListItemIcon-root": {
    color: "inherit",
  },
};

export default Navbar;
