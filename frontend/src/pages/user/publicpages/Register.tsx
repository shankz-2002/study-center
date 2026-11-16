
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { registerApi } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { ApiError } from "../../../types/Error";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

function Register() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword: _, ...newForm } = form;

        const response = await registerApi(newForm);

        if (response.data.success) {
          toast.success("Registration successful");
          navigate("/login");
        }
      }
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const passwordsMismatch =
    form.confirmPassword.length > 0 &&
    form.password !== form.confirmPassword;

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
        {/* Card */}
        <Box
          sx={{
            position: "relative",
            maxWidth: 500,
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
              <AutoStoriesIcon sx={{ color: "#fff", fontSize: 28 }} />
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
              Create your account
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "0.92rem",
              }}
            >
              Start your learning journey — it&apos;s free
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
            {/* First and Last name */}
            <Box
              sx={{
                display: "flex",
                gap: 1.75,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
                sx={inputSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon
                          sx={{
                            fontSize: 20,
                            color: "text.secondary",
                          }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
                sx={inputSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon
                          sx={{
                            fontSize: 20,
                            color: "text.secondary",
                          }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              sx={inputSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailOutlinedIcon
                        sx={{
                          fontSize: 20,
                          color: "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Password */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
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
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
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
              fullWidth
              variant="contained"
              type="submit"
              size="large"
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
                "Create Account"
              )}
            </Button>

            {/* Divider */}
            <Divider
              sx={{
                my: 1,
                color: "text.secondary",
                fontSize: "0.78rem",
                fontWeight: 500,

                "&::before, &::after": {
                  borderColor: "divider",
                },
              }}
            >
              OR
            </Divider>

            {/* Login prompt */}
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                fontSize: "0.9rem",
              }}
            >
              Already have an account?{" "}
              <Box
                component="a"
                href="/login"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  textDecoration: "none",
                  transition: "color 0.2s ease",

                  "&:hover": {
                    color: "secondary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                Login
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Register;
