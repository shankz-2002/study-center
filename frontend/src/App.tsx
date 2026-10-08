import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/user/publicpages/Home";
import Register from "./pages/user/publicpages/Register";
import Login from "./pages/user/publicpages/Login";
import ProtectedRouteLayout from "./layout/ProtectedRouteLayout";
import Field from "./pages/user/privatepages/Field";
import { ToastContainer } from "react-toastify";
import Category from "./pages/user/privatepages/Category";
import Topic from "./pages/user/privatepages/Topic";
import Navbar from "./components/Navbar";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import AdminLayout from "./layout/AdminLayout";
import { AdminFields } from "./pages/admin/AdminFields";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminTopic from "./pages/admin/AdminTopic";
import AdminLevel from "./pages/admin/AdminLevel";
import AdminContents from "./pages/admin/AdminContents";
import AdminQuestions from "./pages/admin/AdminQuestions";
import AdminUsers from "./pages/admin/AdminUsers";
import ForgottenPassword from "./pages/user/publicpages/ForgottenPassword";
import Profile from "./pages/user/privatepages/Profile";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgottenPassword/>}/>

        <Route
          element={<ProtectedRouteLayout allowedRoles={["ADMIN", "USER"]} />}
        >
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/fields/:id" element={<Field />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/topics/:id" element={<Topic />} />
        </Route>

        <Route element={<ProtectedRouteLayout allowedRoles={["ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashBoard />} />
            <Route path="/admin/fields" element={<AdminFields />} />
            <Route path="/admin/categories" element={<AdminCategory />} />
            <Route path="/admin/topics" element={<AdminTopic />} />
            <Route path="/admin/levels" element={<AdminLevel />} />
            <Route path="/admin/contents" element={<AdminContents />} />
            <Route path="/admin/questions" element={<AdminQuestions />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
