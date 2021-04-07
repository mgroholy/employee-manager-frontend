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
  Typography,
} from "@material-ui/core";

const EMPLOYEES_REST_API_URL = "http://localhost:8080/";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get(EMPLOYEES_REST_API_URL);
      setEmployees(response.data);
    };

    fetchEmployees();
  }, []);

  return (
    <Container>
      <TableContainer component={Paper} elevation={2}>
        <Typography variant="h3">Employees List</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.Id}>
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
