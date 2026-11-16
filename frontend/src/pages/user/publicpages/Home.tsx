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
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getFields } from "../../../services/field";
import type { ApiError } from "../../../types/Error";
import type { Field } from "../../../types/Field";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExploreIcon from "@mui/icons-material/Explore";

function Home() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

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
    toast.success("Takes max 30 s to load ");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFields();
  }, []);

  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  const brandGradientSoft = isDark
    ? "linear-gradient(135deg, rgba(99,102,241,0.20), rgba(139,92,246,0.20), rgba(236,72,153,0.20))"
    : "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12), rgba(236,72,153,0.12))";

  const cardHoverShadow = isDark
    ? "0 20px 40px -20px rgba(0,0,0,0.6)"
    : "0 20px 40px -20px rgba(99,102,241,0.35), 0 8px 16px -8px rgba(139,92,246,0.2)";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        pt: { xs: 5, md: 7 },
        pb: { xs: 8, md: 12 },
        transition: "background-color 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 6, md: 9 },
            position: "relative",
          }}
        >
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
              color: "primary.main",
              bgcolor: isDark
                ? "rgba(99,102,241,0.18)"
                : "rgba(99,102,241,0.08)",
              border: 1,
              borderColor: isDark
                ? "rgba(99,102,241,0.35)"
                : "rgba(99,102,241,0.18)",
              borderRadius: "999px",
              "& .MuiChip-icon": { color: "primary.main" },
            }}
          />

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              fontSize: { xs: "2.1rem", sm: "2.75rem", md: "3.4rem" },
              color: "text.primary",
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

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
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

        {/* Content */}
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
                  color: "primary.main",
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
                  sx={{ fontSize: 22, color: "secondary.main" }}
                />
              </Box>
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontWeight: 500 }}
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
                    bgcolor: "background.paper",
                    color: "text.primary",
                    border: 1,
                    borderColor: "divider",
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
                      borderColor: "primary.main",
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
                      <Box
                        className="field-icon-wrap"
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: "14px",
                          display: "grid",
                          placeItems: "center",
                          background: brandGradientSoft,
                          color: "primary.main",
                          transition:
                            "background 0.28s ease, color 0.28s ease, transform 0.28s ease",
                        }}
                      >
                        <SchoolIcon sx={{ fontSize: 26 }} />
                      </Box>

                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1.15rem",
                          letterSpacing: "-0.3px",
                          color: "text.primary",
                          lineHeight: 1.35,
                        }}
                      >
                        {field.fieldName}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
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

                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                          color: "primary.main",
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
