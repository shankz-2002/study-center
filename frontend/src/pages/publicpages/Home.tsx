import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getFields } from "../../services/field";
import type { ApiError } from "../../types/Error";
import type { Field } from "../../types/Field";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExploreIcon from "@mui/icons-material/Explore";

function Home() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchFields = async () => {
    try {
      setLoading(true);

      const response = await getFields();

      if (response.data.success) {
        setFields(response.data.fields);
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to fetch fields");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFields();
  }, []);

  // ---- Design tokens (match Navbar) ----
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";
  const brandGradientSoft =
    "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.12) 50%, rgba(236,72,153,0.12) 100%)";
  const cardHoverShadow =
    "0 20px 40px -20px rgba(99, 102, 241, 0.35), 0 8px 16px -8px rgba(139, 92, 246, 0.2)";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // Soft ambient gradient background — modern "study app" feel
        background:
          "radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,0.10), transparent 60%), " +
          "radial-gradient(1000px 500px at 110% 0%, rgba(236,72,153,0.08), transparent 60%), " +
          "#fafaff",
        pt: { xs: 6, md: 9 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        {/* ---------------- Hero / Header ---------------- */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 6, md: 9 },
            position: "relative",
          }}
        >
          {/* Small eyebrow chip */}
          <Chip
            icon={<ExploreIcon sx={{ fontSize: 16 }} />}
            label="Pick a path, start learning"
            size="small"
            sx={{
              mb: 3,
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

          {/* Headline */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              fontSize: { xs: "2.1rem", sm: "2.75rem", md: "3.4rem" },
              color: "#0f172a",
              mb: 2,
            }}
          >
            Explore Your{" "}
            <Box
              component="span"
              sx={{
                background: brandGradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Learning Path
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              maxWidth: 620,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.08rem" },
              lineHeight: 1.7,
            }}
          >
            Choose a field to explore curated categories, dive into topics, and
            build real skills — one lesson at a time.
          </Typography>
        </Box>

        {/* ---------------- Content ---------------- */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 300,
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                size={56}
                thickness={4}
                sx={{
                  color: "#6366f1",
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
                <AutoStoriesIcon sx={{ fontSize: 22, color: "#8b5cf6" }} />
              </Box>
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "#94a3b8", fontWeight: 500 }}
            >
              Loading fields…
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2.5, md: 3 }}>
            {fields.map((field) => (
              <Grid key={field.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "20px",
                    background: "#ffffff",
                    border: "1px solid rgba(15, 23, 42, 0.06)",
                    position: "relative",
                    overflow: "hidden",
                    transition:
                      "transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.28s ease, border-color 0.28s ease",
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
                      transform: "translateY(-6px)",
                      borderColor: "rgba(99, 102, 241, 0.25)",
                      boxShadow: cardHoverShadow,
                      "& .field-icon-wrap": {
                        background: brandGradient,
                        color: "#fff",
                        transform: "scale(1.06) rotate(-3deg)",
                      },
                      "& .field-arrow": {
                        transform: "translateX(4px)",
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/fields/${field.id}`)}
                    sx={{
                      height: "100%",
                      borderRadius: "20px",
                      p: 0,
                      "&:hover .MuiCardActionArea-focusHighlight": {
                        opacity: 0,
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, md: 3.5 },
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        gap: 2,
                      }}
                    >
                      {/* Icon bubble */}
                      <Box
                        className="field-icon-wrap"
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: "14px",
                          display: "grid",
                          placeItems: "center",
                          background: brandGradientSoft,
                          color: "#6366f1",
                          transition:
                            "background 0.28s ease, color 0.28s ease, transform 0.28s ease",
                        }}
                      >
                        <SchoolIcon sx={{ fontSize: 26 }} />
                      </Box>

                      {/* Field name */}
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1.15rem",
                          letterSpacing: "-0.3px",
                          color: "#0f172a",
                          lineHeight: 1.35,
                        }}
                      >
                        {field.fieldName}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                          lineHeight: 1.65,
                          flexGrow: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {field.description}
                      </Typography>

                      {/* Footer CTA — plain Box with flex (no Stack typing issues) */}
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                          color: "#4f46e5",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          letterSpacing: "-0.1px",
                        }}
                      >
                        <span>Explore</span>
                        <ArrowForwardIcon
                          className="field-arrow"
                          sx={{
                            fontSize: 16,
                            transition: "transform 0.25s ease",
                            opacity: 0.85,
                          }}
                        />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default Home;
