import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  formData: {
    firstName: string;
    lastName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  loading: boolean;
}

function EditProfileModal({
  open,
  onClose,
  formData,
  onChange,
  onSave,
  loading,
}: EditProfileModalProps) {
  // ---- Design tokens (match the rest of the app) ----
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
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            position: "relative",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            border: "1px solid rgba(15, 23, 42, 0.06)",
            boxShadow:
              "0 30px 60px -30px rgba(99, 102, 241, 0.4), 0 10px 24px -12px rgba(139, 92, 246, 0.25)",
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
          },
        },
        backdrop: {
          sx: {
            backgroundColor: "rgba(15, 23, 42, 0.35)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          },
        },
      }}
    >
      {/* ---------------- Title ---------------- */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          pr: 6, // room for the close button
          pt: 3,
          pb: 1.5,
          px: 3,
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "12px",
            background: brandGradient,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            flexShrink: 0,
            boxShadow:
              "0 10px 20px -8px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
          }}
        >
          <EditOutlinedIcon sx={{ fontSize: 22 }} />
        </Box>

        <Box>
          <Typography
            component="div"
            sx={{
              fontWeight: 800,
              fontSize: "1.2rem",
              letterSpacing: "-0.4px",
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            Edit profile
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: "0.82rem",
              color: "#64748b",
              fontWeight: 500,
              mt: 0.25,
            }}
          >
            Update your name and save
          </Typography>
        </Box>

        {/* Close button */}
        <IconButton
          onClick={onClose}
          disabled={loading}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#64748b",
            borderRadius: "10px",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(99, 102, 241, 0.08)",
              color: "#4f46e5",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      {/* ---------------- Content ---------------- */}
      <DialogContent sx={{ px: 3, pt: 1, pb: 2 }}>
        <TextField
          margin="normal"
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          disabled={loading}
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
          margin="normal"
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          disabled={loading}
          autoComplete="family-name"
          sx={{ ...inputSx, mt: 2 }}
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
      </DialogContent>

      {/* ---------------- Actions ---------------- */}
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 1,
          gap: 1,
          borderTop: "1px solid rgba(15, 23, 42, 0.06)",
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          disableElevation
          sx={{
            borderRadius: "12px",
            px: 2.5,
            py: 1,
            fontWeight: 600,
            fontSize: "0.9rem",
            textTransform: "none",
            color: "#64748b",
            "&:hover": {
              backgroundColor: "rgba(15, 23, 42, 0.04)",
              color: "#334155",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onSave}
          variant="contained"
          disabled={loading}
          disableElevation
          sx={{
            borderRadius: "12px",
            px: 3,
            py: 1,
            fontWeight: 700,
            fontSize: "0.9rem",
            letterSpacing: "-0.1px",
            textTransform: "none",
            background: brandGradient,
            backgroundSize: "200% 200%",
            color: "#fff",
            boxShadow:
              "0 10px 20px -8px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundPosition: "100% 50%",
              boxShadow:
                "0 14px 28px -8px rgba(139, 92, 246, 0.85), inset 0 1px 0 rgba(255,255,255,0.3)",
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: "linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 100%)",
              color: "#fff",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Save changes"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfileModal;