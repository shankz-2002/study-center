
import { Box, Typography, useTheme } from "@mui/material";
import type { UserTopicCompletion } from "../../types/Topic";

import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

interface TopicCompletionProps {
  completion: UserTopicCompletion;
}

function TopicCompletion({ completion }: TopicCompletionProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  const completedDate = new Date(completion.completedAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const colors = {
    card: theme.palette.background.paper,
    text: theme.palette.text.primary,
    secondaryText: theme.palette.text.secondary,
    border: theme.palette.divider,
    tileBackground: isDark
      ? "rgba(255,255,255,0.04)"
      : "rgba(15,23,42,0.03)",
    accentBackground: isDark
      ? "rgba(99,102,241,0.13)"
      : "rgba(99,102,241,0.06)",
    accentBorder: isDark
      ? "rgba(129,140,248,0.25)"
      : "rgba(99,102,241,0.18)",
    green: theme.palette.success.main,
    accent: theme.palette.primary.main,
  };

  return (
    <Box
      sx={{
        position: "relative",
        mt: 5,
        borderRadius: "24px",
        background: colors.card,
        border: `1px solid ${colors.border}`,
        boxShadow: theme.shadows[isDark ? 6 : 3],
        overflow: "hidden",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: brandGradient,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: { xs: 3, md: 3.5 },
          pb: { xs: 2, md: 2.5 },
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            flexShrink: 0,
            borderRadius: "16px",
            background: brandGradient,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            boxShadow: "0 8px 20px rgba(99,102,241,0.3)",
          }}
        >
          <EmojiEventsOutlinedIcon sx={{ fontSize: 28 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.7px",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: colors.text,
              lineHeight: 1.2,
            }}
          >
            Topic Completed
          </Typography>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              mt: 0.5,
              color: colors.green,
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.4px",
              textTransform: "uppercase",
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: 15 }} />
            Well done
          </Box>
        </Box>
      </Box>

      {/* Stats grid */}
      <Box
        sx={{
          px: { xs: 3, md: 3.5 },
          pb: { xs: 3, md: 3.5 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 1.5,
        }}
      >
        <StatBox
          label="Overall score"
          value={`${completion.totalScore} / ${completion.totalPossibleScore}`}
          colors={colors}
        />

        <StatBox
          label="Overall percentage"
          value={`${completion.percentage}%`}
          accent
          colors={colors}
          gradient={brandGradient}
        />

        <StatBox
          label="Levels completed"
          value={`${completion.completedLevels} / ${completion.totalLevels}`}
          colors={colors}
        />

        {/* Completion date */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            borderRadius: "14px",
            background: colors.accentBackground,
            border: `1px solid ${colors.accentBorder}`,
            px: 2,
            py: 1.5,
          }}
        >
          <CalendarTodayOutlinedIcon
            sx={{
              fontSize: 18,
              color: colors.accent,
              flexShrink: 0,
            }}
          />

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                color: colors.accent,
                mb: 0.25,
              }}
            >
              Completed on
            </Typography>

            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: colors.text,
                letterSpacing: "-0.2px",
              }}
            >
              {completedDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

interface StatBoxProps {
  label: string;
  value: string;
  accent?: boolean;
  colors: {
    text: string;
    secondaryText: string;
    border: string;
    tileBackground: string;
    accentBackground: string;
    accentBorder: string;
    accent: string;
  };
  gradient?: string;
}

function StatBox({
  label,
  value,
  accent,
  colors,
  gradient,
}: StatBoxProps) {
  return (
    <Box
      sx={{
        borderRadius: "14px",
        background: accent
          ? colors.accentBackground
          : colors.tileBackground,
        border: `1px solid ${
          accent ? colors.accentBorder : colors.border
        }`,
        px: 2,
        py: 1.5,
      }}
    >
      <Typography
        sx={{
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.4px",
          textTransform: "uppercase",
          color: accent ? colors.accent : colors.secondaryText,
          mb: 0.25,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "1.15rem", md: "1.3rem" },
          fontWeight: 800,
          letterSpacing: "-0.5px",
          color: accent ? "transparent" : colors.text,
          background: accent ? gradient : "none",
          backgroundClip: accent ? "text" : "unset",
          WebkitBackgroundClip: accent ? "text" : "unset",
          WebkitTextFillColor: accent ? "transparent" : "unset",
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default TopicCompletion;
