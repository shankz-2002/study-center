import { useEffect, useState } from "react";

import type { Question, QuestionTypeProps } from "../types/Question";

import { getQuestions } from "../services/question";

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
} from "@mui/material";

function Questions({ levelId }: QuestionTypeProps) {
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

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

  // For MCQ and TRUE_FALSE
  const handleSingleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // For MULTIPLE_SELECT
  const handleMultipleSelectChange = (questionId: string, option: string) => {
    setAnswers((prev) => {
      const currentAnswers = (prev[questionId] as string[]) || [];

      const alreadySelected = currentAnswers.includes(option);

      const newAnswers = alreadySelected
        ? currentAnswers.filter((item) => item !== option)
        : [...currentAnswers, option];

      return {
        ...prev,
        [questionId]: newAnswers,
      };
    });
  };

  // Loading
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // No questions
  if (questions.length === 0) {
    return (
      <Typography color="text.secondary">
        No questions available for this level.
      </Typography>
    );
  }

  // Submit answers
  const handleSubmit = () => {
    console.log(answers);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <Typography variant="h4">Questions</Typography>
      </Box>
      {questions.map((question, index) => (
        <Box
          key={question.id}
          sx={{
            mb: 5,
            p: 3,
            border: "1px solid #e0e0e0",
            borderRadius: 2,
          }}
        >
          {/* Question */}

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 3,
            }}
          >
            {index + 1}. {question.question}
          </Typography>

          {/* MCQ */}
          {question.questionType === "MCQ" && question.options && (
            <RadioGroup
              value={answers[question.id] || ""}
              onChange={(event) =>
                handleSingleAnswerChange(question.id, event.target.value)
              }
            >
              {question.options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          )}

          {/* MULTIPLE SELECT */}
          {question.questionType === "MULTIPLE_SELECT" && question.options && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
                      />
                    }
                    label={option}
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
            >
              <FormControlLabel value="true" control={<Radio />} label="True" />

              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          )}
        </Box>
      ))}

      {/* Submit */}
      <Button variant="contained" onClick={handleSubmit}>
        Submit Answers
      </Button>
    </Box>
  );
}

export default Questions;
