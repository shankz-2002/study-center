import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Fields", path: "/admin/fields" },
  { label: "Categories", path: "/admin/categories" },
  { label: "Topics", path: "/admin/topics" },
  { label: "Levels", path: "/admin/levels" },
  { label: "Learning Content", path: "/admin/content" },
  { label: "Questions", path: "/admin/questions" },
  { label: "Users", path: "/admin/users" },
];

function AdminSidebar() {
  return (
    <Box
      sx={{
        width: 250,
        minHeight: "calc(100vh - 64px)",
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
        Admin Panel
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 0.5,

              "&.active": {
                backgroundColor: "primary.main",
                color: "white",

                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default AdminSidebar;
