import {
  Box,
  Button,
  Container,
  FormControl,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "row",
  },
}));

const AddDepartment = ({ fetchDepartments }) => {
  const classes = useStyles();

  const DEPARTMENTS_REST_API_URL = "http://localhost:8080//departments";

  const [department, setDepartment] = useState({ name: "" });
  const [error, setError] = useState("");
  const [activeForm, setActiveForm] = useState(false);

  const toggleActiveForm = () => {
    setActiveForm(!activeForm);
  };

  const sendDepartment = async () => {
    try {
      const response = await axios.post(DEPARTMENTS_REST_API_URL, department);
      console.log(response);
      fetchDepartments();
      toggleActiveForm();
      setDepartment({ name: "" });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <FormControl>
      {activeForm ? (
        <>
          <TextField
            margin={"normal"}
            // fullWidth={true}
            id="outlined-basic"
            label="Department name:"
            variant="outlined"
            required={true}
            value={department.name}
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
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            margin={"normal"}
            color="secondary"
            onClick={() => toggleActiveForm()}
          >
            Add Department
          </Button>
        </>
      )}
    </FormControl>
  );
};

export default AddDepartment;
