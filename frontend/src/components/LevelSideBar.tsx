import type { LevelSideBarProps } from "../types/Level";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

function LevelSideBar({
  levels,
  selectedLevel,
  onSelectLevel,
}: LevelSideBarProps) {
  return (
    <Box
      sx={{
        width: 260,
        minHeight: "calc(100vh - 72px)",
        borderRight: "1px solid #e0e0e0",
        p: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        Levels
      </Typography>

      <List>
        {levels.map((level) => (
          <ListItemButton
            key={level.id}
            selected={selectedLevel?.id === level.id}
            onClick={() => onSelectLevel(level)}
            sx={{
              borderRadius: 2,
              mb: 1,
            }}
          >
            <ListItemText
              primary={`Level ${level.order} (${level.levelName})`}
              secondary={level.description}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default LevelSideBar;
