import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { forgotPassword } from "../../../services/auth";
import { toast } from "react-toastify";
import type { ApiError } from "../../../types/Error";

import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await forgotPassword(email);
      if (response.data.success) {
        toast.success("Reset link sent to your email");
        setEmail("");
      }
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  // ---- Design tokens ----
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      transition: "box-shadow 0.2s ease, background-color 0.2s ease",
      "& fieldset": { borderColor: "rgba(15, 23, 42, 0.10)" },
      "&:hover fieldset": { borderColor: "rgba(99, 102, 241, 0.35)" },
      "&.Mui-focused": { boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.14)" },
      "&.Mui-focused fieldset": {
        borderColor: "#6366f1",
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#64748b",
      fontWeight: 500,
      "&.Mui-focused": { color: "#4f46e5", fontWeight: 600 },
    },
    "& .MuiInputBase-input": { fontWeight: 500, color: "#0f172a" },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 8 },
        background:
          "radial-gradient(1000px 500px at 10% -10%, rgba(99,102,241,0.12), transparent 60%), " +
          "radial-gradient(900px 450px at 110% 0%, rgba(236,72,153,0.10), transparent 60%), " +
          "#fafaff",
      }}
    >
      <Container maxWidth="sm">
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
          {/* Brand mark + heading */}
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
                color: "#0f172a",
                mb: 0.75,
                fontSize: { xs: "1.6rem", sm: "1.85rem" },
              }}
            >
              Forgot password?
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.92rem" }}
            >
              Enter your email and we&apos;ll send you a link to reset it
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 2.25 }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="email"
              sx={inputSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailOutlinedIcon
                        sx={{ fontSize: 20, color: "#94a3b8" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

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
                "& .MuiButton-endIcon": { transition: "transform 0.25s ease" },
                "&:hover .MuiButton-endIcon": { transform: "translateX(3px)" },
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Send reset link"
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
                color: "#4f46e5",
                fontSize: "0.88rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "color 0.2s ease",
                "&:hover": { color: "#8b5cf6" },
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

export default ForgottenPassword;
