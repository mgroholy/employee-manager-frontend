import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

const Login = () => {
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
            />
            <TextField
              label="Password"
              variant="outlined"
              required={true}
              margin={"normal"}
              id="outlined-basic"
              type="password"
            />
          </FormControl>
          <Button
            variant="outlined"
            margin={"normal"}
            color="secondary"
            type="submit"
            onClick={(event) => {
              console.log("click");
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
