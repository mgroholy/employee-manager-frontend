import {
  Box,
  Button,
  Container,
  FormControl,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import CustomTextField from "../AddEmployee/CustomTextField";
import { UserContext } from "../Security/UserContext";
import ModalDialog from "../UserRegistration/ModalDialog";

const useStyles = makeStyles(() => ({
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: "10px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const SIGN_IN_REST_API_URL = "http://localhost:8080/sign-in";

  const history = useHistory();
  const { setUser, setRoles } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const sendLoginForm = async () => {
    let validInput = validateLoginData(inputData.email, inputData.password);
    if (validInput) {
      try {
        const response = await axios.post(
          SIGN_IN_REST_API_URL,
          {
            email: inputData.email,
            password: inputData.password,
          },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setUser(response.data.username);
          setRoles(response.data.authorities);
          history.push("/");
        }
      } catch (apiError) {
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Paper elevation={2}>
        <Box p={5}>
          <Typography variant="h3">Login</Typography>
          <FormControl fullWidth={true}>
            <CustomTextField
              label="Email address"
              setError={setError}
              error={error}
              fieldName="email"
              setEmployee={setInputData}
              employee={inputData}
            />
            <CustomTextField
              label="Password"
              setError={setError}
              error={error}
              fieldName="password"
              setEmployee={setInputData}
              employee={inputData}
              type="password"
            />
          </FormControl>
          <Box className={classes.buttonGroup} orientation="horizontal">
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
              type="submit"
              onClick={() => {
                sendLoginForm();
              }}
            >
              Login
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              color="default"
              type="submit"
              onClick={handleOpen}
            >
              Sign Up
            </Button>
            <ModalDialog open={open} handleClose={handleClose} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
