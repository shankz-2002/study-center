import { Box, Typography } from "@mui/material";
import type { UserTopicCompletion } from "../../types/Topic";

interface TopicCompletionProps {
  completion: UserTopicCompletion;
}

function TopicCompletion({ completion }: TopicCompletionProps) {
  return (
    <Box
      sx={{
        mt: 5,
        p: 4,
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.85)",
        border: "1px solid rgba(34, 197, 94, 0.2)",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        🎉 Topic Completed
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Overall Score: {completion.totalScore} / {completion.totalPossibleScore}
      </Typography>

      <Typography>Overall Percentage: {completion.percentage}%</Typography>

      <Typography>
        Levels Completed: {completion.completedLevels} /{" "}
        {completion.totalLevels}
      </Typography>

      <Typography sx={{ mt: 1 }} color="text.secondary">
        Completed on: {new Date(completion.completedAt).toLocaleDateString()}
      </Typography>
    </Box>
  );
}

export default TopicCompletion;
