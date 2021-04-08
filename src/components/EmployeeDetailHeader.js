import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Update from "@material-ui/icons/Update";
import Delete from "@material-ui/icons/Delete";
import axios from "axios";

const EMPLOYEE_REST_API_URL = "http://localhost:8080/employees/";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const EmployeeDetailHeader = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const deleteEmployee = async () => {
    const url = EMPLOYEE_REST_API_URL + props.employeeId + "/delete";
    try {
      await axios.delete(url);
      alert(
        "Employee with ID " +
          props.employeeId +
          " has been successfully deleted!"
      );
      history.push("/employees");
    } catch (error) {
      alert("Employee with ID " + props.employeeId + " could not be found!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          marginRight: "2rem",
        }}
      >
        {props.employeeName}
      </h1>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<Update />}
      >
        Update
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        className={classes.button}
        startIcon={<Delete />}
        onClick={deleteEmployee}
      >
        Delete
      </Button>
    </div>
  );
};

export default EmployeeDetailHeader;
