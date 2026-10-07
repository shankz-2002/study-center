import { useEffect, useState } from "react";
import type { Level } from "../../../types/Level";
import { useNavigate, useParams } from "react-router-dom";
import { getLevels } from "../../../services/level";
import type { ApiError } from "../../../types/Error";
import { toast } from "react-toastify";
import {
  Box,
  CircularProgress,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import LearningContent from "../../../components/user/LearningContent";
import Questions from "../../../components/user/Questions";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import LevelSideBar from "../../../components/user/LevelSideBar";

function Topic() {
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const response = await getLevels(id!);
        if (response.data.success) {
          const fetchedLevels = response.data.levels;

          setLevels(fetchedLevels);
          if (fetchedLevels.length > 0) {
            setSelectedLevel(fetchedLevels[0]);
          }
        }
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.data?.message || "Failed to fetch levels");
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, [id]);

  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";
  const brandGradientSoft =
    "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.12) 50%, rgba(236,72,153,0.12) 100%)";
  const pageBackground =
    "radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,0.10), transparent 60%), " +
    "radial-gradient(1000px 500px at 110% 0%, rgba(236,72,153,0.08), transparent 60%), " +
    "#fafaff";

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          background: pageBackground,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            size={56}
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
            <AutoStoriesIcon sx={{ fontSize: 22, color: "#8b5cf6" }} />
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 500 }}>
          Loading levels…
        </Typography>
      </Box>
    );
  }

  /* ---------------- No levels ---------------- */
  if (levels.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: pageBackground,
          pt: { xs: 3, md: 5 },
          pb: { xs: 8, md: 10 },
        }}
      >
        {/* Back link */}
        <Box sx={{ px: { xs: 2, md: 4 }, mb: 2 }}>
          <Box
            component="button"
            onClick={() => navigate(-1)}
            sx={{
              all: "unset",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              px: 1.5,
              py: 0.75,
              borderRadius: "10px",
              color: "#64748b",
              fontSize: "0.85rem",
              fontWeight: 600,
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#4f46e5",
                backgroundColor: "rgba(99, 102, 241, 0.08)",
              },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            Back to topics
          </Box>
        </Box>

        {/* Centered empty state */}
        <Box
          sx={{
            minHeight: "calc(100vh - 200px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 4,
          }}
        >
          <Box sx={{ textAlign: "center", maxWidth: 460 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "20px",
                background: brandGradientSoft,
                color: "#8b5cf6",
                display: "grid",
                placeItems: "center",
                mx: "auto",
                mb: 2.5,
              }}
            >
              <FolderOpenOutlinedIcon sx={{ fontSize: 34 }} />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#0f172a",
                mb: 1,
                letterSpacing: "-0.3px",
              }}
            >
              No materials yet
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#64748b", lineHeight: 1.65 }}
            >
              This topic doesn&apos;t have any materials available right now.
              Check back soon or explore a different topic.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  /* ---------------- Main layout ---------------- */
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: pageBackground,
        pt: { xs: 3, md: 5 },
        pb: { xs: 8, md: 10 },
      }}
    >
      {/* Back link */}
      <Box sx={{ px: { xs: 2, md: 4 }, mb: 2 }}>
        <Box
          component="button"
          onClick={() => navigate(-1)}
          sx={{
            all: "unset",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.5,
            py: 0.75,
            borderRadius: "10px",
            color: "#64748b",
            fontSize: "0.85rem",
            fontWeight: 600,
            transition: "all 0.2s ease",
            "&:hover": {
              color: "#4f46e5",
              backgroundColor: "rgba(99, 102, 241, 0.08)",
            },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          Back to topics
        </Box>
      </Box>

      {/* ---------------- Two-column layout ---------------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: { xs: 3, md: 4 },
          px: { xs: 2, md: 4 },
          width: "100%",
        }}
      >
        {/* ------------- Level Sidebar (frosted card) ------------- */}
        <Box
          sx={{
            width: { xs: "100%", md: 300 },
            flexShrink: 0,
            position: { xs: "relative", md: "sticky" },
            top: { md: 100 },
            alignSelf: "flex-start",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            border: "1px solid rgba(15, 23, 42, 0.06)",
            boxShadow:
              "0 20px 40px -30px rgba(99, 102, 241, 0.35), 0 8px 20px -12px rgba(139, 92, 246, 0.15)",
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
          }}
        >
          <LevelSideBar
            levels={levels}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
          />
        </Box>

        {/* ------------- Main content ------------- */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {selectedLevel ? (
            <>
              {/* ---------------- Level header (no card) ---------------- */}
              <Box sx={{ mb: 4 }}>
                <Chip
                  icon={<LayersOutlinedIcon sx={{ fontSize: 16 }} />}
                  label="Current level"
                  size="small"
                  sx={{
                    mb: 2,
                    px: 1,
                    py: 2,
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    letterSpacing: "0.2px",
                    color: "#4f46e5",
                    backgroundColor: "rgba(99, 102, 241, 0.08)",
                    border: "1px solid rgba(99, 102, 241, 0.18)",
                    borderRadius: "999px",
                    "& .MuiChip-icon": { color: "#6366f1" },
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: "14px",
                      background: brandGradient,
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                      flexShrink: 0,
                      boxShadow:
                        "0 10px 20px -8px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
                    }}
                  >
                    <MenuBookOutlinedIcon sx={{ fontSize: 24 }} />
                  </Box>

                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: "-1px",
                      fontSize: { xs: "1.7rem", md: "2.1rem" },
                      color: "#0f172a",
                      lineHeight: 1.15,
                    }}
                  >
                    {selectedLevel.levelName}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#64748b",
                    lineHeight: 1.7,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    maxWidth: 780,
                  }}
                >
                  {selectedLevel.description}
                </Typography>
              </Box>

              {/* Learning content */}
              <LearningContent levelId={selectedLevel.id} />

              {/* Divider between learning content and practice questions */}
              <Divider
                sx={{
                  my: { xs: 5, md: 6 },
                  borderColor: "rgba(15, 23, 42, 0.08)",
                }}
              />

              {/* Practice questions */}
              <Questions levelId={selectedLevel.id} />
            </>
          ) : (
            <Box
              sx={{
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.85)",
                border: "1px solid rgba(15, 23, 42, 0.06)",
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography color="text.secondary">No level selected.</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Topic;
