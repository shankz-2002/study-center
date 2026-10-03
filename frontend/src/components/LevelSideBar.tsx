import type { LevelSideBarProps } from "../types/Level";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
} from "@mui/material";

import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

function LevelSideBar({
  levels,
  selectedLevel,
  onSelectLevel,
}: LevelSideBarProps) {
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  return (
    <Box sx={{ width: "100%", p: { xs: 2, md: 2.5 } }}>
      {/* ---------------- Header ---------------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          mb: 2,
          px: 0.5,
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
            color: "#fff",
            flexShrink: 0,
            boxShadow:
              "0 8px 16px -8px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.35)",
          }}
        >
          <LayersOutlinedIcon sx={{ fontSize: 18 }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: "1.05rem",
              letterSpacing: "-0.4px",
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            Levels
          </Typography>

          <Chip
            label={levels.length}
            size="small"
            sx={{
              height: 22,
              minWidth: 22,
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "#4f46e5",
              backgroundColor: "rgba(99, 102, 241, 0.10)",
              border: "1px solid rgba(99, 102, 241, 0.18)",
              borderRadius: "8px",
              "& .MuiChip-label": { px: 0.75 },
            }}
          />
        </Box>
      </Box>

      {/* ---------------- Levels list ---------------- */}
      <List
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        {levels.map((level) => {
          const isActive = selectedLevel?.id === level.id;

          return (
            <ListItemButton
              key={level.id}
              selected={isActive}
              onClick={() => onSelectLevel(level)}
              sx={{
                position: "relative",
                borderRadius: "14px",
                px: 1.5,
                py: 1.25,
                border: "1px solid transparent",
                transition: "all 0.22s ease",
                backgroundColor: isActive
                  ? "rgba(99, 102, 241, 0.08)"
                  : "transparent",
                borderColor: isActive
                  ? "rgba(99, 102, 241, 0.25)"
                  : "transparent",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "20%",
                  bottom: "20%",
                  width: "3px",
                  borderRadius: "999px",
                  background: brandGradient,
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.22s ease",
                },
                "&:hover": {
                  backgroundColor: isActive
                    ? "rgba(99, 102, 241, 0.12)"
                    : "rgba(99, 102, 241, 0.05)",
                  borderColor: isActive
                    ? "rgba(99, 102, 241, 0.30)"
                    : "rgba(99, 102, 241, 0.15)",
                  "&::before": { opacity: 1 },
                  "& .level-number": {
                    background: brandGradient,
                    color: "#fff",
                    boxShadow:
                      "0 6px 14px -6px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.35)",
                  },
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(99, 102, 241, 0.08)",
                  "&:hover": {
                    backgroundColor: "rgba(99, 102, 241, 0.12)",
                  },
                },
                "&.Mui-focusVisible": {
                  outline: "none",
                  boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.18)",
                },
              }}
            >
              <Box
                className="level-number"
                sx={{
                  width: 34,
                  height: 34,
                  flexShrink: 0,
                  mr: 1.5,
                  borderRadius: "10px",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "-0.3px",
                  color: isActive ? "#fff" : "#6366f1",
                  background: isActive
                    ? brandGradient
                    : "rgba(99, 102, 241, 0.10)",
                  border: isActive
                    ? "1px solid rgba(99, 102, 241, 0.35)"
                    : "1px solid rgba(99, 102, 241, 0.15)",
                  boxShadow: isActive
                    ? "0 6px 14px -6px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.35)"
                    : "none",
                  transition: "all 0.22s ease",
                }}
              >
                {level.order}
              </Box>

              <ListItemText
                primary={level.levelName}
                secondary={level.description}
                sx={{ m: 0 }}
                slotProps={{
                  primary: {
                    sx: {
                      fontWeight: isActive ? 700 : 600,
                      fontSize: "0.92rem",
                      letterSpacing: "-0.2px",
                      color: isActive ? "#1e1b4b" : "#0f172a",
                      lineHeight: 1.3,
                      mb: 0.25,
                    },
                  },
                  secondary: {
                    sx: {
                      fontSize: "0.78rem",
                      color: "#64748b",
                      lineHeight: 1.45,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    },
                  },
                }}
              />

              {isActive && (
                <CheckCircleRoundedIcon
                  sx={{
                    fontSize: 18,
                    color: "#6366f1",
                    ml: 1,
                    flexShrink: 0,
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export default LevelSideBar;
