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

import type { Category, CategoryData } from "../../types/Category";
import type { Field } from "../../types/Field";
import type { ApiError } from "../../types/Error";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category";

import { getFields } from "../../services/field";

import AdminModal from "../../components/admin/AdminModal";
import type { FormField } from "../../types/AdminModal";

function AdminCategory() {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  const [fields, setFields] = useState<Field[]>([]);

  const [open, setOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [modalLoading, setModalLoading] = useState(false);

  const formFields: FormField[] = [
    {
      name: "categoryName",
      label: "Category Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "fieldId",
      label: "Field",
      type: "select",
      required: true,
      options: fields.map((field) => ({
        label: field.fieldName,
        value: field.id,
      })),
    },
  ];

  /*
   * Fetch categories and fields
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, fieldsResponse] = await Promise.all([
          getCategories(),
          getFields(),
        ]);

        if (categoriesResponse.data.success) {
          setCategories(categoriesResponse.data.categories);
        }

        if (fieldsResponse.data.success) {
          setFields(fieldsResponse.data.fields);
        }
      } catch (error) {
        const err = error as ApiError;

        toast.error(err.data?.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /*
   * Create
   */
  const handleCreate = () => {
    setSelectedCategory(null);
    setOpen(true);
  };

  /*
   * Edit
   */
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  /*
   * Close modal
   */
  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  /*
   * Create / Update
   */
  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      setModalLoading(true);

      const categoryData: CategoryData = {
        categoryName: data.categoryName as string,

        description: data.description as string,
      };

      if (selectedCategory) {
        await updateCategory(selectedCategory.id, categoryData);

        toast.success("Category updated successfully");
      } else {
        const fieldId = data.fieldId as string;

        await createCategory(fieldId,categoryData);

        toast.success("Category created successfully");
      }

      handleClose();

      /*
       * Refresh categories
       */
      const response = await getCategories();

      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to save category");
    } finally {
      setModalLoading(false);
    }
  };

  /*
   * Delete
   */
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteCategory(id);

      toast.success("Category deleted successfully");

      const response = await getCategories();

      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  /*
   * Initial loading
   */
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
          Categories
        </Typography>

        <Button variant="contained" onClick={handleCreate}>
          Create Category
        </Button>
      </Box>

      {/* Categories */}
      {categories.length === 0 ? (
        <Typography color="text.secondary">No categories found.</Typography>
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
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {category.categoryName}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    mb: 2,
                  }}
                >
                  {category.description}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Field: {category.field?.fieldName || "Not assigned"}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(category.id)}
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
        key={selectedCategory?.id ?? "create"}
        open={open}
        title={selectedCategory ? "Edit Category" : "Create Category"}
        fields={formFields}
        initialData={
          selectedCategory
            ? {
                categoryName: selectedCategory.categoryName,

                description: selectedCategory.description,

                fieldId: selectedCategory.field?.id ?? "",
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

export default AdminCategory;
