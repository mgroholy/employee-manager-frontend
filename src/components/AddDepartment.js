import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";

const AddDepartment = () => {
  const DEPARTMENTS_REST_API_URL = "http://localhost:8080//departments";

  const [department, setDepartment] = useState({ name: "" });
  const [error, setError] = useState("");

  const sendDepartment = async () => {
    try {
      const response = await axios.post(DEPARTMENTS_REST_API_URL, department);
      console.log(response);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Container>
      <Paper elevation={2}>
        <Box p={5}>
          <Typography variant="h3">Add department</Typography>
          <FormControl fullWidth={true}>
            <Box paddingTop={3}>
              <TextField
                margin={"normal"}
                fullWidth={true}
                id="outlined-basic"
                label="Department name:"
                variant="outlined"
                required={true}
                onChange={(event) => {
                  setError("");
                  setDepartment({ ...department, name: event.target.value });
                }}
                helperText={error}
                error={error !== ""}
              />
              <Button
                variant="outlined"
                margin={"normal"}
                color="secondary"
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  sendDepartment();
                }}
              >
                Submit
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddDepartment;
