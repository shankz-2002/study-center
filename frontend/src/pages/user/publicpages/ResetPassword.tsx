
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import type { ApiError } from "../../../types/Error";
import { toast } from "react-toastify";
import { resetPassword } from "../../../services/auth";
import { useNavigate, useParams } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ResetPassword() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [form, setForm] = useState({
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (!form.password) {
      toast.error("Password is required");
      return;
    }

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword(form.password, token);

      if (response.data.success) {
        toast.success("Password changed successfully");
        navigate("/login");
      }
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  // Theme-aware input styling
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: theme.palette.background.default,
      transition: "box-shadow 0.2s ease, background-color 0.2s ease",

      "& fieldset": {
        borderColor: theme.palette.divider,
      },

      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },

      "&.Mui-focused": {
        boxShadow: isDark
          ? "0 0 0 4px rgba(129, 140, 248, 0.16)"
          : "0 0 0 4px rgba(99, 102, 241, 0.14)",
      },

      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "1.5px",
      },
    },

    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
      fontWeight: 500,

      "&.Mui-focused": {
        color: theme.palette.primary.main,
        fontWeight: 600,
      },
    },

    "& .MuiInputBase-input": {
      fontWeight: 500,
      color: theme.palette.text.primary,
    },
  };

  const passwordsMatch =
    form.confirm.length > 0 && form.password === form.confirm;

  const passwordsMismatch =
    form.confirm.length > 0 && form.password !== form.confirm;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 8 },

        background: isDark
          ? `radial-gradient(1000px 500px at 10% -10%, rgba(99,102,241,0.16), transparent 60%),
             radial-gradient(900px 450px at 110% 0%, rgba(236,72,153,0.10), transparent 60%),
             ${theme.palette.background.default}`
          : `radial-gradient(1000px 500px at 10% -10%, rgba(99,102,241,0.12), transparent 60%),
             radial-gradient(900px 450px at 110% 0%, rgba(236,72,153,0.10), transparent 60%),
             ${theme.palette.background.default}`,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            position: "relative",
            maxWidth: 460,
            mx: "auto",
            borderRadius: "24px",

            backgroundColor: theme.palette.background.paper,
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",

            border: `1px solid ${theme.palette.divider}`,

            boxShadow: isDark
              ? "0 30px 60px -30px rgba(0, 0, 0, 0.55), 0 10px 24px -12px rgba(99, 102, 241, 0.20)"
              : "0 30px 60px -30px rgba(99, 102, 241, 0.35), 0 10px 24px -12px rgba(139, 92, 246, 0.20)",

            overflow: "hidden",
            p: { xs: 3.5, sm: 4.5 },

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
          {/* Brand mark and heading */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "16px",
                background: brandGradient,
                display: "grid",
                placeItems: "center",
                mx: "auto",
                mb: 2.5,
                boxShadow:
                  "0 12px 24px -10px rgba(99, 102, 241, 0.65), inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              <LockResetOutlinedIcon sx={{ color: "#fff", fontSize: 28 }} />
            </Box>

            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.8px",
                color: "text.primary",
                mb: 0.75,
                fontSize: { xs: "1.6rem", sm: "1.85rem" },
              }}
            >
              Reset your password
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "0.92rem",
              }}
            >
              Choose a new password for your account
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.25,
            }}
          >
            {/* New password */}
            <TextField
              label="New password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="new-password"
              sx={inputSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon
                        sx={{
                          fontSize: 20,
                          color: "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                        size="small"
                        sx={{
                          color: "text.secondary",
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Confirm password */}
            <TextField
              label="Confirm new password"
              name="confirm"
              type={showConfirm ? "text" : "password"}
              value={form.confirm}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="new-password"
              error={passwordsMismatch}
              sx={inputSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon
                        sx={{
                          fontSize: 20,
                          color: "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm((v) => !v)}
                        edge="end"
                        size="small"
                        sx={{
                          color: "text.secondary",
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                        aria-label={
                          showConfirm
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirm ? (
                          <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Password match feedback */}
            {passwordsMatch && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  mt: -1,
                  color: "success.main",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                }}
              >
                <CheckCircleRoundedIcon sx={{ fontSize: 16 }} />
                <span>Passwords match</span>
              </Box>
            )}

            {passwordsMismatch && (
              <Typography
                sx={{
                  mt: -1,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "error.main",
                }}
              >
                Passwords do not match
              </Typography>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              disableElevation
              endIcon={!loading && <ArrowForwardIcon sx={{ fontSize: 18 }} />}
              sx={{
                mt: 0.5,
                py: 1.4,
                borderRadius: "14px",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "-0.1px",
                textTransform: "none",
                background: brandGradient,
                backgroundSize: "200% 200%",
                color: "#fff",

                boxShadow:
                  "0 12px 24px -10px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.25)",

                transition: "all 0.3s ease",

                "&:hover": {
                  backgroundPosition: "100% 50%",
                  boxShadow:
                    "0 16px 32px -10px rgba(139, 92, 246, 0.85), inset 0 1px 0 rgba(255,255,255,0.3)",
                  transform: "translateY(-1px)",
                },

                "&:disabled": {
                  background: isDark
                    ? "linear-gradient(135deg, #373b68 0%, #51436f 100%)"
                    : "linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 100%)",
                  color: "#fff",
                },

                "& .MuiButton-endIcon": {
                  transition: "transform 0.25s ease",
                },

                "&:hover .MuiButton-endIcon": {
                  transform: "translateX(3px)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Reset password"
              )}
            </Button>
          </Box>

          {/* Back to login */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Box
              component="a"
              href="/login"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                color: "primary.main",
                fontSize: "0.88rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "color 0.2s ease",

                "&:hover": {
                  color: "secondary.main",
                },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 16 }} />
              Back to login
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ResetPassword;
