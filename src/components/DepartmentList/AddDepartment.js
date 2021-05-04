import { Button, FormControl, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  closeIcon: {
    cursor: "pointer",
  },
}));

const AddDepartment = ({ fetchDepartments }) => {
  const classes = useStyles();

  const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";

  const [department, setDepartment] = useState({ name: "" });
  const [error, setError] = useState("");
  const [activeForm, setActiveForm] = useState(false);

  const toggleActiveForm = () => {
    setActiveForm(!activeForm);
  };

  const sendDepartment = async () => {
    if (department.name !== "") {
      try {
        const response = await axios.post(
          DEPARTMENTS_REST_API_URL,
          department,
          { withCredentials: true }
        );
        console.log(response);
        fetchDepartments();
        toggleActiveForm();
        setDepartment({ name: "" });
      } catch (error) {
        setError(error.response.data.message);
      }
    } else {
      setError("Required field.");
    }
  };

  return (
    <>
      {activeForm ? (
        <>
          <FormControl>
            <TextField
              margin={"normal"}
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
          </FormControl>
          <CloseIcon
            className={classes.closeIcon}
            onClick={() => toggleActiveForm()}
          />
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
    </>
  );
};

export default AddDepartment;
