import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

const EMPLOYEES_REST_API_URL = "http://localhost:8080/";

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
}));

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get(EMPLOYEES_REST_API_URL);
      setEmployees(response.data);
    };

    fetchEmployees();
  }, []);

  return (
    <Container>
      <Box padding={5}>
        <Typography variant="h3" align="center">
          Employees List
        </Typography>
      </Box>
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
              >
                <TableCell>{employee.Name}</TableCell>

                <TableCell>{employee.Email}</TableCell>
                <TableCell>{employee.Department}</TableCell>
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
