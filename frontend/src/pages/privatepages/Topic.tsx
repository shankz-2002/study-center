import { useEffect, useState } from "react";
import type { Level } from "../../types/Level";
import { useParams } from "react-router-dom";
import { getLevels } from "../../services/level";
import type { ApiError } from "../../types/Error";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";
import LevelSideBar from "../../components/LevelSideBar";

function Topic() {
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const response = await getLevels(id!);
        if (response.data.success) {
          const fetchedLevels = response.data.levels;

          setLevels(fetchedLevels);
          if (fetchedLevels.length > 0) {
            setSelectedLevel(fetchedLevels[0]);
          }
        }
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.data?.message || "Failed to fetch levels");
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, [id]);

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
    <Box sx={{ display: "flex" }}>
      <LevelSideBar
        levels={levels}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
      />

      <Box sx={{ flex: 1, p: 4 }}>
        {selectedLevel ? (
          <>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              {selectedLevel.levelName}
            </Typography>

            <Typography color="text.secondary">
              {selectedLevel.description}
            </Typography>
          </>
        ) : (
          <Typography color="text.secondary">No levels available.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Topic;
