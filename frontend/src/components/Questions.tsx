import { useEffect, useState } from "react";
import type { Question, QuestionTypeProps } from "../types/Question";
import { checkAnswer, getQuestions } from "../services/question";
import type { ApiError } from "../types/Error";
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
} from "@mui/material";
import type { QuizResult } from "../types/Answer";

import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

function Questions({ levelId }: QuestionTypeProps) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  // ---- Design tokens ----
  const brandGradient =
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)";

  const handleSingleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleMultipleSelectChange = (questionId: string, option: string) => {
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
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: "1px solid rgba(15, 23, 42, 0.06)",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography sx={{ color: "#64748b", fontWeight: 500 }}>
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
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            Practice questions
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontWeight: 500, mt: 0.25 }}
          >
            {questions.length} question{questions.length === 1 ? "" : "s"} ·
            answer all to check your score
          </Typography>
        </Box>
      </Box>

      {/* ---------------- Result banner (after submit) ---------------- */}
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
              <EmojiEventsOutlinedIcon sx={{ fontSize: 28, color: "#fff" }} />
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

      {/* ---------------- Questions (single flowing page) ---------------- */}
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
                    background: "rgba(99, 102, 241, 0.10)",
                    border: "1px solid rgba(99, 102, 241, 0.18)",
                    color: "#4f46e5",
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
                    color: "#0f172a",
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
                      control={
                        <Radio
                          sx={{
                            color: "#94a3b8",
                            "&.Mui-checked": { color: "#6366f1" },
                          }}
                        />
                      }
                      label={option}
                      sx={{
                        mb: 0.5,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.95rem",
                          color: "#334155",
                        },
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
                        color: "#8b5cf6",
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
                          control={
                            <Checkbox
                              checked={selected}
                              onChange={() =>
                                handleMultipleSelectChange(question.id, option)
                              }
                              sx={{
                                color: "#94a3b8",
                                "&.Mui-checked": { color: "#8b5cf6" },
                              }}
                            />
                          }
                          label={option}
                          sx={{
                            mb: 0.5,
                            display: "flex",
                            "& .MuiFormControlLabel-label": {
                              fontSize: "0.95rem",
                              color: "#334155",
                            },
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
                    control={
                      <Radio
                        sx={{
                          color: "#94a3b8",
                          "&.Mui-checked": { color: "#6366f1" },
                        }}
                      />
                    }
                    label="True"
                    sx={{
                      mb: 0.5,
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.95rem",
                        color: "#334155",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        sx={{
                          color: "#94a3b8",
                          "&.Mui-checked": { color: "#6366f1" },
                        }}
                      />
                    }
                    label="False"
                    sx={{
                      mb: 0.5,
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.95rem",
                        color: "#334155",
                      },
                    }}
                  />
                </RadioGroup>
              )}
            </Box>

            {/* Divider between questions (not after the last) */}
            {index < questions.length - 1 && (
              <Divider sx={{ borderColor: "rgba(15, 23, 42, 0.08)" }} />
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
          disabled={submitting}
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
              background: "linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 100%)",
              color: "#fff",
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
