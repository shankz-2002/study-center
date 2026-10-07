import { useEffect, useState } from "react";
import type {
  LearningContentProps,
  LearningContentType,
} from "../../types/LearningContent";
import { getLearningContent } from "../../services/learningContent";
import type { ApiError } from "../../types/Error";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography, Divider } from "@mui/material";

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

  /* ---------------- Content (single flowing page) ---------------- */
  return (
    <Box>
      {/* ---------------- Section header ---------------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 1,
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
          <AutoStoriesIcon sx={{ fontSize: 22 }} />
        </Box>

        <Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.6px",
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            Learning content
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontWeight: 500, mt: 0.25 }}
          >
            {learning.length} lesson{learning.length === 1 ? "" : "s"} in this
            level
          </Typography>
        </Box>
      </Box>

      {/* ---------------- Lessons (flowing, no cards) ---------------- */}
      <Box sx={{ mt: 3 }}>
        {learning.map((learn, index) => (
          <Box key={learn.id}>
            <Box sx={{ py: 4 }}>
              {/* Lesson header row */}
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
                    width: 38,
                    height: 38,
                    flexShrink: 0,
                    borderRadius: "10px",
                    background: "rgba(99, 102, 241, 0.10)",
                    border: "1px solid rgba(99, 102, 241, 0.18)",
                    color: "#4f46e5",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                  }}
                >
                  {learn.order}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0, pt: 0.25 }}>
                  <Typography
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
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
                      mt: 0.5,
                      color: "#6366f1",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.4px",
                      textTransform: "uppercase",
                      opacity: 0.85,
                    }}
                  >
                    <MenuBookOutlinedIcon sx={{ fontSize: 14 }} />
                    Lesson {index + 1} of {learning.length}
                  </Box>
                </Box>
              </Box>

              {/* Lesson body — indented to align with title, not number */}
              <Box
                sx={{
                  pl: { xs: 0, md: 6.5 },
                  pr: { xs: 0, md: 2 },
                }}
              >
                <Typography
                  sx={{
                    color: "#475569",
                    lineHeight: 1.9,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {learn.content}
                </Typography>
              </Box>
            </Box>

            {/* Divider between lessons (not after the last) */}
            {index < learning.length - 1 && (
              <Divider sx={{ borderColor: "rgba(15, 23, 42, 0.08)" }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default LearningContent;
