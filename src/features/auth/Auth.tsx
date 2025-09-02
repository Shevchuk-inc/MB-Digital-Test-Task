import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockToken = "mock-jwt-token" + "-" + (Math.random() * 100).toFixed();
    login(mockToken);
    navigate("/");
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ padding: 2, marginTop: 10 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "primary.main",
            textAlign: "center",
          }}
        >
          <LockOutlineIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            autoFocus
            value={email}
            sx={{ mb: 2 }}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            type="password"
            value={password}
            placeholder="Email"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            label="Remember me"
            control={<Checkbox value="remember" color="primary" />}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export { Auth };
