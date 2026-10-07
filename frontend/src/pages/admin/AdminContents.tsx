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

import type {
  LearningContentType,
  LearningContentData,
} from "../../types/LearningContent";

import type { Level } from "../../types/Level";
import type { ApiError } from "../../types/Error";

import {
  getContents,
  createContent,
  updateContent,
  deleteContent,
} from "../../services/learningContent";

import { getAllLevels } from "../../services/level";

import AdminModal from "../../components/admin/AdminModal";
import type { FormField } from "../../types/AdminModal";

function AdminContents() {
  const [loading, setLoading] = useState(true);

  const [contents, setContents] = useState<
    LearningContentType[]
  >([]);

  const [levels, setLevels] = useState<Level[]>([]);

  const [open, setOpen] = useState(false);

  const [selectedContent, setSelectedContent] =
    useState<LearningContentType | null>(null);

  const [modalLoading, setModalLoading] =
    useState(false);

  const formFields: FormField[] = [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "textarea",
      required: true,
    },
    {
      name: "order",
      label: "Order",
      type: "number",
      required: true,
    },
    {
      name: "levelId",
      label: "Level",
      type: "select",
      required: true,
      options: levels.map((level) => ({
        label: level.levelName,
        value: level.id,
      })),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentsResponse, levelsResponse] =
          await Promise.all([
            getContents(),
            getAllLevels(),
          ]);

        if (contentsResponse.data.success) {
          setContents(contentsResponse.data.contents);
        }

        if (levelsResponse.data.success) {
          setLevels(levelsResponse.data.levels);
        }
      } catch (error) {
        const err = error as ApiError;

        toast.error(
          err.data?.message ||
            "Failed to fetch learning content"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = () => {
    setSelectedContent(null);
    setOpen(true);
  };

  const handleEdit = (
    content: LearningContentType
  ) => {
    setSelectedContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContent(null);
  };

  const handleSubmit = async (
    data: Record<string, unknown>
  ) => {
    try {
      setModalLoading(true);

      const contentData: LearningContentData = {
        title: data.title as string,
        content: data.content as string,
        order: data.order as number,
      };

      if (selectedContent) {
        await updateContent(
          selectedContent.id,
          contentData
        );

        toast.success(
          "Learning content updated successfully"
        );
      } else {
        const levelId = data.levelId as string;

        await createContent(
          contentData,
          levelId
        );

        toast.success(
          "Learning content created successfully"
        );
      }

      handleClose();

      const response = await getContents();

      if (response.data.success) {
        setContents(response.data.contents);
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(
        err.data?.message ||
          "Failed to save learning content"
      );
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this learning content?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteContent(id);

      toast.success(
        "Learning content deleted successfully"
      );

      const response = await getContents();

      if (response.data.success) {
        setContents(response.data.contents);
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(
        err.data?.message ||
          "Failed to delete learning content"
      );
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
        <Typography
          variant="h4"
          sx={{ fontWeight: 700 }}
        >
          Learning Content
        </Typography>

        <Button
          variant="contained"
          onClick={handleCreate}
        >
          Create Content
        </Button>
      </Box>

      {/* Content cards */}
      {contents.length === 0 ? (
        <Typography color="text.secondary">
          No learning content found.
        </Typography>
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
          {contents.map((content) => (
            <Card key={content.id}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {content.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {content.content.length > 150
                    ? `${content.content.substring(
                        0,
                        150
                      )}...`
                    : content.content}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2">
                  <strong>Order:</strong>{" "}
                  {content.order}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  <strong>Level:</strong>{" "}
                  {content.level?.levelName ||
                    "Not assigned"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  <strong>Topic:</strong>{" "}
                  {content.level?.topic?.topicName ||
                    "Not assigned"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  <strong>Category:</strong>{" "}
                  {content.level?.topic?.category
                    ?.categoryName ||
                    "Not assigned"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  <strong>Field:</strong>{" "}
                  {content.level?.topic?.category
                    ?.field?.fieldName ||
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
                    onClick={() =>
                      handleEdit(content)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      handleDelete(content.id)
                    }
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Modal */}
      <AdminModal
        key={selectedContent?.id ?? "create"}
        open={open}
        title={
          selectedContent
            ? "Edit Learning Content"
            : "Create Learning Content"
        }
        fields={formFields}
        initialData={
          selectedContent
            ? {
                title: selectedContent.title,
                content: selectedContent.content,
                order: selectedContent.order,
                levelId:
                  selectedContent.level?.id ?? "",
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

export default AdminContents;