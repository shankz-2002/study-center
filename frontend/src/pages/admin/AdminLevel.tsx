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

import type { Level, LevelData } from "../../types/Level";
import type { Topic } from "../../types/Topic";
import type { ApiError } from "../../types/Error";

import {
  getAllLevels,
  createLevel,
  updateLevel,
  deleteLevel,
} from "../../services/level";

import { getTopics } from "../../services/topic";

import AdminModal from "../../components/admin/AdminModal";
import type { FormField } from "../../types/AdminModal";

function AdminLevel() {
  const [loading, setLoading] = useState(true);

  const [levels, setLevels] = useState<Level[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [open, setOpen] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  const [modalLoading, setModalLoading] = useState(false);

  const formFields: FormField[] = [
    {
      name: "levelName",
      label: "Level Name",
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
      name: "order",
      label: "Order",
      type: "number",
      required: true,
    },
    {
      name: "topicId",
      label: "Topic",
      type: "select",
      required: true,
      options: topics.map((topic) => ({
        label: topic.topicName,
        value: topic.id,
      })),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [levelsResponse, topicsResponse] = await Promise.all([
          getAllLevels(),
          getTopics(),
        ]);

        if (levelsResponse.data.success) {
          setLevels(levelsResponse.data.levels);
        }

        if (topicsResponse.data.success) {
          setTopics(topicsResponse.data.topics);
        }
      } catch (error) {
        const err = error as ApiError;

        toast.error(err.data?.message || "Failed to fetch levels");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = () => {
    setSelectedLevel(null);
    setOpen(true);
  };

  const handleEdit = (level: Level) => {
    setSelectedLevel(level);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLevel(null);
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      setModalLoading(true);

      const levelData: LevelData = {
        levelName: data.levelName as string,
        description: data.description as string,
        order: data.order as number,
      };

      if (selectedLevel) {
        await updateLevel(selectedLevel.id, levelData);

        toast.success("Level updated successfully");
      } else {
        const topicId = data.topicId as string;

        await createLevel(levelData, topicId);

        toast.success("Level created successfully");
      }

      handleClose();

      const response = await getAllLevels();

      if (response.data.success) {
        setLevels(response.data.levels);
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to save level");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this level?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteLevel(id);

      toast.success("Level deleted successfully");

      const response = await getAllLevels();

      if (response.data.success) {
        setLevels(response.data.levels);
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to delete level");
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
          Levels
        </Typography>

        <Button variant="contained" onClick={handleCreate}>
          Create Level
        </Button>
      </Box>

      {/* Levels */}
      {levels.length === 0 ? (
        <Typography color="text.secondary">No levels found.</Typography>
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
          {levels.map((level) => (
            <Card key={level.id}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {level.levelName}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {level.description}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2">
                  <strong>Order:</strong> {level.order}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Topic:</strong>{" "}
                  {level.topic?.topicName || "Not assigned"}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Category:</strong>{" "}
                  {level.topic?.category?.categoryName || "Not assigned"}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Field:</strong>{" "}
                  {level.topic?.category?.field?.fieldName || "Not assigned"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Button variant="outlined" onClick={() => handleEdit(level)}>
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(level.id)}
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
        key={selectedLevel?.id ?? "create"}
        open={open}
        title={selectedLevel ? "Edit Level" : "Create Level"}
        fields={formFields}
        initialData={
          selectedLevel
            ? {
                levelName: selectedLevel.levelName,
                description: selectedLevel.description,
                order: selectedLevel.order,
                topicId: selectedLevel.topic?.id ?? "",
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

export default AdminLevel;
