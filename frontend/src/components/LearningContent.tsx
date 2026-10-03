import { useEffect, useState } from "react";
import type {
  LearningContentProps,
  LearningContentType,
} from "../types/LearningContent";
import { getLearningContent } from "../services/learningContent";
import type { ApiError } from "../types/Error";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

function LearningContent({ levelId }: LearningContentProps) {
  const [learning, setLearning] = useState<LearningContentType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLearningContent = async () => {
      try {
        setLoading(true);
        const response = await getLearningContent(levelId);
        if (response?.data?.success) {
          setLearning(response?.data?.learning);
        }
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.data?.message || "failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    fetchLearningContent();
  }, [levelId]);

  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          minHeight: 240,
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: "1px solid rgba(15, 23, 42, 0.06)",
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            size={48}
            thickness={4}
            sx={{
              color: "#6366f1",
              "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
            }}
          >
            <AutoStoriesIcon sx={{ fontSize: 20, color: "#8b5cf6" }} />
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 500 }}>
          Loading content…
        </Typography>
      </Box>
    );
  }

  /* ---------------- Empty ---------------- */
  if (learning.length === 0) {
    return (
      <Box
        sx={{
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: "1px solid rgba(15, 23, 42, 0.06)",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography sx={{ color: "#64748b", fontWeight: 500 }}>
          No content available for this level yet.
        </Typography>
      </Box>
    );
  }

  /* ---------------- Content ---------------- */
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {learning.map((learn) => (
        <Box
          key={learn.id}
          sx={{
            position: "relative",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            border: "1px solid rgba(15, 23, 42, 0.06)",
            boxShadow:
              "0 20px 40px -30px rgba(99, 102, 241, 0.28), 0 8px 20px -12px rgba(139, 92, 246, 0.12)",
            p: { xs: 3, md: 3.5 },
            overflow: "hidden",
            transition:
              "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: brandGradient,
              opacity: 0.85,
            },
            "&:hover": {
              transform: "translateY(-3px)",
              borderColor: "rgba(99, 102, 241, 0.20)",
              boxShadow:
                "0 24px 48px -28px rgba(99, 102, 241, 0.38), 0 10px 24px -12px rgba(139, 92, 246, 0.20)",
            },
          }}
        >
          {/* Header row: number badge + title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.75,
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                flexShrink: 0,
                borderRadius: "12px",
                background: brandGradient,
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: "1rem",
                letterSpacing: "-0.3px",
                boxShadow:
                  "0 10px 20px -10px rgba(99, 102, 241, 0.65), inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              {learn.order}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                  letterSpacing: "-0.4px",
                  color: "#0f172a",
                  lineHeight: 1.35,
                }}
              >
                {learn.title}
              </Typography>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.75,
                  color: "#6366f1",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                  opacity: 0.85,
                }}
              >
                <MenuBookOutlinedIcon sx={{ fontSize: 14 }} />
                Lesson
              </Box>
            </Box>
          </Box>

          {/* Body content */}
          <Typography
            sx={{
              color: "#475569",
              lineHeight: 1.85,
              fontSize: { xs: "0.92rem", md: "0.98rem" },
              whiteSpace: "pre-wrap",
            }}
          >
            {learn.content}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default LearningContent;
