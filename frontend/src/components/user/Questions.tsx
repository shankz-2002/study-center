
import { useEffect, useState } from "react";
import type { Question, QuestionTypeProps } from "../../types/Question";
import { checkAnswer, getQuestions } from "../../services/question";
import type { ApiError } from "../../types/Error";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import type { QuizResult } from "../../types/Answer";

import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import type { LevelProgress } from "../../types/Progress";
import { getProgress } from "../../services/progress";
import { checkTopicCompletion } from "../../services/topic";

function Questions({
  levelId,
  topicId,
  onTopicCompleted,
  onLevelCompleted,
}: QuestionTypeProps) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState<LevelProgress | null>(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getQuestions(levelId);

        if (response?.data?.success) {
          setQuestions(response.data.questions);
        }
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.data?.message || "Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [levelId]);

  // Fetch progress
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getProgress(levelId);

        if (response?.data?.success) {
          setProgress(response.data.progress);
        }
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.data?.message || "Failed to fetch");
      }
    };

    fetchProgress();
  }, [levelId]);

  const completed = progress !== null;

  // ---- Design tokens ----
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  const brandSoft = isDark
    ? "rgba(129, 140, 248, 0.16)"
    : "rgba(99, 102, 241, 0.10)";

  const brandBorder = isDark
    ? "rgba(129, 140, 248, 0.25)"
    : "rgba(99, 102, 241, 0.18)";

  const containerBackground = isDark
    ? "rgba(30, 41, 59, 0.75)"
    : "rgba(255, 255, 255, 0.85)";

  const containerBorder = isDark
    ? "rgba(148, 163, 184, 0.14)"
    : "rgba(15, 23, 42, 0.06)";

  const optionLabelSx = {
    fontSize: "0.95rem",
    color: theme.palette.text.primary,
  };

  const radioSx = {
    color: theme.palette.text.disabled,
    "&.Mui-checked": {
      color: theme.palette.primary.main,
    },
  };

  const checkboxSx = {
    color: theme.palette.text.disabled,
    "&.Mui-checked": {
      color: theme.palette.secondary.main,
    },
  };

  const handleSingleAnswerChange = (
    questionId: string,
    answer: string,
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleMultipleSelectChange = (
    questionId: string,
    option: string,
  ) => {
    setAnswers((prev) => {
      const currentAnswers = (prev[questionId] as string[]) || [];
      const alreadySelected = currentAnswers.includes(option);

      const newAnswers = alreadySelected
        ? currentAnswers.filter((item) => item !== option)
        : [...currentAnswers, option];

      return { ...prev, [questionId]: newAnswers };
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const response = await checkAnswer(levelId, answers);

      if (response?.data?.success) {
        setResult(response?.data?.result);

        if (response.data.result.passed) {
          setProgress({
            score: response.data.result.score,
            percentage: response.data.result.percentage,
            completedAt: new Date().toISOString(),
          });

          // Refresh levels to update completion and unlock status
          await onLevelCompleted();

          const completionResponse = await checkTopicCompletion(topicId);

          console.log("this is the topic completion check", completionResponse);

          if (completionResponse.data.completed) {
            onTopicCompleted(completionResponse.data.completion);
          }
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data?.message || "Failed to submit answers");
    } finally {
      setSubmitting(false);
    }
  };

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
          Loading questions…
        </Typography>
      </Box>
    );
  }

  /* ---------------- No questions ---------------- */
  if (questions.length === 0) {
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
          No questions available for this level yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* ---------------- Header ---------------- */}
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
          <QuizOutlinedIcon sx={{ fontSize: 22 }} />
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
            Practice questions
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              mt: 0.25,
            }}
          >
            {questions.length} question{questions.length === 1 ? "" : "s"} ·
            answer all to check your score
          </Typography>
        </Box>
      </Box>

      {/* ---------------- Completion banner ---------------- */}
      {completed && progress && (
        <Box
          sx={{
            mt: 3,
            mb: 4,
            p: 3,
            borderRadius: "20px",
            background: isDark
              ? "rgba(34, 197, 94, 0.12)"
              : "rgba(34, 197, 94, 0.08)",
            border: isDark
              ? "1px solid rgba(74, 222, 128, 0.25)"
              : "1px solid rgba(34, 197, 94, 0.2)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette.success.main,
              mb: 0.5,
            }}
          >
            Level Completed
          </Typography>

          <Typography color="text.secondary">
            You already passed this level with a score of {progress.score} (
            {progress.percentage}%).
          </Typography>
        </Box>
      )}

      {/* ---------------- Result banner ---------------- */}
      {result && (
        <Box
          sx={{
            position: "relative",
            mt: 3,
            mb: 4,
            borderRadius: "20px",
            background: brandGradient,
            color: "#fff",
            p: { xs: 3, md: 3.5 },
            overflow: "hidden",
            boxShadow:
              "0 24px 48px -24px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.18)",
                border: "1px solid rgba(255,255,255,0.28)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <EmojiEventsOutlinedIcon
                sx={{ fontSize: 28, color: "#fff" }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                  opacity: 0.85,
                  mb: 0.25,
                }}
              >
                Your result
              </Typography>

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.3rem", md: "1.6rem" },
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                }}
              >
                {result.score} / {result.total} correct · {result.percentage}%
              </Typography>
            </Box>

            <CheckCircleRoundedIcon
              sx={{ fontSize: 40, color: "#fff", opacity: 0.9 }}
            />
          </Box>
        </Box>
      )}

      {/* ---------------- Questions ---------------- */}
      <Box sx={{ mt: 3 }}>
        {questions.map((question, index) => (
          <Box key={question.id}>
            <Box sx={{ py: 3 }}>
              {/* Question number + text */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.75,
                  mb: 2.5,
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    flexShrink: 0,
                    borderRadius: "10px",
                    background: brandSoft,
                    border: `1px solid ${brandBorder}`,
                    color: theme.palette.primary.main,
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                  }}
                >
                  {index + 1}
                </Box>

                <Typography
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1rem", md: "1.08rem" },
                    letterSpacing: "-0.3px",
                    color: theme.palette.text.primary,
                    lineHeight: 1.55,
                    pt: 0.25,
                  }}
                >
                  {question.question}
                </Typography>
              </Box>

              {/* MCQ */}
              {question.questionType === "MCQ" && question.options && (
                <RadioGroup
                  value={answers[question.id] || ""}
                  onChange={(event) =>
                    handleSingleAnswerChange(question.id, event.target.value)
                  }
                  sx={{ pl: { xs: 0, md: 6 } }}
                >
                  {question.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      disabled={completed}
                      control={<Radio sx={radioSx} />}
                      label={option}
                      sx={{
                        mb: 0.5,
                        "& .MuiFormControlLabel-label": optionLabelSx,
                      }}
                    />
                  ))}
                </RadioGroup>
              )}

              {/* MULTIPLE SELECT */}
              {question.questionType === "MULTIPLE_SELECT" &&
                question.options && (
                  <Box sx={{ pl: { xs: 0, md: 6 } }}>
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.4px",
                        textTransform: "uppercase",
                        color: theme.palette.secondary.main,
                        mb: 1,
                      }}
                    >
                      Select all that apply
                    </Typography>

                    {question.options.map((option) => {
                      const selected = (
                        (answers[question.id] as string[]) || []
                      ).includes(option);

                      return (
                        <FormControlLabel
                          key={option}
                          disabled={completed}
                          control={
                            <Checkbox
                              checked={selected}
                              onChange={() =>
                                handleMultipleSelectChange(
                                  question.id,
                                  option,
                                )
                              }
                              sx={checkboxSx}
                            />
                          }
                          label={option}
                          sx={{
                            mb: 0.5,
                            display: "flex",
                            "& .MuiFormControlLabel-label": optionLabelSx,
                          }}
                        />
                      );
                    })}
                  </Box>
                )}

              {/* TRUE / FALSE */}
              {question.questionType === "TRUE_FALSE" && (
                <RadioGroup
                  value={answers[question.id] || ""}
                  onChange={(event) =>
                    handleSingleAnswerChange(question.id, event.target.value)
                  }
                  sx={{ pl: { xs: 0, md: 6 } }}
                >
                  <FormControlLabel
                    value="true"
                    disabled={completed}
                    control={<Radio sx={radioSx} />}
                    label="True"
                    sx={{
                      mb: 0.5,
                      "& .MuiFormControlLabel-label": optionLabelSx,
                    }}
                  />

                  <FormControlLabel
                    value="false"
                    disabled={completed}
                    control={<Radio sx={radioSx} />}
                    label="False"
                    sx={{
                      mb: 0.5,
                      "& .MuiFormControlLabel-label": optionLabelSx,
                    }}
                  />
                </RadioGroup>
              )}
            </Box>

            {/* Divider between questions */}
            {index < questions.length - 1 && (
              <Divider
                sx={{
                  borderColor: theme.palette.divider,
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* ---------------- Submit ---------------- */}
      <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={submitting || completed}
          disableElevation
          sx={{
            px: 4,
            py: 1.3,
            borderRadius: "14px",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "-0.1px",
            textTransform: "none",
            background: brandGradient,
            backgroundSize: "200% 200%",
            color: "#fff",
            boxShadow:
              "0 12px 24px -10px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
            transition: "all 0.3s ease",

            "&:hover": {
              backgroundPosition: "100% 50%",
              boxShadow:
                "0 16px 32px -10px rgba(139, 92, 246, 0.85), inset 0 1px 0 rgba(255,255,255,0.3)",
              transform: "translateY(-1px)",
            },

            "&:disabled": {
              background: isDark
                ? "rgba(148, 163, 184, 0.22)"
                : "linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 100%)",
              color: isDark
                ? "rgba(255, 255, 255, 0.45)"
                : "#fff",
            },
          }}
        >
          {submitting ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Submit Answers"
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default Questions;
