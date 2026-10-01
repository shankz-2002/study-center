import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/useAuth";

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                
                {/* Logo / Website name */}
                <Typography
                    variant="h6"
                    component="a"
                    href="/home"
                    sx={{
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: "bold",
                    }}
                >
                    LearnHub
                </Typography>

                {/* Navigation */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                        href="/home"
                        sx={{ color: "white" }}
                    >
                        Home
                    </Button>

                    {user ? (
                        <>
                            <Button
                                href="/profile"
                                sx={{ color: "white" }}
                            >
                                Profile
                            </Button>

                            <Button
                                onClick={logout}
                                sx={{ color: "white" }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button
                            href="/login"
                            sx={{ color: "white" }}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;