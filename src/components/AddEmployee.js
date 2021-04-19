import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { sizing } from "@material-ui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  formErrorText: {
    color: "red",
  },
}));

const AddEmployee = () => {
  const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    department: "",
    position: "",
    clearanceLevel: "",
    phoneNumber: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    department: "",
    position: "",
    clearanceLevel: "",
    phoneNumber: "",
  });

  const [departments, setDepartments] = useState([]);

  const classes = useStyles();

  const sendEmployee = () => {
    const employeeData = {
      Name: employee.name,
      Email: employee.email,
      Department: employee.department,
      "Phone number": employee.phoneNumber,
      "Date of birth": employee.dateOfBirth,
      "Clearance level": employee.clearanceLevel.toUpperCase(),
      Position: employee.position,
    };

    let validForm = validateFormData(employeeData);

    if (validForm) {
      sendRequest(employeeData);
    }
  };

  const validateFormData = (data) => {
    let valid = true;
    let fieldErrors = error;
    if (data.Name === "") {
      fieldErrors = { ...fieldErrors, name: "Required field." };
      valid = false;
    }
    if (data.Email === "") {
      fieldErrors = { ...fieldErrors, email: "Required field." };
      valid = false;
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = re.test(String(data.Email).toLowerCase());
      if (result === false) {
        valid = false;
        fieldErrors = { ...fieldErrors, email: "Invalid email format." };
      }
    }
    if (data.Department === "") {
      fieldErrors = { ...fieldErrors, department: "Required field." };
      valid = false;
    }
    if (data["Date of birth"] === "") {
      fieldErrors = { ...fieldErrors, dateOfBirth: "Required field." };
      valid = false;
    }
    if (data["Clearance level"] === "") {
      fieldErrors = { ...fieldErrors, clearanceLevel: "Required field." };
      valid = false;
    }
    if (data.Position === "") {
      fieldErrors = { ...fieldErrors, position: "Required field." };
      valid = false;
    }
    if (data["Phone number"] === "") {
      fieldErrors = { ...fieldErrors, phoneNumber: "Required field." };
      valid = false;
    } else {
      if (!data["Phone number"].match("^[0-9]+$")) {
        fieldErrors = { ...fieldErrors, phoneNumber: "Invalid input." };
        valid = false;
      } else if (data["Phone number"].length !== 11) {
        fieldErrors = {
          ...fieldErrors,
          phoneNumber: "Invalid input. Phone number wrong lenght.",
        };
        valid = false;
      }
    }
    setError(fieldErrors);
    return valid;
  };

  const history = useHistory();

  const sendRequest = async (employee) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/employees",
        employee
      );
      history.push(`/employees/${response.data.ID}`);
    } catch (apiError) {
      setError({ ...error, email: apiError.response.data.message });
    }
  };

  const fetchDepartments = async () => {
    const response = await axios.get(DEPARTMENTS_REST_API_URL);
    setDepartments(response.data);
  };

  useEffect(() => fetchDepartments(), []);

  return (
    <Container>
      <Paper elevation={2}>
        <Box p={5}>
          <Typography variant="h3">Add employee</Typography>

          <FormControl fullWidth={true}>
            <form>
              <Box paddingTop={3}>
                <TextField
                  margin={"normal"}
                  fullWidth={true}
                  id="outlined-basic"
                  label="Employee name:"
                  variant="outlined"
                  required={true}
                  onChange={(event) => {
                    setError({ ...error, name: "" });
                    setEmployee({ ...employee, name: event.target.value });
                  }}
                  helperText={error.name}
                  error={error.name !== ""}
                />
                <TextField
                  margin={"normal"}
                  fullWidth={true}
                  id="outlined-basic"
                  label="Email:"
                  variant="outlined"
                  required={true}
                  type="email"
                  onChange={(event) => {
                    setError({ ...error, email: "" });
                    setEmployee({ ...employee, email: event.target.value });
                  }}
                  helperText={error.email}
                  error={error.email !== ""}
                />
                <TextField
                  margin={"normal"}
                  fullWidth={true}
                  id="outlined-basic"
                  label="Date of birth:"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required={true}
                  onChange={(event) => {
                    setError({ ...error, dateOfBirth: "" });
                    setEmployee({
                      ...employee,
                      dateOfBirth: event.target.value,
                    });
                  }}
                  helperText={error.dateOfBirth}
                  error={error.dateOfBirth !== ""}
                />
                <FormControl
                  variant="outlined"
                  fullWidth={true}
                  margin={"normal"}
                >
                  <InputLabel id="department-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="department-select-label"
                    id="department-select"
                    defaultValue={""}
                    error={error.department !== ""}
                    onChange={(event) => {
                      setError({ ...error, department: "" });
                      setEmployee({
                        ...employee,
                        department: event.target.value,
                      });
                    }}
                    label="Department"
                  >
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.name}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText className={classes.formErrorText}>
                    {error.department}
                  </FormHelperText>
                </FormControl>
                <TextField
                  margin={"normal"}
                  fullWidth={true}
                  id="outlined-basic"
                  label="Phone number:"
                  variant="outlined"
                  required={true}
                  type="tel"
                  onChange={(event) => {
                    setError({ ...error, phoneNumber: "" });
                    setEmployee({
                      ...employee,
                      phoneNumber: event.target.value,
                    });
                  }}
                  helperText={error.phoneNumber}
                  error={error.phoneNumber !== ""}
                />
                <TextField
                  margin={"normal"}
                  fullWidth={true}
                  id="outlined-basic"
                  label="Clearance Level:"
                  variant="outlined"
                  required={true}
                  onChange={(event) => {
                    setError({ ...error, clearanceLevel: "" });
                    setEmployee({
                      ...employee,
                      clearanceLevel: event.target.value,
                    });
                  }}
                  helperText={error.clearanceLevel}
                  error={error.clearanceLevel !== ""}
                />
                <TextField
                  margin={"normal"}
                  fullWidth={true}
                  id="outlined-basic"
                  label="Position:"
                  variant="outlined"
                  required={true}
                  onChange={(event) => {
                    setError({ ...error, position: "" });
                    setEmployee({ ...employee, position: event.target.value });
                  }}
                  helperText={error.position}
                  error={error.position !== ""}
                />
                <Button
                  variant="outlined"
                  margin={"normal"}
                  color="secondary"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    sendEmployee();
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddEmployee;
