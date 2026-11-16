
import { useEffect, useState } from "react";
import type { ApiError } from "../../../types/Error";
import type { User } from "../../../types/User";
import { getUserDetails, updateUserDetails } from "../../../services/auth";
import { toast } from "react-toastify";
import EditProfileModal from "../../../components/user/EditProfileModal";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Avatar,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await getUserDetails();
        setUser(response.data.user);
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.data?.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (!user) return;

    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
    });

    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await updateUserDetails(formData);
      setUser(response.data.user);
      setOpenModal(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ---- Design tokens ----
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  const brandGradientSoft = isDark
    ? "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.18) 50%, rgba(236,72,153,0.16) 100%)"
    : "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.12) 50%, rgba(236,72,153,0.12) 100%)";

  const pageBackground = isDark
    ? `radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,0.16), transparent 60%),
       radial-gradient(1000px 500px at 110% 0%, rgba(236,72,153,0.12), transparent 60%),
       ${theme.palette.background.default}`
    : `radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,0.10), transparent 60%),
       radial-gradient(1000px 500px at 110% 0%, rgba(236,72,153,0.08), transparent 60%),
       ${theme.palette.background.default}`;

  const cardBackground = theme.palette.background.paper;
  const cardBorder = theme.palette.divider;

  const cardShadow = isDark
    ? "0 30px 60px -30px rgba(0, 0, 0, 0.65), 0 10px 24px -12px rgba(99, 102, 241, 0.18)"
    : "0 30px 60px -30px rgba(99, 102, 241, 0.35), 0 10px 24px -12px rgba(139, 92, 246, 0.2)";

  /* ---------------- Loading ---------------- */
  if (loading && !user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          background: pageBackground,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            size={56}
            thickness={4}
            sx={{
              color: theme.palette.primary.main,
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
            }}
          >
            <AutoStoriesIcon
              sx={{
                fontSize: 22,
                color: theme.palette.secondary.main,
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          Loading profile…
        </Typography>
      </Box>
    );
  }

  /* ---------------- Empty / error ---------------- */
  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          background: pageBackground,
        }}
      >
        <Box sx={{ textAlign: "center", maxWidth: 460 }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "20px",
              background: brandGradientSoft,
              color: theme.palette.secondary.main,
              display: "grid",
              placeItems: "center",
              mx: "auto",
              mb: 2.5,
            }}
          >
            <FolderOpenOutlinedIcon sx={{ fontSize: 34 }} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1,
              letterSpacing: "-0.3px",
            }}
          >
            Unable to load profile
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.65,
            }}
          >
            Something went wrong while fetching your details. Please try again
            later.
          </Typography>
        </Box>
      </Box>
    );
  }

  const userInitial =
    user.firstName?.charAt(0)?.toUpperCase() ||
    user.lastName?.charAt(0)?.toUpperCase() ||
    "U";

  const fullName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ");

  /* ---------------- Main layout ---------------- */
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: pageBackground,
        pt: { xs: 4, md: 6 },
        pb: { xs: 8, md: 10 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="md" disableGutters>
        {/* ---------------- Header ---------------- */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-1.2px",
              fontSize: { xs: "1.9rem", md: "2.4rem" },
              color: theme.palette.text.primary,
              lineHeight: 1.15,
              mb: 0.75,
            }}
          >
            My profile
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: "0.95rem", md: "1rem" },
            }}
          >
            Manage your personal information
          </Typography>
        </Box>

        {/* ---------------- Profile card ---------------- */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "24px",
            background: cardBackground,
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            border: `1px solid ${cardBorder}`,
            boxShadow: cardShadow,
            overflow: "hidden",

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: brandGradient,
            },
          }}
        >
          {/* ----- Hero ----- */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, md: 3 },
              flexDirection: { xs: "column", sm: "row" },
              textAlign: { xs: "center", sm: "left" },
              p: { xs: 3, md: 4 },
              pb: { xs: 2.5, md: 3 },
            }}
          >
            {/* Avatar */}
            <Box
              sx={{
                p: "3px",
                borderRadius: "50%",
                background: brandGradient,
                flexShrink: 0,
                boxShadow:
                  "0 14px 28px -10px rgba(99, 102, 241, 0.65), 0 4px 12px -4px rgba(139, 92, 246, 0.35)",
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 72, md: 88 },
                  height: { xs: 72, md: 88 },
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                  fontSize: { xs: "1.6rem", md: "2rem" },
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  border: `3px solid ${theme.palette.background.paper}`,
                }}
              >
                {userInitial}
              </Avatar>
            </Box>

            {/* Name + email */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.6px",
                  color: theme.palette.text.primary,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {fullName || "Your profile"}
              </Typography>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  color: theme.palette.text.secondary,
                  fontSize: "0.9rem",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <EmailOutlinedIcon
                  sx={{
                    fontSize: 16,
                    color: theme.palette.text.disabled,
                  }}
                />
                {user.email}
              </Box>
            </Box>

            {/* Edit button desktop */}
            <Button
              onClick={handleEdit}
              variant="contained"
              disableElevation
              startIcon={<EditOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                borderRadius: "12px",
                px: 2.5,
                py: 1.1,
                fontWeight: 700,
                fontSize: "0.88rem",
                textTransform: "none",
                background: brandGradient,
                backgroundSize: "200% 200%",
                color: "#fff",
                boxShadow:
                  "0 10px 22px -10px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
                transition: "all 0.3s ease",

                "&:hover": {
                  backgroundPosition: "100% 50%",
                  boxShadow:
                    "0 14px 30px -10px rgba(139, 92, 246, 0.85), inset 0 1px 0 rgba(255,255,255,0.3)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Edit profile
            </Button>
          </Box>

          {/* Edit button mobile */}
          <Box sx={{ display: { xs: "block", sm: "none" }, px: 3, pb: 3 }}>
            <Button
              onClick={handleEdit}
              variant="contained"
              fullWidth
              disableElevation
              startIcon={<EditOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{
                borderRadius: "12px",
                py: 1.2,
                fontWeight: 700,
                fontSize: "0.9rem",
                textTransform: "none",
                background: brandGradient,
                color: "#fff",
                boxShadow:
                  "0 10px 22px -10px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              Edit profile
            </Button>
          </Box>

          <Divider sx={{ borderColor: theme.palette.divider }} />

          {/* ----- Details list ----- */}
          <Box sx={{ p: { xs: 3, md: 4 }, pt: { xs: 2.5, md: 3 } }}>
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                color: theme.palette.text.secondary,
                mb: 2,
              }}
            >
              Personal information
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <InfoRow
                icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />}
                label="First name"
                value={user.firstName || "—"}
              />

              <InfoRow
                icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />}
                label="Last name"
                value={user.lastName || "—"}
              />

              <InfoRow
                icon={<EmailOutlinedIcon sx={{ fontSize: 18 }} />}
                label="Email"
                value={user.email}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* ---------------- Edit Modal ---------------- */}
      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        onChange={handleChange}
        onSave={handleSave}
        loading={loading}
      />
    </Box>
  );
}

/* ---------------- Reusable info row ---------------- */
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  capitalize?: boolean;
}

function InfoRow({ icon, label, value, capitalize }: InfoRowProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        borderRadius: "14px",
        backgroundColor: isDark
          ? "rgba(148, 163, 184, 0.07)"
          : "rgba(15, 23, 42, 0.03)",
        border: `1px solid ${theme.palette.divider}`,
        px: 2,
        py: 1.5,
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "10px",
          backgroundColor: isDark
            ? "rgba(129, 140, 248, 0.16)"
            : "rgba(99, 102, 241, 0.10)",
          border: isDark
            ? "1px solid rgba(129, 140, 248, 0.25)"
            : "1px solid rgba(99, 102, 241, 0.15)",
          color: theme.palette.primary.main,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.3px",
            textTransform: "uppercase",
            color: theme.palette.text.secondary,
            mb: 0.15,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: theme.palette.text.primary,
            letterSpacing: "-0.2px",
            textTransform: capitalize ? "capitalize" : "none",
            wordBreak: "break-word",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export default Profile;
