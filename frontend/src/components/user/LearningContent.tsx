
import { useEffect, useState } from "react";
import type {
  LearningContentProps,
  LearningContentType,
} from "../../types/LearningContent";
import { getLearningContent } from "../../services/learningContent";
import type { ApiError } from "../../types/Error";
import { toast } from "react-toastify";
import {
  Box,
  CircularProgress,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

function LearningContent({ levelId }: LearningContentProps) {
  const [learning, setLearning] = useState<LearningContentType[]>([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  const containerBackground = isDark
    ? "rgba(30, 41, 59, 0.75)"
    : "rgba(255, 255, 255, 0.85)";

  const containerBorder = isDark
    ? "rgba(148, 163, 184, 0.14)"
    : "rgba(15, 23, 42, 0.06)";

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
          background: containerBackground,
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: `1px solid ${containerBorder}`,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            size={48}
            thickness={4}
            sx={{
              color: theme.palette.primary.main,
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
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
            <AutoStoriesIcon
              sx={{
                fontSize: 20,
                color: theme.palette.secondary.main,
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
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
          background: containerBackground,
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: `1px solid ${containerBorder}`,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          No content available for this level yet.
        </Typography>
      </Box>
    );
  }

  /* ---------------- Content ---------------- */
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
              color: theme.palette.text.primary,
              lineHeight: 1.2,
            }}
          >
            Learning content
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              mt: 0.25,
            }}
          >
            {learning.length} lesson{learning.length === 1 ? "" : "s"} in this
            level
          </Typography>
        </Box>
      </Box>

      {/* ---------------- Lessons ---------------- */}
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
                    background: isDark
                      ? "rgba(129, 140, 248, 0.16)"
                      : "rgba(99, 102, 241, 0.10)",
                    border: isDark
                      ? "1px solid rgba(129, 140, 248, 0.25)"
                      : "1px solid rgba(99, 102, 241, 0.18)",
                    color: theme.palette.primary.main,
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
                      color: theme.palette.text.primary,
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
                      color: theme.palette.primary.main,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.4px",
                      textTransform: "uppercase",
                      opacity: 0.9,
                    }}
                  >
                    <MenuBookOutlinedIcon sx={{ fontSize: 14 }} />
                    Lesson {index + 1} of {learning.length}
                  </Box>
                </Box>
              </Box>

              {/* Lesson body */}
              <Box
                sx={{
                  pl: { xs: 0, md: 6.5 },
                  pr: { xs: 0, md: 2 },
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.9,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {learn.content}
                </Typography>
              </Box>
            </Box>

            {/* Divider between lessons */}
            {index < learning.length - 1 && (
              <Divider
                sx={{
                  borderColor: theme.palette.divider,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default LearningContent;
