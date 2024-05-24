import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import config from "../config";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State to track error messages

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post(`${config.BASE_URL}/api/users/login`, {
        email: inputs.email,
        password: inputs.password,
      });
      return response.data;
    } catch (error) {
      throw new Error("User-Mail or Password Incorrect");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    try {
      const data = await sendRequest();
      if (data) {
        localStorage.setItem("userId", data.user._id);
        dispatch(authActions.login());
        navigate("/blogs");
      }
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
