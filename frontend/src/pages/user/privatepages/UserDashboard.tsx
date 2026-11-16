
import { useEffect, useState } from "react";
import type { ApiError } from "../../../types/Error";
import type { User } from "../../../types/User";
import { toast } from "react-toastify";
import { getUserDetails } from "../../../services/auth";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
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

import { getTopicsCompleted } from "../../../services/topic";
import { getLevelsCompleted } from "../../../services/level";
import { getContinueLearning } from "../../../services/progress";

import type { ContinueLearningTopic } from "../../../types/Progress";

/* ---------------------------------- Types --------------------------------- */

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
};

/* ------------------------------- Subcomponents ---------------------------- */

function StatCard({ label, value, icon, accent }: StatCardProps) {
  const theme = useTheme();

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
          boxShadow: `0 12px 28px -12px ${alpha(
            theme.palette.common.black,
            theme.palette.mode === "dark" ? 0.5 : 0.16,
          )}`,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `radial-gradient(
            circle at top right,
            ${alpha(accent, theme.palette.mode === "dark" ? 0.22 : 0.12)},
            transparent 65%
          )`,
          pointerEvents: "none",
        },
      }}
    >
      <CardContent sx={{ p: 3, position: "relative" }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
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
              bgcolor: alpha(
                accent,
                theme.palette.mode === "dark" ? 0.2 : 0.1,
              ),
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
  const theme = useTheme();

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
          boxShadow: `0 16px 32px -16px ${alpha(
            theme.palette.success.main,
            theme.palette.mode === "dark" ? 0.3 : 0.2,
          )}`,

          "& .continue-arrow": {
            transform: "translateX(4px)",
          },
        },
      }}
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
            sx={{
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {topic.topicName}
          </Typography>

          <Chip
            label={`${topic.percentage}%`}
            size="small"
            color="success"
            variant="outlined"
            sx={{ fontWeight: 700 }}
          />
        </Stack>

        <Typography
          color="text.secondary"
          sx={{ mb: 2, flexGrow: 1 }}
        >
          {topic.description}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 0.75 }}
        >
          {topic.completedLevels} of {topic.totalLevels} levels completed
        </Typography>

        <LinearProgress
          variant="determinate"
          value={Math.min(100, Math.max(0, topic.percentage))}
          sx={{
            height: 8,
            borderRadius: 5,
            bgcolor: alpha(
              theme.palette.success.main,
              theme.palette.mode === "dark" ? 0.2 : 0.12,
            ),

            "& .MuiLinearProgress-bar": {
              borderRadius: 5,
              background: `linear-gradient(
                90deg,
                ${theme.palette.success.light},
                ${theme.palette.success.main}
              )`,
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

      <Grid container spacing={3}>
        {[0, 1].map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6 }}>
            <Skeleton
              variant="rounded"
              height={140}
              sx={{ borderRadius: 4 }}
            />
          </Grid>
        ))}

        {[0, 1].map((i) => (
          <Grid key={`c-${i}`} size={{ xs: 12, md: 6 }}>
            <Skeleton
              variant="rounded"
              height={200}
              sx={{ borderRadius: 4 }}
            />
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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [
          userResponse,
          topicsResponse,
          levelsResponse,
          continueResponse,
        ] = await Promise.all([
          getUserDetails(),
          getTopicsCompleted(),
          getLevelsCompleted(),
          getContinueLearning(),
        ]);

        if (userResponse.data.success) {
          setUser(userResponse.data.user);
        }

        if (topicsResponse.data.success) {
          setTopicsCompleted(topicsResponse.data.topicsCompleted);
        }

        if (levelsResponse.data.success) {
          setLevelsCompleted(levelsResponse.data.levelsCompleted);
        }

        if (continueResponse.data.success) {
          setContinueLearning(continueResponse.data.topics);
        }
      } catch (error) {
        const err = error as ApiError;
        toast.error(
          err.data?.message || "Failed to fetch dashboard data",
        );
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

          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(
                  135deg,
                  ${theme.palette.primary.dark} 0%,
                  ${theme.palette.background.paper} 100%
                )`
              : `linear-gradient(
                  135deg,
                  ${theme.palette.primary.dark} 0%,
                  ${theme.palette.primary.main} 55%,
                  ${theme.palette.secondary.main} 100%
                )`,

          border: "1px solid",
          borderColor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.primary.light, 0.25)
              : "transparent",

          boxShadow: `0 20px 44px -22px ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.35 : 0.5,
          )}`,

          "&::after": {
            content: '""',
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            right: -80,
            top: -120,
            background: alpha(
              theme.palette.common.white,
              theme.palette.mode === "dark" ? 0.04 : 0.1,
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
              bgcolor: alpha(theme.palette.common.white, 0.18),
              border: `2px solid ${alpha(
                theme.palette.common.white,
                0.35,
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

            <Typography
              sx={{
                color: alpha(heroTextColor, 0.85),
                mt: 0.5,
              }}
            >
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

      {/* Continue learning heading */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 2, alignItems: "center" }}
      >
        <AutoStoriesRoundedIcon color="primary" />

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "text.primary",
          }}
        >
          Continue Learning
        </Typography>
      </Stack>

      {/* Continue learning content */}
      {continueLearning.length === 0 ? (
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
          <Typography color="text.secondary">
            No topics in progress. Start learning something new!
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {continueLearning.map((topic) => (
            <Grid
              size={{ xs: 12, md: 6 }}
              key={topic.topicId}
            >
              <ContinueCard topic={topic} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default UserDashboard;
