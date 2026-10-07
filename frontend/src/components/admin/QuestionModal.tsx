import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  TextField,
  Checkbox,
  ListItemText,
} from "@mui/material";

import type { QuestionModalProps, QuestionType } from "../../types/Question";

function QuestionModal({
  open,
  title,
  levels,
  initialData,
  loading = false,
  onClose,
  onSubmit,
}: QuestionModalProps) {
  const [formQuestion, setFormQuestion] = useState(initialData?.question ?? "");

  const [formQuestionType, setFormQuestionType] = useState<QuestionType>(
    initialData?.questionType ?? "MCQ",
  );

  const [formOptions, setFormOptions] = useState<string[]>(
    initialData?.options ?? ["", ""],
  );

  const [formCorrectAnswer, setFormCorrectAnswer] = useState<string | string[]>(
    initialData?.correctAnswer ?? "",
  );

  const [formExplanation, setFormExplanation] = useState(
    initialData?.explanation ?? "",
  );

  const [formOrder, setFormOrder] = useState(initialData?.order ?? 1);

  const [formLevelId, setFormLevelId] = useState(initialData?.level?.id ?? "");

  const handleQuestionTypeChange = (type: QuestionType) => {
    setFormQuestionType(type);

    if (type === "TRUE_FALSE") {
      setFormOptions(["True", "False"]);
      setFormCorrectAnswer("");
    } else {
      setFormOptions(initialData?.options ?? ["", ""]);
      setFormCorrectAnswer(type === "MULTIPLE_SELECT" ? [] : "");
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    setFormOptions((prev) =>
      prev.map((option, i) => (i === index ? value : option)),
    );
  };

  const addOption = () => {
    setFormOptions((prev) => [...prev, ""]);
  };

  const removeOption = (index: number) => {
    setFormOptions((prev) => prev.filter((_, i) => i !== index));

    if (Array.isArray(formCorrectAnswer)) {
      setFormCorrectAnswer((prev) =>
        Array.isArray(prev)
          ? prev.filter((answer) => answer !== formOptions[index])
          : [],
      );
    }
  };

  const handleSubmit = () => {
    if (!formQuestion.trim()) {
      return;
    }

    if (!formLevelId) {
      return;
    }

    if (formQuestionType !== "TRUE_FALSE") {
      const cleanedOptions = formOptions
        .map((option) => option.trim())
        .filter(Boolean);

      if (cleanedOptions.length < 2) {
        return;
      }

      if (
        formQuestionType === "MULTIPLE_SELECT" &&
        (!Array.isArray(formCorrectAnswer) || formCorrectAnswer.length === 0)
      ) {
        return;
      }

      if (formQuestionType === "MCQ" && typeof formCorrectAnswer !== "string") {
        return;
      }
    }

    if (
      formQuestionType === "TRUE_FALSE" &&
      typeof formCorrectAnswer !== "string"
    ) {
      return;
    }

    onSubmit({
      question: formQuestion.trim(),
      questionType: formQuestionType,
      options:
        formQuestionType === "TRUE_FALSE"
          ? ["True", "False"]
          : formOptions.map((option) => option.trim()).filter(Boolean),
      correctAnswer: formCorrectAnswer,
      explanation: formExplanation.trim() || null,
      order: Number(formOrder),
      levelId: formLevelId,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
          {/* Question */}
          <TextField
            fullWidth
            label="Question"
            value={formQuestion}
            onChange={(event) => setFormQuestion(event.target.value)}
            multiline
            minRows={3}
            required
          />

          {/* Question Type */}
          <FormControl fullWidth>
            <InputLabel>Question Type</InputLabel>

            <Select
              value={formQuestionType}
              label="Question Type"
              onChange={(event) =>
                handleQuestionTypeChange(event.target.value as QuestionType)
              }
            >
              <MenuItem value="MCQ">MCQ</MenuItem>

              <MenuItem value="MULTIPLE_SELECT">Multiple Select</MenuItem>

              <MenuItem value="TRUE_FALSE">True / False</MenuItem>
            </Select>
          </FormControl>

          {/* Options */}
          {formQuestionType !== "TRUE_FALSE" && (
            <Box>
              {formOptions.map((option, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(event) =>
                      handleOptionChange(index, event.target.value)
                    }
                  />

                  <Button
                    color="error"
                    onClick={() => removeOption(index)}
                    disabled={formOptions.length <= 2}
                  >
                    Remove
                  </Button>
                </Box>
              ))}

              <Button variant="outlined" onClick={addOption}>
                Add Option
              </Button>
            </Box>
          )}

          {/* Correct Answer */}
          {formQuestionType === "MCQ" && (
            <FormControl fullWidth>
              <InputLabel>Correct Answer</InputLabel>

              <Select
                value={
                  typeof formCorrectAnswer === "string" ? formCorrectAnswer : ""
                }
                label="Correct Answer"
                onChange={(event) =>
                  setFormCorrectAnswer(event.target.value as string)
                }
              >
                {formOptions
                  .filter((option) => option.trim())
                  .map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          {formQuestionType === "MULTIPLE_SELECT" && (
            <FormControl fullWidth>
              <InputLabel>Correct Answers</InputLabel>

              <Select
                multiple
                value={
                  Array.isArray(formCorrectAnswer) ? formCorrectAnswer : []
                }
                label="Correct Answers"
                onChange={(event) => {
                  const value = event.target.value;

                  setFormCorrectAnswer(
                    typeof value === "string" ? value.split(",") : value,
                  );
                }}
                renderValue={(selected) => (selected as string[]).join(", ")}
              >
                {formOptions
                  .filter((option) => option.trim())
                  .map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox
                        checked={
                          Array.isArray(formCorrectAnswer) &&
                          formCorrectAnswer.includes(option)
                        }
                      />

                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          {formQuestionType === "TRUE_FALSE" && (
            <FormControl>
              <RadioGroup
                value={
                  typeof formCorrectAnswer === "string" ? formCorrectAnswer : ""
                }
                onChange={(event) => setFormCorrectAnswer(event.target.value)}
              >
                <FormControlLabel
                  value="True"
                  control={<Radio />}
                  label="True"
                />

                <FormControlLabel
                  value="False"
                  control={<Radio />}
                  label="False"
                />
              </RadioGroup>
            </FormControl>
          )}

          {/* Explanation */}
          <TextField
            fullWidth
            label="Explanation"
            value={formExplanation}
            onChange={(event) => setFormExplanation(event.target.value)}
            multiline
            minRows={3}
          />

          {/* Order */}
          <TextField
            fullWidth
            label="Order"
            type="number"
            value={formOrder}
            onChange={(event) => setFormOrder(Number(event.target.value))}
            required
          />

          {/* Level */}
          <FormControl fullWidth>
            <InputLabel>Level</InputLabel>

            <Select
              value={formLevelId}
              label="Level"
              onChange={(event) => setFormLevelId(event.target.value)}
              required
            >
              {levels.map((level) => (
                <MenuItem key={level.id} value={level.id}>
                  {level.levelName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
        }}
      >
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QuestionModal;
