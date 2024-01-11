import React, { useState } from "react";
import { Button, Container, Paper, TextField } from "@mui/material";
import GenericModal from "./GenericModal";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLogin = () => {
    onLogin(username, password);
    setIsModalOpen(false);
  };

  const renderModalContent = () => (
    <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
      <h2>Admin Login</h2>
      <form>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
    </Paper>
  );

  return (
    <Container component="main" maxWidth="xs">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Login
      </Button>

      <GenericModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        anyComponent={renderModalContent()}
      />
    </Container>
  );
};

export default Login;