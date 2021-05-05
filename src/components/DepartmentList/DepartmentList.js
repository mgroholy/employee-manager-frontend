import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Security/UserContext";
import AddDepartment from "./AddDepartment";

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
  tableCell: {},
  trashIcon: {
    cursor: "pointer",
  },
}));

const DepartmentList = () => {
  const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";

  const { roles } = useContext(UserContext);
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    const response = await axios.get(DEPARTMENTS_REST_API_URL, {
      withCredentials: true,
    });
    console.log(response);
    setDepartments(response.data);
  };

  const deleteDepartment = async (departmentId) => {
    console.log("delete", departmentId);
    try {
      await axios.delete(`${DEPARTMENTS_REST_API_URL}/${departmentId}/delete`, {
        withCredentials: true,
      });
      alert("Department has been deleted.");
    } catch {
      alert("An unexpected error occured.");
    } finally {
      fetchDepartments();
    }
  };

  const classes = useStyles();

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <Container>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell className={classes.headerCell}>
                Department Name
              </TableCell>
              <TableCell className={classes.headerCell}>
                Number of Employees
              </TableCell>
              {roles.includes("ADMIN") && (
                <TableCell className={classes.headerCell}>Delete</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id} className={classes.tableRow}>
                <TableCell>{department.name}</TableCell>
                <TableCell className={classes.tableCell}>
                  {department.employeeCount}
                </TableCell>

                {roles.includes("ADMIN") && (
                  <TableCell className={classes.tableCell}>
                    <DeleteIcon
                      className={classes.trashIcon}
                      onClick={
                        department.employeeCount === 0
                          ? () => deleteDepartment(department.id)
                          : () =>
                              alert(
                                "Department with employees cannot be deleted."
                              )
                      }
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}

            {roles.includes("ADMIN") && (
              <TableRow>
                <TableCell>
                  <AddDepartment fetchDepartments={fetchDepartments} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DepartmentList;
