import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import type { AdminModalProps, FormField } from "../../types/AdminModal";

function AdminModal({
  open,
  title,
  fields,
  initialData,
  loading = false,
  onClose,
  onSubmit,
}: AdminModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(
    initialData || {},
  );

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field.name]: field.type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    const data: Record<string, unknown> = {};

    fields.forEach((field) => {
      data[field.name] = formData[field.name] ?? "";
    });

    onSubmit(data);
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
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
          {fields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              value={formData[field.name] ?? ""}
              required={field.required}
              type={field.type === "number" ? "number" : "text"}
              multiline={field.type === "textarea"}
              minRows={field.type === "textarea" ? 4 : undefined}
              select={field.type === "select"}
              onChange={(event) => handleChange(field, event.target.value)}
            >
              {field.type === "select" &&
                field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
          ))}
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

export default AdminModal;
