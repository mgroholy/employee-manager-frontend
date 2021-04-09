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

  const [employeeName, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [employeeEmail, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [employeeDateOfBirth, setDateOfBirth] = useState("");
  const [dobError, setDobError] = useState("");
  const [employeeDepartment, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [employeePhoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [employeeClearanceLevel, setClearanceLevel] = useState("");
  const [clearanceError, setClearanceError] = useState("");
  const [employeePosition, setPosition] = useState("");
  const [positionError, setPositionError] = useState("");

  const [departments, setDepartments] = useState([]);

  const classes = useStyles();

  const sendEmployee = () => {
    const employee = {
      Name: employeeName,
      Email: employeeEmail,
      Department: employeeDepartment,
      "Phone number": employeePhoneNumber,
      "Date of birth": employeeDateOfBirth,
      "Clearance level": employeeClearanceLevel.toUpperCase(),
      Position: employeePosition,
    };

    let validForm = validateFormData(employee);

    if (validForm) {
      sendRequest(employee);
    }
  };

  const validateFormData = (data) => {
    let valid = true;
    if (data.Name === "") {
      setNameError("Required field.");
      valid = false;
    }
    if (data.Email === "") {
      setEmailError("Required field.");
      valid = false;
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = re.test(String(data.Email).toLowerCase());
      if (result === false) {
        valid = false;
        setEmailError("Invalid email format.");
      }
    }
    if (data.Department === "") {
      setDepartmentError("Required field.");
      valid = false;
    }
    if (data["Date of birth"] === "") {
      setDobError("Required field.");
      valid = false;
    }
    if (data["Clearance level"] === "") {
      setClearanceError("Required field.");
      valid = false;
    }
    if (data.Position === "") {
      setPositionError("Required field.");
      valid = false;
    }
    if (data["Phone number"] === "") {
      setPhoneError("Required field.");
      valid = false;
    }
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
    } catch (error) {
      setEmailError(error.response.data.message);
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
                    setNameError("");
                    setName(event.target.value);
                  }}
                  helperText={nameError}
                  error={nameError !== ""}
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
                    setEmailError("");
                    setEmail(event.target.value);
                  }}
                  helperText={emailError}
                  error={emailError !== ""}
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
                    setDobError("");
                    setDateOfBirth(event.target.value);
                  }}
                  helperText={dobError}
                  error={dobError !== ""}
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
                    error={departmentError !== ""}
                    onChange={(event) => {
                      setDepartmentError("");
                      setDepartment(event.target.value);
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
                    {departmentError}
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
                    setPhoneError("");
                    setPhoneNumber(event.target.value);
                  }}
                  helperText={phoneError}
                  error={phoneError !== ""}
                />
                <TextField
                  margin={"normal"}
                  fullWidth={true}
                  id="outlined-basic"
                  label="Clearance Level:"
                  variant="outlined"
                  required={true}
                  onChange={(event) => {
                    setClearanceError("");
                    setClearanceLevel(event.target.value);
                  }}
                  helperText={clearanceError}
                  error={clearanceError !== ""}
                />
                <TextField
                  margin={"normal"}
                  fullWidth={true}
                  id="outlined-basic"
                  label="Position:"
                  variant="outlined"
                  required={true}
                  onChange={(event) => {
                    setPositionError("");
                    setPosition(event.target.value);
                  }}
                  helperText={positionError}
                  error={positionError !== ""}
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
