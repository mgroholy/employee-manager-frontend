import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
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
  tableRow: {
    cursor: "pointer",
  },
  errorMessage: {
    color: "red",
  },
}));

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [radioOption, setRadioOption] = useState("Name");
  const [departmentOption, setDepartmentOption] = useState("all");
  const [showInactive, setShowInactive] = useState(false);

  const classes = useStyles();

  const history = useHistory();

  const fetchEmployees = async () => {
    const response = await axios.get(EMPLOYEES_REST_API_URL);
    setEmployees(response.data);
  };

  const fetchDepartments = async () => {
    const response = await axios.get(DEPARTMENTS_REST_API_URL);
    setDepartments(response.data);
  };

  const filterByInput = async () => {
    const url = `${EMPLOYEES_REST_API_URL}/employees?${
      userInput !== ""
        ? `${radioOption.toLowerCase()}=${userInput}`
        : `department=${departmentOption}`
    }${showInactive === true ? `&showInactive=${showInactive}` : ""}`;
    console.log(url);
    try {
      const response = await axios.get(url);
      setEmployees(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  useEffect(() => {
    filterByInput();
  }, [departmentOption, showInactive]);

  return (
    <Container>
      <EmployeeFilter
        departments={departments}
        filter={filterByInput}
        error={error}
        setError={setError}
        userInput={userInput}
        setUserInput={setUserInput}
        radioOption={radioOption}
        setRadioOption={setRadioOption}
        departmentOption={departmentOption}
        setDepartmentOption={setDepartmentOption}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
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
              <TableCell className={classes.headerCell}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error !== "" ? (
              <>
                <TableRow>
                  <TableCell className={classes.errorMessage}>
                    {error}
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
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
                    <TableCell>{employee.Status}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeList;
