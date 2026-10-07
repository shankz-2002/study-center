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
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  const userInitial =
    user?.firstName?.charAt(0)?.toUpperCase() ||
    user?.firstName?.charAt(0)?.toUpperCase() ||
    "U";

  // ---- Design tokens ----
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)"; // indigo → violet → pink
  const navTextColor = "#334155"; // slate-700
  const navHoverBg = "rgba(99, 102, 241, 0.08)"; // indigo tint
  const navHoverColor = "#4f46e5"; // indigo-600

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

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        // Frosted glass over a warm off-white page
        backgroundColor: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        color: "#0f172a",
        borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
        boxShadow:
          "0 1px 0 rgba(15, 23, 42, 0.02), 0 8px 24px -12px rgba(99, 102, 241, 0.12)",
        // Subtle top accent line — adds that modern "branded" feel
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
            minHeight: 76,
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
            {/* Brand mark */}
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "12px",
                background: brandGradient,
                display: "grid",
                placeItems: "center",
                boxShadow:
                  "0 6px 16px -6px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              <AutoStoriesIcon sx={{ color: "#fff", fontSize: 20 }} />
            </Box>

            {/* Wordmark */}
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.25 }}>
              <Typography
                component="span"
                sx={{
                  fontWeight: 800,
                  fontSize: "1.4rem",
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
                  fontSize: "1.4rem",
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

          {/* ---------------- Navigation ---------------- */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Button
              href="/home"
              startIcon={<MenuBookIcon sx={{ fontSize: 18 }} />}
              sx={navButtonSx}
            >
              Home
            </Button>

            {user ? (
              user.role === "ADMIN" ? (
                // Admin navbar
                <>
                  <Button href="/admin/dashboard" sx={navButtonSx}>
                    Admin Dashboard
                  </Button>

                  <Tooltip title="Logout" arrow>
                    <IconButton onClick={logout}>
                      <LogoutIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                  <Button href="/admin/field">

                  </Button>
                </>
              ) : (
                // Normal user navbar
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
                    <IconButton onClick={logout}>
                      <LogoutIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                </>
              )
            ) : (
              // Logged-out navbar
              <Button
                href="/login"
                variant="contained"
                disableElevation
                sx={{
                  ml: 1,
                  background: brandGradient,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "12px",
                  px: 3,
                  py: 1.1,
                  color: "#fff",
                }}
              >
                Get Started
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
