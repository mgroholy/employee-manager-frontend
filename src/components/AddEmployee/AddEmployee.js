import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddEmployeeDropDown from "./AddEmployeeDropDown";
import AddEmployeeTextField from "./AddEmployeeTextField";

const AddEmployee = () => {
  const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";
  const LEVELS_REST_API_URL = "http://localhost:8080/levels";

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    dateOfHire: "",
    department: "",
    position: "",
    clearanceLevel: "",
    phoneNumber: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    dateOfHire: "",
    department: "",
    position: "",
    clearanceLevel: "",
    phoneNumber: "",
  });

  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);

  const sendEmployee = () => {
    const employeeData = {
      Name: employee.name,
      Email: employee.email,
      Department: employee.department,
      "Phone number": employee.phoneNumber,
      "Date of birth": employee.dateOfBirth,
      "Date of hire": employee.dateOfHire,
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
    if (data["Date of hire"] === "") {
      fieldErrors = { ...fieldErrors, dateOfHire: "Required field." };
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
          phoneNumber: "Invalid input. Phone number wrong length.",
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

  const fetchLevels = async () => {
    const response = await axios.get(LEVELS_REST_API_URL);
    let levels = response.data;
    let levelObjects = [];
    for (let i = 0; i < levels.length; i++) {
      let level = { id: i, name: levels[i] };
      levelObjects.push(level);
    }
    setLevels(levelObjects);
  };

  useEffect(() => {
    fetchDepartments();
    fetchLevels();
  }, []);

  return (
    <Container>
      <Paper elevation={2}>
        <Box p={5}>
          <Typography variant="h3">Add employee</Typography>

          <FormControl fullWidth={true}>
            <form>
              <Box paddingTop={3}>
                <AddEmployeeTextField
                  label="Employee name:"
                  setError={setError}
                  error={error}
                  employee={employee}
                  fieldName={"name"}
                  setEmployee={setEmployee}
                />
                <AddEmployeeTextField
                  label="Email:"
                  setError={setError}
                  error={error}
                  employee={employee}
                  fieldName={"email"}
                  setEmployee={setEmployee}
                />
                <AddEmployeeTextField
                  label="Date of birth:"
                  setError={setError}
                  error={error}
                  employee={employee}
                  fieldName={"dateOfBirth"}
                  setEmployee={setEmployee}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
                <AddEmployeeDropDown
                  label="Department:"
                  setError={setError}
                  error={error}
                  employee={employee}
                  fieldName={"department"}
                  setEmployee={setEmployee}
                  selectOptions={departments}
                />

                <AddEmployeeTextField
                  label="Phone number:"
                  setError={setError}
                  error={error}
                  employee={employee}
                  fieldName={"phoneNumber"}
                  setEmployee={setEmployee}
                />

                <AddEmployeeDropDown
                  label="Clearance level:"
                  setError={setError}
                  error={error}
                  employee={employee}
                  fieldName={"clearanceLevel"}
                  setEmployee={setEmployee}
                  selectOptions={levels}
                />
                <AddEmployeeTextField
                  label="Position:"
                  setError={setError}
                  error={error}
                  employee={employee}
                  fieldName={"position"}
                  setEmployee={setEmployee}
                />
                <AddEmployeeTextField
                  label="Date of hire:"
                  setError={setError}
                  error={error}
                  employee={employee}
                  fieldName={"dateOfHire"}
                  setEmployee={setEmployee}
                  type="date"
                  InputLabelProps={{ shrink: true }}
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
