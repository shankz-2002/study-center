import { useEffect, useState } from "react";
import type { User } from "../../../types/User";
import type { Field } from "../../../types/Field";
import type { ApiError } from "../../../types/Error";
import type {
  ContinueLearningTopic,
  OverallProgress,
} from "../../../types/Progress";
import type { RecentlyCompletedTopic } from "../../../types/Topic";

import { toast } from "react-toastify";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import {
  Avatar,
  Box,
  Button,
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

import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import { getUserDetails } from "../../../services/auth";
import {
  getOverallProgress,
  getRecentlyCompletedTopics,
  getTopicsCompleted,
} from "../../../services/topic";
import { getLevelsCompleted } from "../../../services/level";
import { getContinueLearning } from "../../../services/progress";
import { getFields } from "../../../services/field";

/* ---------------------------------- Types --------------------------------- */

type ProgressSummaryCardProps = {
  topicsCompleted: number;
  levelsCompleted: number;
  progress: OverallProgress | null;
};

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
};

/* ------------------------------- Subcomponents ---------------------------- */

function ProgressSummaryCard({
  topicsCompleted,
  levelsCompleted,
  progress,
}: ProgressSummaryCardProps) {
  const safePercentage = Math.min(
    100,
    Math.max(0, progress?.overallProgress ?? 0),
  );

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
              t.palette.success.main,
              t.palette.mode === "dark" ? 0.18 : 0.1,
            )}, transparent 70%)`,
          pointerEvents: "none",
        },
      }}
    >
      <CardContent sx={{ p: 3, position: "relative" }}>
        {/* Top row: three mini stats */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack
              direction="row"
              spacing={1.25}
              sx={{ alignItems: "center" }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
                  color: "primary.main",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <MenuBookRoundedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", lineHeight: 1.2 }}
                >
                  Topics
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {topicsCompleted.toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack
              direction="row"
              spacing={1.25}
              sx={{ alignItems: "center" }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: (t) => alpha(t.palette.secondary.main, 0.1),
                  color: "secondary.main",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <LayersRoundedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", lineHeight: 1.2 }}
                >
                  Levels
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {levelsCompleted.toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack
              direction="row"
              spacing={1.25}
              sx={{ alignItems: "center" }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: (t) => alpha(t.palette.success.main, 0.1),
                  color: "success.main",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <TrendingUpRoundedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", lineHeight: 1.2 }}
                >
                  Overall
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "success.main" }}
                >
                  {safePercentage}%
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2.5 }} />

        {/* Bottom: overall progress bar */}
        <Stack spacing={1}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="body2" color="text.secondary">
              {progress?.completedLevels ?? 0} of{" "}
              {progress?.totalLevels ?? 0} levels completed
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {progress?.completedTopics ?? 0} /{" "}
              {progress?.totalTopics ?? 0} topics
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={safePercentage}
            sx={{
              height: 10,
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

      <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
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
      <Skeleton
        variant="rounded"
        height={140}
        sx={{ borderRadius: 4, mb: 3 }}
      />

      <Skeleton
        variant="rounded"
        height={200}
        sx={{ borderRadius: 4, mb: 3 }}
      />

      <Grid container spacing={3}>
        {[0, 1, 2].map((i) => (
          <Grid key={i} size={{ xs: 12, md: 4 }}>
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

  const [fields, setFields] = useState<Field[]>([]);

  const [continueLearning, setContinueLearning] = useState<
    ContinueLearningTopic[]
  >([]);

  const [recentlyCompleted, setRecentlyCompleted] = useState<
    RecentlyCompletedTopic[]
  >([]);

  const [overallProgress, setOverallProgress] =
    useState<OverallProgress | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const results = await Promise.allSettled([
          getUserDetails(),
          getTopicsCompleted(),
          getLevelsCompleted(),
          getContinueLearning(),
          getRecentlyCompletedTopics(),
          getFields(),
          getOverallProgress(),
        ]);

        let hasError = false;

        const handleFailure = <T extends { data: { success: boolean } }>(
          result: PromiseSettledResult<T>,
          section: string,
        ) => {
          if (
            result.status === "rejected" ||
            (result.status === "fulfilled" && !result.value.data.success)
          ) {
            hasError = true;
            console.error(
              `Failed to load ${section}:`,
              result.status === "rejected"
                ? result.reason
                : "API returned success: false",
            );
          }
        };

        const [
          userRes,
          topicsRes,
          levelsRes,
          continueRes,
          recentlyRes,
          fieldsRes,
          overallRes,
        ] = results;

        handleFailure(userRes, "user details");
        handleFailure(topicsRes, "completed topics");
        handleFailure(levelsRes, "completed levels");
        handleFailure(continueRes, "continue learning");
        handleFailure(recentlyRes, "recently completed topics");
        handleFailure(fieldsRes, "fields");
        handleFailure(overallRes, "overall progress");

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

        if (fieldsRes.status === "fulfilled" && fieldsRes.value.data.success) {
          setFields(fieldsRes.value.data.fields);
        }

        if (
          overallRes.status === "fulfilled" &&
          overallRes.value.data.success
        ) {
          setOverallProgress(overallRes.value.data.overallProgress);
        }

        if (hasError) {
          toast.warning(
            "Some dashboard information couldn't be loaded. Please try again.",
          );
        }
      } catch (error) {
        const err = error as ApiError;
        toast.error(err?.data?.message || "Failed to fetch dashboard data");
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

      {/* Progress summary (merged card) */}
      <Box sx={{ mb: 4 }}>
        <ProgressSummaryCard
          topicsCompleted={topicsCompleted}
          levelsCompleted={levelsCompleted}
          progress={overallProgress}
        />
      </Box>

      {/* Continue Learning */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <SectionHeader
            icon={<AutoStoriesRoundedIcon color="primary" />}
            title="Continue Learning"
          />

          {continueLearning.length > 3 && (
            <Button
              component={RouterLink}
              to="/topics?filter=in-progress"
              size="small"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ fontWeight: 600 }}
            >
              View all
            </Button>
          )}
        </Stack>

        {continueLearning.length === 0 ? (
          <EmptyState message="No topics in progress. Start learning something new!" />
        ) : (
          <Grid container spacing={3}>
            {continueLearning.slice(0, 3).map((topic) => (
              <Grid size={{ xs: 12, md: 4 }} key={topic.topicId}>
                <ContinueCard topic={topic} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Recently Completed */}
      <Box sx={{ mb: 4 }}>
        <SectionHeader
          icon={<CheckCircleRoundedIcon color="success" />}
          title="Recently Completed Topics"
        />

        {recentlyCompleted.length === 0 ? (
          <EmptyState message="You haven't completed any topics yet. Start learning to see your achievements here!" />
        ) : (
          <Grid container spacing={3}>
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
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Explore Fields */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <SectionHeader
            icon={<ExploreRoundedIcon color="primary" />}
            title="Explore Fields"
          />

          {fields.length > 3 && (
            <Button
              component={RouterLink}
              to="/fields"
              size="small"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ fontWeight: 600 }}
            >
              View all
            </Button>
          )}
        </Stack>

        {fields.length === 0 ? (
          <EmptyState message="No fields available yet. Check back soon!" />
        ) : (
          <Grid container spacing={3}>
            {fields.slice(0, 3).map((field) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    transition:
                      "transform .2s ease, box-shadow .2s ease, border-color .2s ease",

                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: "primary.main",
                      boxShadow: (t) =>
                        `0 16px 32px -16px ${alpha(
                          t.palette.primary.main,
                          t.palette.mode === "dark" ? 0.35 : 0.22,
                        )}`,

                      "& .field-arrow": {
                        transform: "translateX(4px)",
                      },
                    },
                  }}
                >
                  <CardActionArea
                    component={RouterLink}
                    to={`/fields/${field.id}`}
                    sx={{ height: "100%", borderRadius: 3 }}
                  >
                    <CardContent
                      sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        {field.fieldName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          flexGrow: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {field.description}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{
                          alignItems: "center",
                          color: "primary.main",
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Explore
                        </Typography>

                        <ArrowForwardRoundedIcon
                          className="field-arrow"
                          fontSize="small"
                          sx={{ transition: "transform .2s ease" }}
                        />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
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