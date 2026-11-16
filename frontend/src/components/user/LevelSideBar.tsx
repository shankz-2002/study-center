
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
  useTheme,
} from "@mui/material";

import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import type { LevelSideBarProps } from "../../types/Level";

function LevelSideBar({
  levels,
  selectedLevel,
  onSelectLevel,
}: LevelSideBarProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  const brandSoft = isDark
    ? "rgba(129, 140, 248, 0.16)"
    : "rgba(99, 102, 241, 0.10)";

  const brandBorder = isDark
    ? "rgba(129, 140, 248, 0.25)"
    : "rgba(99, 102, 241, 0.18)";

  return (
    <Box sx={{ width: "100%", p: { xs: 2, md: 2.5 } }}>
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
              color: theme.palette.text.primary,
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
              color: theme.palette.primary.main,
              backgroundColor: brandSoft,
              border: `1px solid ${brandBorder}`,
              borderRadius: "8px",
              "& .MuiChip-label": { px: 0.75 },
            }}
          />
        </Box>
      </Box>

      <List
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        {levels.map((level) => {
          const isActive = selectedLevel?.id === level.id;
          const isLocked = !level.isUnlocked;
          const isCompleted = level.isCompleted;

          return (
            <ListItemButton
              key={level.id}
              selected={isActive}
              disabled={isLocked}
              onClick={() => onSelectLevel(level)}
              sx={{
                position: "relative",
                borderRadius: "14px",
                px: 1.5,
                py: 1.25,
                border: "1px solid transparent",
                transition: "all 0.22s ease",
                backgroundColor: isActive ? brandSoft : "transparent",
                borderColor: isActive ? brandBorder : "transparent",

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
                    ? isDark
                      ? "rgba(129, 140, 248, 0.22)"
                      : "rgba(99, 102, 241, 0.12)"
                    : isDark
                      ? "rgba(129, 140, 248, 0.10)"
                      : "rgba(99, 102, 241, 0.05)",
                  borderColor: isActive
                    ? isDark
                      ? "rgba(129, 140, 248, 0.35)"
                      : "rgba(99, 102, 241, 0.30)"
                    : brandBorder,
                  "&::before": { opacity: 1 },
                  "& .level-number": {
                    background: brandGradient,
                    color: "#fff",
                  },
                },

                "&.Mui-selected": {
                  backgroundColor: brandSoft,
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(129, 140, 248, 0.22)"
                      : "rgba(99, 102, 241, 0.12)",
                  },
                },

                "&.Mui-disabled": {
                  opacity: 0.55,
                  cursor: "not-allowed",
                },

                "&.Mui-focusVisible": {
                  outline: "none",
                  boxShadow: isDark
                    ? "0 0 0 3px rgba(129, 140, 248, 0.22)"
                    : "0 0 0 3px rgba(99, 102, 241, 0.18)",
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
                  color: isActive ? "#fff" : theme.palette.primary.main,
                  background: isActive ? brandGradient : brandSoft,
                  border: isActive
                    ? "1px solid rgba(99, 102, 241, 0.35)"
                    : `1px solid ${brandBorder}`,
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
                      color: theme.palette.text.primary,
                      lineHeight: 1.3,
                      mb: 0.25,
                    },
                  },
                  secondary: {
                    sx: {
                      fontSize: "0.78rem",
                      color: theme.palette.text.secondary,
                      lineHeight: 1.45,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    },
                  },
                }}
              />

              {isCompleted ? (
                <CheckCircleRoundedIcon
                  sx={{
                    fontSize: 19,
                    color: "success.main",
                    ml: 1,
                    flexShrink: 0,
                  }}
                />
              ) : isLocked ? (
                <LockOutlinedIcon
                  sx={{
                    fontSize: 18,
                    color: "text.disabled",
                    ml: 1,
                    flexShrink: 0,
                  }}
                />
              ) : isActive ? (
                <CheckCircleRoundedIcon
                  sx={{
                    fontSize: 18,
                    color: theme.palette.primary.main,
                    ml: 1,
                    flexShrink: 0,
                  }}
                />
              ) : null}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export default LevelSideBar;
