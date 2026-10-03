// import {
//   Button,
//   CircularProgress,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import { registerApi } from "../../services/auth";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import type { ApiError } from "../../types/Error";

// function Register() {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       if (form.password !== form.confirmPassword) {
//         toast.error("passwords do not match");
//       } else {
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         const { confirmPassword: _, ...newForm } = form;

//         const response = await registerApi(newForm);

//         if (response.data.success) {
//           toast.success("Registration successful");
//           navigate("/login");
//         }
//       }
//     } catch (error) {
//       const err=error as ApiError
//       toast.error(err?.data?.message || "Registration Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div
//       style={{
//         minHeight: "90vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "40px 20px",
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           width: "100%",
//           maxWidth: 500,
//           p: { xs: 3, sm: 5 },
//           borderRadius: 4,
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             textAlign: "center",
//             fontWeight: 700,
//             mb: 1,
//           }}
//         >
//           Create Account
//         </Typography>

//         <Typography
//           variant="body2"
//           sx={{
//             textAlign: "center",
//             color: "text.secondary",
//             mb: 4,
//           }}
//         >
//           Create your account and start learning
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <div
//             style={{
//               display: "flex",
//               gap: "16px",
//               marginBottom: "20px",
//             }}
//           >
//             <TextField
//               fullWidth
//               label="First Name"
//               name="firstName"
//               value={form.firstName}
//               onChange={handleChange}
//               required
//             />

//             <TextField
//               fullWidth
//               label="Last Name"
//               name="lastName"
//               value={form.lastName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2.5 }}
//           />

//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2.5 }}
//           />

//           <TextField
//             fullWidth
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             required
//             sx={{ mb: 3 }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             type="submit"
//             size="large"
//             disabled={loading}
//             sx={{
//               py: 1.4,
//               borderRadius: 2,
//               fontWeight: 600,
//               textTransform: "none",
//               fontSize: "1rem",
//             }}
//           >
//             {loading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               "Register"
//             )}
//           </Button>
//           <Typography sx={{ mt: 2 }}>
//             already have acc? <a href="/login">login</a>
//           </Typography>
//         </form>
//       </Paper>
//     </div>
//   );
// }

// export default Register;

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
} from "@mui/material";
import { useState } from "react";
import { registerApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { ApiError } from "../../types/Error";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

function Register() {
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

  // ---- Design tokens (match Navbar + Home + Login) ----
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

  // Live password match indicator
  const passwordsMatch =
    form.confirmPassword.length > 0 && form.password === form.confirmPassword;
  const passwordsMismatch =
    form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 8 },
        // Matches the ambient gradient backdrop of Home / Login
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
            maxWidth: 500,
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
              Create your account
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                fontWeight: 500,
                fontSize: "0.92rem",
              }}
            >
              Start your learning journey — it&apos;s free
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
            {/* First + Last name row */}
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
                          sx={{ fontSize: 20, color: "#94a3b8" }}
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
                          sx={{ fontSize: 20, color: "#94a3b8" }}
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
                        sx={{ fontSize: 20, color: "#94a3b8" }}
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
                        sx={{ fontSize: 20, color: "#94a3b8" }}
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
                          color: "#94a3b8",
                          "&:hover": { color: "#4f46e5" },
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
                  color: "#059669",
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
                  color: "#e11d48",
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
                "Create Account"
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

            {/* Login prompt */}
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "0.9rem",
              }}
            >
              Already have an account?{" "}
              <Box
                component="a"
                href="/login"
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
