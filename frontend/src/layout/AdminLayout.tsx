import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminLayout() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminSidebar />

        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default AdminLayout;
