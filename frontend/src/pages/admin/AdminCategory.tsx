
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { toast } from "react-toastify";

import type { Category } from "../../types/Category";
import type { ApiError } from "../../types/Error";

import { getCategories } from "../../services/category";

function AdminCategory() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await getCategories();

        if (response?.data?.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        const err = error as ApiError;

        toast.error(err.data?.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
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
        Categories
      </Typography>

      {categories?.length === 0 ? (
        <Typography color="text.secondary">No categories found.</Typography>
      ) : (
        categories?.map((category) => (
          <Box key={category.id} sx={{ mb: 2 }}>
            <Typography variant="h6">{category.categoryName}</Typography>

            <Typography color="text.secondary">
              {category.description}
            </Typography>

            <Typography color="text.secondary">
              Field: {category.field?.fieldName || "Not assigned"}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
}

export default AdminCategory;
