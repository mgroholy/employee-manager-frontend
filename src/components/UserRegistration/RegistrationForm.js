import React, { useState } from "react";
import axios from "axios";
import { makeStyles, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const USER_REST_API_URL = "http://localhost:8080/sign-up";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
  message: {
    color: "red",
  },
}));

const RegistrationForm = ({ handleClose }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendUserData();
  };

  const sendUserData = async () => {
    try {
      const data = {
        email: email,
        password: password,
      };
      await axios.post(USER_REST_API_URL, data);
      setMessage("Successful registration, you can sign in now!");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography variant="h4">Sign up</Typography>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirm password"
        variant="filled"
        type="password"
        required
        value={confirmedPassword}
        onChange={(e) => setConfirmedPassword(e.target.value)}
      />
      <div className={classes.message}>{message}</div>
      <div>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="outlined" color="secondary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
