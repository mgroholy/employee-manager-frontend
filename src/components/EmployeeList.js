import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  Container,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import EmployeeFilter from "./EmployeeFilter";

const EMPLOYEES_REST_API_URL = "http://localhost:8080/";
const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: "bold",
    background: "#333",
    color: "#fff",
  },
  headerCell: {
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  formControl: {
    minWidth: "150px",
  },
  tableRow: {
    cursor: "pointer",
  },
}));

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [inputError, setInputError] = useState("");

  const classes = useStyles();

  const history = useHistory();

  const fetchEmployees = async () => {
    const response = await axios.get(EMPLOYEES_REST_API_URL);
    setEmployees(response.data);
  };

  const fetchDepartments = async () => {
    const response = await axios.get(DEPARTMENTS_REST_API_URL);
    console.log(response);
    setDepartments(response.data);
  };

  const filterByInput = async (input) => {
    const url = `${EMPLOYEES_REST_API_URL}/employees?${input.type}=${input.value}`;
    let errorDuringFetch = false;
    const response = await axios.get(url).catch((error) => {
      errorDuringFetch = true;
      setInputError(error.response.data.message);
    });
    if (!errorDuringFetch) {
      setEmployees(response.data);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  return (
    <Container>
      <EmployeeFilter
        departments={departments}
        formControlClass={classes.formControl}
        filter={filterByInput}
        inputError={inputError}
        setInputError={setInputError}
        userInput={userInput}
        setUserInput={setUserInput}
      />

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell className={classes.headerCell}>
                Employee Name
              </TableCell>
              <TableCell className={classes.headerCell}>
                Email Address
              </TableCell>
              <TableCell className={classes.headerCell}>Department</TableCell>
              <TableCell className={classes.headerCell}>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.ID}
                onClick={() => history.push(`/employees/${employee.ID}`)}
                className={classes.tableRow}
              >
                <TableCell>{employee.Name}</TableCell>

                <TableCell>{employee.Email}</TableCell>
                <TableCell>{employee.Department.name}</TableCell>
                <TableCell>{employee.Position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeList;
