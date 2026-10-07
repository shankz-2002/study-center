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
import { toast } from "react-toastify";

import type { Field, FieldData } from "../../types/Field";
import type { ApiError } from "../../types/Error";

import {
  getFields,
  createField,
  updateField,
  deleteField,
} from "../../services/field";

import AdminModal from "../../components/admin/AdminModal";
import type { FormField } from "../../types/AdminModal";

export function AdminFields() {
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<Field[]>([]);

  const [open, setOpen] = useState(false);

  const [selectedField, setSelectedField] = useState<Field | null>(null);

  const [modalLoading, setModalLoading] = useState(false);

  const formFields: FormField[] = [
    {
      name: "fieldName",
      label: "Field Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
  ];

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await getFields();

        if (response.data.success) {
          setFields(response.data.fields);
        }
      } catch (error) {
        const err = error as ApiError;

        toast.error(err.data?.message || "Failed to fetch fields");
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  const handleCreate = () => {
    setSelectedField(null);
    setOpen(true);
  };

  const handleEdit = (field: Field) => {
    setSelectedField(field);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedField(null);
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      setModalLoading(true);
      const fieldData: FieldData = {
        fieldName: data.fieldName as string,
        description: data.description as string,
      };

      if (selectedField) {
        await updateField(selectedField.id, fieldData);

        toast.success("Field updated successfully");
      } else {
        await createField(fieldData);

        toast.success("Field created successfully");
      }

      handleClose();

      // Refresh fields after create/update
      const response = await getFields();

      if (response.data.success) {
        setFields(response.data.fields);
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to save field");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this field?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteField(id);

      toast.success("Field deleted successfully");

      const response = await getFields();

      if (response.data.success) {
        setFields(response.data.fields);
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to delete field");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Fields
        </Typography>

        <Button variant="contained" onClick={handleCreate}>
          Create Field
        </Button>
      </Box>

      {/* Fields */}
      {fields.length === 0 ? (
        <Typography color="text.secondary">No fields found.</Typography>
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
          {fields.map((field) => (
            <Card key={field.id}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {field.fieldName}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    mb: 2,
                  }}
                >
                  {field.description}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button variant="outlined" onClick={() => handleEdit(field)}>
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(field.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Create / Edit Modal */}
      <AdminModal
        key={selectedField?.id ?? "create"}
        open={open}
        title={selectedField ? "Edit Field" : "Create Field"}
        fields={formFields}
        initialData={
          selectedField
            ? {
                fieldName: selectedField.fieldName,
                description: selectedField.description,
              }
            : undefined
        }
        loading={modalLoading}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
