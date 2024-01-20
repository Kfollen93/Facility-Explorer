import React, { useState } from "react";
import { Button, Container, Paper, TextField } from "@mui/material";
import GenericModal from "./GenericModal";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLogin = () => {
    onLogin(email, password);
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
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
    <Container>
      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "#AC8CCC" }}
        onClick={() => setIsModalOpen(true)}
      >
        Admin Login
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
