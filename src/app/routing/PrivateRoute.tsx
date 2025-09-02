import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.tsx";
import ROUTES from "./routes.ts";
import { CircularProgress, Box } from "@mui/material";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.auth} replace />;
};
