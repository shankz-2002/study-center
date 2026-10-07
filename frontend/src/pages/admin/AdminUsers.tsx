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

import type { RoleType, User } from "../../types/User";
import { getUsers, editUser, deleteUser } from "../../services/user";

import { toast } from "react-toastify";
import type { ApiError } from "../../types/Error";
import AdminModal from "../../components/admin/AdminModal";
function AdminUsers() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await getUsers();

        if (response?.data) {
          setUsers(response.data.users);
        }
      } catch (error) {
        const err = error as ApiError;

        toast.error(err.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    if (saving) return;

    setOpen(false);
    setSelectedUser(null);
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!selectedUser) return;

    try {
      setSaving(true);

      const response = await editUser(
        selectedUser.id,
        data.role as RoleType,
      );

      if (response?.data?.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id
              ? {
                  ...user,
                  role: data.role as User["role"],
                }
              : user,
          ),
        );

        toast.success("User role updated successfully");

        setOpen(false);
        setSelectedUser(null);
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to update user role");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));

      toast.success("User deleted successfully");
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message || "Failed to delete user");
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
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Users
      </Typography>

      {users.length === 0 ? (
        <Typography color="text.secondary">No users found.</Typography>
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
          {users.map((userItem) => (
            <Card key={userItem.id}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {userItem.firstName} {userItem.lastName}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2">
                  <strong>Email:</strong> {userItem.email}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Role:</strong> {userItem.role}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(userItem)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(userItem.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {open && selectedUser && (
        <AdminModal
          key={selectedUser.id}
          open={open}
          title="Edit User Role"
          loading={saving}
          onClose={handleClose}
          onSubmit={handleSubmit}
          initialData={{
            role: selectedUser.role,
          }}
          fields={[
            {
              name: "role",
              label: "Role",
              type: "select",
              required: true,
              options: [
                {
                  label: "User",
                  value: "USER",
                },
                {
                  label: "Admin",
                  value: "ADMIN",
                },
              ],
            },
          ]}
        />
      )}
    </Box>
  );
}

export default AdminUsers;
