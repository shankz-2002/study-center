import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/publicpages/Home";
import Register from "./pages/publicpages/Register";
import Login from "./pages/publicpages/Login";
import Navbar from "./components/Navbar";
import ProtectedRouteLayout from "./layout/ProtectedRouteLayout";
import Field from "./pages/privatepages/Field";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />

                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRouteLayout />}>
                    <Route path="/fields/:id" element={<Field />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;