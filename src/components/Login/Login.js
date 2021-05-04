import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const SIGN_IN_REST_API_URL = "http://localhost:8080/sign-in";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });

  const sendLoginForm = async () => {
    let validInput = validateLoginData(email, password);
    if (validInput) {
      try {
        const response = await axios.post(SIGN_IN_REST_API_URL, {
          email: email,
          password: password,
        });
        console.log(response);
      } catch (apiError) {
        console.log(error);
        setError({
          ...error,
          email: apiError.response.data.message,
          password: apiError.response.data.message,
        });
      }
    }
  };

  const validateLoginData = (emailInput, passwordInput) => {
    let valid = true;
    let inputError = { email: "", password: "" };

    if (emailInput === "") {
      valid = false;
      inputError = { ...inputError, email: "Required field." };
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = re.test(String(emailInput).toLowerCase());
      if (result === false) {
        valid = false;
        inputError = { ...inputError, email: "Invalid email format." };
      }
    }
    if (passwordInput === "") {
      valid = false;
      inputError = { ...inputError, password: "Required field." };
    }
    setError(inputError);

    return valid;
  };

  return (
    <Container>
      <Paper elevation={2}>
        <Box p={5}>
          <Typography variant="h3">Login</Typography>
          <FormControl fullWidth={true}>
            <TextField
              label="Email address"
              variant="outlined"
              required={true}
              margin={"normal"}
              id="outlined-basic"
              onChange={(event) => {
                setEmail(event.target.value);
                setError({ ...error, email: "" });
              }}
              error={error.email !== "" ? true : false}
              helperText={error.email}
            />
            <TextField
              label="Password"
              variant="outlined"
              required={true}
              margin={"normal"}
              id="outlined-basic"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
                setError({ ...error, password: "" });
              }}
              error={error.password !== "" ? true : false}
              helperText={error.password}
            />
          </FormControl>
          <ButtonGroup
            orientation="vertical"
            variant="outlined"
            color="secondary"
          >
            <Button
              type="submit"
              onClick={() => {
                sendLoginForm();
              }}
            >
              Login
            </Button>
            <Button
              type="submit"
              onClick={(event) => {
                console.log(email, password);
              }}
            >
              Sign Up
            </Button>
          </ButtonGroup>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
