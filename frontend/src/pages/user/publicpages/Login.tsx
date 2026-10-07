import { useState } from "react";
import { loginApi } from "../../../services/auth";
import { useAuth } from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import type { ApiError } from "../../../types/Error";
import { toast } from "react-toastify";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginApi(form);

      if (response.data.success) {
        toast.success("Login successful");
        login(response.data.result.user, response.data.result.accessToken);
        if (response?.data.result.user.role == "ADMIN") {
          navigate("/admin/dashboard");
        } else if (response?.data.result.user.role == "USER") {
          navigate("/home");
        }
      }
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // ---- Design tokens (match Navbar + Home) ----
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  // Shared input styling — soft, rounded, indigo focus
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      transition: "box-shadow 0.2s ease, background-color 0.2s ease",
      "& fieldset": {
        borderColor: "rgba(15, 23, 42, 0.10)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(99, 102, 241, 0.35)",
      },
      "&.Mui-focused": {
        boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.14)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6366f1",
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#64748b",
      fontWeight: 500,
      "&.Mui-focused": {
        color: "#4f46e5",
        fontWeight: 600,
      },
    },
    "& .MuiInputBase-input": {
      fontWeight: 500,
      color: "#0f172a",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 8 },
        // Matches Home's ambient gradient backdrop
        background:
          "radial-gradient(1000px 500px at 10% -10%, rgba(99,102,241,0.12), transparent 60%), " +
          "radial-gradient(900px 450px at 110% 0%, rgba(236,72,153,0.10), transparent 60%), " +
          "#fafaff",
      }}
    >
      <Container maxWidth="sm">
        {/* ---------------- Card ---------------- */}
        <Box
          sx={{
            position: "relative",
            maxWidth: 460,
            mx: "auto",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            border: "1px solid rgba(15, 23, 42, 0.06)",
            boxShadow:
              "0 30px 60px -30px rgba(99, 102, 241, 0.35), 0 10px 24px -12px rgba(139, 92, 246, 0.20)",
            overflow: "hidden",
            p: { xs: 3.5, sm: 4.5 },
            // Top gradient accent line
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
          {/* ---------------- Brand mark + heading ---------------- */}
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
                color: "#0f172a",
                mb: 0.75,
                fontSize: { xs: "1.6rem", sm: "1.85rem" },
              }}
            >
              Welcome back
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                fontWeight: 500,
                fontSize: "0.92rem",
              }}
            >
              Login to continue your learning journey
            </Typography>
          </Box>

          {/* ---------------- Form ---------------- */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.25,
            }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="email"
              sx={inputSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon
                        sx={{ fontSize: 20, color: "#94a3b8" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="current-password"
              sx={inputSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon
                        sx={{ fontSize: 20, color: "#94a3b8" }}
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
                          color: "#94a3b8",
                          "&:hover": { color: "#4f46e5" },
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

            {/* Forgot password link */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}>
              <Typography
                component="a"
                href="/forgot-password"
                sx={{
                  fontSize: "0.83rem",
                  fontWeight: 600,
                  color: "#4f46e5",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#8b5cf6" },
                }}
              >
                Forgot password?
              </Typography>
            </Box>

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
                  background:
                    "linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 100%)",
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
                "Login"
              )}
            </Button>

            {/* Divider */}
            <Divider
              sx={{
                my: 1,
                color: "#94a3b8",
                fontSize: "0.78rem",
                fontWeight: 500,
                "&::before, &::after": {
                  borderColor: "rgba(15, 23, 42, 0.08)",
                },
              }}
            >
              OR
            </Divider>

            {/* Signup prompt */}
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "0.9rem",
              }}
            >
              Don&apos;t have an account?{" "}
              <Box
                component="a"
                href="/register"
                sx={{
                  fontWeight: 700,
                  color: "#4f46e5",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: "#8b5cf6",
                    textDecoration: "underline",
                  },
                }}
              >
                Sign up
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
