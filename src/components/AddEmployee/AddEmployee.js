import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Security/UserContext";
import AddEmployeeDropDown from "./AddEmployeeDropDown";
import CustomTextField from "./CustomTextField";
import Alert from "@material-ui/lab/Alert";

const AddEmployee = () => {
  const EMPLOYEES_REST_API_URL = process.env.REACT_APP_EMPLOYEE_URL;
  const DEPARTMENTS_REST_API_URL = process.env.REACT_APP_DEPARTMENT_URL;
  const LEVELS_REST_API_URL = process.env.REACT_APP_LEVEL_URL;
  const POSITIONS_REST_API_URL = process.env.REACT_APP_POSITION_URL;

  const { roles } = useContext(UserContext);

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

  const [positions, setPositions] = useState([]);

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
      const response = await axios.post(EMPLOYEES_REST_API_URL, employee, {
        withCredentials: true,
      });
      history.push(`/employees/${response.data.ID}`);
    } catch (apiError) {
      setError({ ...error, email: apiError.response.data.message });
    }
  };

  const fetchDepartments = async () => {
    const response = await axios.get(DEPARTMENTS_REST_API_URL, {
      withCredentials: true,
    });
    setDepartments(response.data);
  };

  const fetchLevels = async () => {
    const response = await axios.get(LEVELS_REST_API_URL, {
      withCredentials: true,
    });
    let levels = response.data;
    let levelObjects = [];
    for (let i = 0; i < levels.length; i++) {
      let level = { id: i, name: levels[i] };
      levelObjects.push(level);
    }
    setLevels(levelObjects);
  };

  const fetchPositions = async () => {
    const response = await axios.get(POSITIONS_REST_API_URL, {
      withCredentials: true,
    });
    setPositions(response.data);
  };

  useEffect(() => {
    fetchDepartments();
    fetchLevels();
    fetchPositions();
  }, []);

  return (
    <Container>
      {roles.includes("ADMIN") ? (
        <Paper elevation={2}>
          <Box p={5}>
            <Typography variant="h3">Add employee</Typography>

            <FormControl fullWidth={true}>
              <form>
                <Box paddingTop={3}>
                  <CustomTextField
                    label="Employee name:"
                    setError={setError}
                    error={error}
                    employee={employee}
                    fieldName={"name"}
                    setEmployee={setEmployee}
                  />
                  <CustomTextField
                    label="Email:"
                    setError={setError}
                    error={error}
                    employee={employee}
                    fieldName={"email"}
                    setEmployee={setEmployee}
                  />
                  <CustomTextField
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

                  <CustomTextField
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
                  <AddEmployeeDropDown
                    label="Position:"
                    setError={setError}
                    error={error}
                    employee={employee}
                    fieldName={"position"}
                    setEmployee={setEmployee}
                    selectOptions={positions}
                  />
                  <CustomTextField
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
      ) : (
        <Alert severity="warning">
          You are not allowed to access this page!
        </Alert>
      )}
    </Container>
  );
};

export default AddEmployee;
