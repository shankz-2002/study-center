import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

import type {
  AdminQuestion,
  Question,
  QuestionData,
} from "../../types/Question";

import type { Level } from "../../types/Level";

import {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../services/question";

import { getAllLevels } from "../../services/level";

import type { ApiError } from "../../types/Error";
import { toast } from "react-toastify";

import QuestionModal from "../../components/admin/QuestionModal";

function AdminQuestions() {
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);

  const [levels, setLevels] = useState<Level[]>([]);

  const [open, setOpen] = useState(false);

  const [selectedQuestion, setSelectedQuestion] =
    useState<AdminQuestion | null>(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const response = await getAllQuestions();

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [questionsResponse, levelsResponse] = await Promise.all([
          getAllQuestions(),
          getAllLevels(),
        ]);

        if (questionsResponse?.data?.success) {
          setQuestions(questionsResponse.data.questions);
        }

        if (levelsResponse?.data?.success) {
          setLevels(levelsResponse.data.levels);
        }
      } catch (error) {
        const err = error as ApiError;

        toast.error(
          err.data?.message || "Failed to fetch questions and levels",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = () => {
    setSelectedQuestion(null);
    setOpen(true);
  };

  const handleEdit = (question: Question) => {
    setSelectedQuestion(question as AdminQuestion);
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) {
      return;
    }

    setOpen(false);
    setSelectedQuestion(null);
  };

  const handleSubmit = async (data: QuestionData) => {
    try {
      setLoading(true);

      if (selectedQuestion) {
        await updateQuestion(selectedQuestion.id, data);

        toast.success("Question updated successfully");
      } else {
        await createQuestion(data, data.levelId);

        toast.success("Question created successfully");
      }

      setOpen(false);
      setSelectedQuestion(null);

      await fetchQuestions();
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to save question");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteQuestion(id);

      toast.success("Question deleted successfully");

      await fetchQuestions();
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to delete question");
    } finally {
      setLoading(false);
    }
  };

  if (loading && questions.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Questions
        </Typography>

        <Button variant="contained" onClick={handleCreate}>
          Add Question
        </Button>
      </Box>

      {questions.length === 0 ? (
        <Typography color="text.secondary">No questions found.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
            },
            gap: 2,
          }}
        >
          {questions.map((question) => (
            <Card key={question.id}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {question.question}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2">
                  <strong>Type:</strong> {question.questionType}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Order:</strong> {question.order}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Level:</strong>{" "}
                  {question.level?.levelName || "Not assigned"}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Topic:</strong>{" "}
                  {question.level?.topic?.topicName || "Not assigned"}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Category:</strong>{" "}
                  {question.level?.topic?.category?.categoryName ||
                    "Not assigned"}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Field:</strong>{" "}
                  {question.level?.topic?.category?.field?.fieldName ||
                    "Not assigned"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(question)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {open && (
        <QuestionModal
          key={selectedQuestion?.id ?? "create"}
          open={open}
          title={selectedQuestion ? "Edit Question" : "Create Question"}
          levels={levels}
          initialData={selectedQuestion ?? undefined}
          loading={loading}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
    </Box>
  );
}

export default AdminQuestions;
