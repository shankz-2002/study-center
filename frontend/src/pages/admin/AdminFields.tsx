import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { toast } from "react-toastify";

import type { Field } from "../../types/Field";
import type { ApiError } from "../../types/Error";

import { getFields } from "../../services/field";

export function AdminFields() {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        setLoading(true);

        const response = await getFields();

        if (response.data.success) {
          setFields(response.data.fields);
        }
      } catch (error) {
        const err = error as ApiError;

        toast.error(
          err.data?.message || "Failed to fetch fields"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

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
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Fields
      </Typography>

      {fields.length === 0 ? (
        <Typography color="text.secondary">
          No fields found.
        </Typography>
      ) : (
        fields.map((field) => (
          <Box key={field.id} sx={{ mb: 2 }}>
            <Typography variant="h6">
              {field.fieldName}
            </Typography>

            <Typography color="text.secondary">
              {field.description}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
}
