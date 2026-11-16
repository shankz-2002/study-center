import { useEffect, useState } from "react";
import type { ApiError } from "../../../types/Error";
import type { User } from "../../../types/User";
import { toast } from "react-toastify";
import { getUserDetails } from "../../../services/auth";

import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { Link as RouterLink } from "react-router-dom";

import {
  getRecentlyCompletedTopics,
  getTopicsCompleted,
} from "../../../services/topic";
import { getLevelsCompleted } from "../../../services/level";
import { getContinueLearning } from "../../../services/progress";

import type { ContinueLearningTopic } from "../../../types/Progress";
import type { RecentlyCompletedTopic } from "../../../types/Topic";

/* ---------------------------------- Types --------------------------------- */

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
};

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
};

/* ------------------------------- Subcomponents ---------------------------- */

function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        transition: "transform .2s ease, box-shadow .2s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: (t) =>
            `0 12px 28px -12px ${alpha(
              t.palette.common.black,
              t.palette.mode === "dark" ? 0.5 : 0.16,
            )}`,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: (t) =>
            `radial-gradient(circle at top right, ${alpha(
              accent,
              t.palette.mode === "dark" ? 0.22 : 0.12,
            )}, transparent 65%)`,
          pointerEvents: "none",
        },
      }}
    >
      <CardContent sx={{ p: 3, position: "relative" }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: 1 }}
            >
              {label}
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
                mt: 0.5,
                color: "text.primary",
              }}
            >
              {value.toLocaleString()}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1.25,
              borderRadius: 3,
              bgcolor: (t) =>
                alpha(accent, t.palette.mode === "dark" ? 0.2 : 0.1),
              color: accent,
              display: "grid",
              placeItems: "center",
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function ContinueCard({ topic }: { topic: ContinueLearningTopic }) {
  const safePercentage = Math.min(100, Math.max(0, topic.percentage));

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        transition:
          "transform .2s ease, box-shadow .2s ease, border-color .2s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: "success.main",
          boxShadow: (t) =>
            `0 16px 32px -16px ${alpha(
              t.palette.success.main,
              t.palette.mode === "dark" ? 0.3 : 0.2,
            )}`,

          "& .continue-arrow": {
            transform: "translateX(4px)",
          },
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/topics/${topic.topicId}`}
        sx={{ height: "100%", borderRadius: 4 }}
      >
        <CardContent
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              {topic.topicName}
            </Typography>

            <Chip
              label={`${safePercentage}%`}
              size="small"
              color="success"
              variant="outlined"
              sx={{ fontWeight: 700 }}
            />
          </Stack>

          <Typography color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
            {topic.description}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
            {topic.completedLevels} of {topic.totalLevels} levels completed
          </Typography>

          <LinearProgress
            variant="determinate"
            value={safePercentage}
            sx={{
              height: 8,
              borderRadius: 5,
              bgcolor: (t) =>
                alpha(
                  t.palette.success.main,
                  t.palette.mode === "dark" ? 0.2 : 0.12,
                ),
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                background: (t) =>
                  `linear-gradient(90deg, ${t.palette.success.light}, ${t.palette.success.main})`,
              },
            }}
          />

          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: "center",
              mt: 2,
              color: "success.main",
              fontWeight: 600,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Continue
            </Typography>

            <ArrowForwardRoundedIcon
              className="continue-arrow"
              fontSize="small"
              sx={{ transition: "transform .2s ease" }}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: "center" }}>
      {icon}
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, color: "text.primary" }}
      >
        {title}
      </Typography>
    </Stack>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        bgcolor: "background.paper",
        border: "1px dashed",
        borderColor: "divider",
        p: 4,
        textAlign: "center",
      }}
    >
      <Typography color="text.secondary">{message}</Typography>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Skeleton variant="rounded" height={140} sx={{ borderRadius: 4, mb: 3 }} />

      <Grid container spacing={3}>
        {[0, 1].map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6 }}>
            <Skeleton variant="rounded" height={140} sx={{ borderRadius: 4 }} />
          </Grid>
        ))}

        {[0, 1].map((i) => (
          <Grid key={`c-${i}`} size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: 4 }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

/* ---------------------------------- Page ---------------------------------- */

function UserDashboard() {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [topicsCompleted, setTopicsCompleted] = useState(0);
  const [levelsCompleted, setLevelsCompleted] = useState(0);

  const [continueLearning, setContinueLearning] = useState<
    ContinueLearningTopic[]
  >([]);

  const [recentlyCompleted, setRecentlyCompleted] = useState<
    RecentlyCompletedTopic[]
  >([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const results = await Promise.allSettled([
          getUserDetails(),
          getTopicsCompleted(),
          getLevelsCompleted(),
          getContinueLearning(),
          getRecentlyCompletedTopics(),
        ]);

        const [userRes, topicsRes, levelsRes, continueRes, recentlyRes] =
          results;

        if (userRes.status === "fulfilled" && userRes.value.data.success) {
          setUser(userRes.value.data.user);
        }

        if (topicsRes.status === "fulfilled" && topicsRes.value.data.success) {
          setTopicsCompleted(topicsRes.value.data.topicsCompleted);
        }

        if (levelsRes.status === "fulfilled" && levelsRes.value.data.success) {
          setLevelsCompleted(levelsRes.value.data.levelsCompleted);
        }

        if (
          continueRes.status === "fulfilled" &&
          continueRes.value.data.success
        ) {
          setContinueLearning(continueRes.value.data.topics);
        }

        if (
          recentlyRes.status === "fulfilled" &&
          recentlyRes.value.data.success
        ) {
          setRecentlyCompleted(recentlyRes.value.data.recentlyCompleted);
        }

        const rejected = results.find((r) => r.status === "rejected");
        if (rejected) {
          const err = (rejected as PromiseRejectedResult).reason as ApiError;
          toast.warning(
            err?.data?.message ||
              "Some dashboard data couldn't be loaded. Please try again.",
          );
        }
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.data?.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`
      .trim()
      .toUpperCase() || "U";

  const heroTextColor = theme.palette.common.white;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero banner */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 5,
          p: { xs: 3, md: 4 },
          mb: 4,
          color: heroTextColor,

          background: (t) =>
            t.palette.mode === "dark"
              ? `linear-gradient(135deg, ${t.palette.primary.dark} 0%, ${alpha(
                  t.palette.primary.main,
                  0.45,
                )} 100%)`
              : `linear-gradient(135deg, ${t.palette.primary.light} 0%, ${alpha(
                  t.palette.primary.main,
                  0.85,
                )} 55%, ${t.palette.secondary.light} 100%)`,

          border: "1px solid",
          borderColor: (t) =>
            t.palette.mode === "dark"
              ? alpha(t.palette.primary.light, 0.25)
              : alpha(t.palette.primary.main, 0.15),

          boxShadow: (t) =>
            `0 20px 44px -22px ${alpha(
              t.palette.primary.main,
              t.palette.mode === "dark" ? 0.35 : 0.25,
            )}`,

          "&::after": {
            content: '""',
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            right: -80,
            top: -120,
            background: (t) =>
              alpha(
                t.palette.common.white,
                t.palette.mode === "dark" ? 0.04 : 0.2,
              ),
            pointerEvents: "none",
          },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              fontWeight: 800,
              fontSize: 22,
              color: heroTextColor,
              bgcolor: (t) =>
                alpha(
                  t.palette.mode === "dark"
                    ? t.palette.common.white
                    : t.palette.primary.dark,
                  0.15,
                ),
              border: (t) =>
                `2px solid ${alpha(
                  t.palette.mode === "dark"
                    ? t.palette.common.white
                    : t.palette.primary.dark,
                  0.25,
                )}`,
            }}
          >
            {initials}
          </Avatar>

          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: -0.5,
                color: heroTextColor,
              }}
            >
              Welcome back, {user?.firstName ?? "Learner"}!
            </Typography>

            <Typography sx={{ color: alpha(heroTextColor, 0.85), mt: 0.5 }}>
              Keep the momentum going — you're doing great.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            label="Topics Completed"
            value={topicsCompleted}
            icon={<MenuBookRoundedIcon />}
            accent={theme.palette.primary.main}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            label="Levels Completed"
            value={levelsCompleted}
            icon={<LayersRoundedIcon />}
            accent={theme.palette.secondary.main}
          />
        </Grid>
      </Grid>

      {/* Continue learning */}
      <Box sx={{ mb: 4 }}>
        <SectionHeader
          icon={<AutoStoriesRoundedIcon color="primary" />}
          title="Continue Learning"
        />

        {continueLearning.length === 0 ? (
          <EmptyState message="No topics in progress. Start learning something new!" />
        ) : (
          <Grid container spacing={3}>
            {continueLearning.map((topic) => (
              <Grid size={{ xs: 12, md: 6 }} key={topic.topicId}>
                <ContinueCard topic={topic} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Recently completed */}
      <Box sx={{ mb: 4 }}>
        <SectionHeader
          icon={<CheckCircleRoundedIcon color="success" />}
          title="Recently Completed Topics"
        />

        {recentlyCompleted.length === 0 ? (
          <EmptyState message="You haven't completed any topics yet. Start learning to see your achievements here!" />
        ) : (
          <Grid container spacing={2}>
            {recentlyCompleted.map((topic) => (
              <Grid size={{ xs: 12, md: 4 }} key={topic.topicId}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    bgcolor: "background.paper",
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", mb: 2 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: (t) => alpha(t.palette.success.main, 0.12),
                          color: "success.main",
                        }}
                      >
                        <AutoStoriesRoundedIcon />
                      </Avatar>

                      <Chip label="Completed" color="success" size="small" />
                    </Stack>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {topic.topicName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {topic.categoryName} · {topic.fieldName}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Final score
                      </Typography>

                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {topic.percentage}%
                      </Typography>
                    </Stack>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 1 }}
                    >
                      Completed on{" "}
                      {new Date(topic.completedAt).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default UserDashboard;