import { Box, Typography } from "@mui/material";
import type { UserTopicCompletion } from "../../types/Topic";

import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

interface TopicCompletionProps {
  completion: UserTopicCompletion;
}

function TopicCompletion({ completion }: TopicCompletionProps) {
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  // Format the completion date nicely
  const completedDate = new Date(completion.completedAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Box
      sx={{
        position: "relative",
        mt: 5,
        borderRadius: "24px",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        border: "1px solid rgba(99, 102, 241, 0.18)",
        boxShadow:
          "0 30px 60px -30px rgba(99, 102, 241, 0.4), 0 10px 24px -12px rgba(139, 92, 246, 0.2)",
        overflow: "hidden",
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
      {/* ---------------- Header ---------------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: { xs: 3, md: 3.5 },
          pb: { xs: 2, md: 2.5 },
        }}
      >
        {/* Trophy bubble */}
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
            boxShadow:
              "0 14px 28px -10px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.35)",
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
              color: "#0f172a",
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
              color: "#16a34a",
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

      {/* ---------------- Stats grid ---------------- */}
      <Box
        sx={{
          px: { xs: 3, md: 3.5 },
          pb: { xs: 3, md: 3.5 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 1.5,
        }}
      >
        {/* Score */}
        <StatBox
          label="Overall score"
          value={`${completion.totalScore} / ${completion.totalPossibleScore}`}
        />

        {/* Percentage */}
        <StatBox
          label="Overall percentage"
          value={`${completion.percentage}%`}
          accent
        />

        {/* Levels completed */}
        <StatBox
          label="Levels completed"
          value={`${completion.completedLevels} / ${completion.totalLevels}`}
        />

        {/* Date — takes full width on mobile, shares row on desktop */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            borderRadius: "14px",
            background: "rgba(99, 102, 241, 0.06)",
            border: "1px solid rgba(99, 102, 241, 0.14)",
            px: 2,
            py: 1.5,
          }}
        >
          <CalendarTodayOutlinedIcon
            sx={{ fontSize: 18, color: "#6366f1", flexShrink: 0 }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                color: "#6366f1",
                opacity: 0.85,
                mb: 0.25,
              }}
            >
              Completed on
            </Typography>
            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#0f172a",
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

/* ---------------- Reusable stat tile ---------------- */
interface StatBoxProps {
  label: string;
  value: string;
  accent?: boolean;
}

function StatBox({ label, value, accent }: StatBoxProps) {
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  return (
    <Box
      sx={{
        borderRadius: "14px",
        background: accent
          ? "rgba(99, 102, 241, 0.08)"
          : "rgba(15, 23, 42, 0.03)",
        border: accent
          ? "1px solid rgba(99, 102, 241, 0.2)"
          : "1px solid rgba(15, 23, 42, 0.06)",
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
          color: accent ? "#6366f1" : "#64748b",
          opacity: 0.9,
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
          color: accent ? "transparent" : "#0f172a",
          background: accent ? brandGradient : "none",
          backgroundClip: accent ? "text" : "unset",
          WebkitBackgroundClip: accent ? "text" : "unset",
          WebkitTextFillColor: accent ? "transparent" : "#0f172a",
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default TopicCompletion;
