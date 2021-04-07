import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import EmployeeDetailHeader from "./EmployeeDetailHeader";
import Alert from "@material-ui/lab/Alert";

const EMPLOYEE_REST_API_URL = "http://localhost:8080/employees/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const EmployeeDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [isError, setIsError] = useState(false);

  let employeeAttributes = Object.keys(employee);
  const index = employeeAttributes.indexOf("Name");
  if (index > -1) {
    employeeAttributes.splice(index, 1);
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsError(false);
      try {
        const response = await axios.get(EMPLOYEE_REST_API_URL + id);
        setEmployee(response.data);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className={classes.root}>
      {isError ? (
        <Alert severity="error">
          Employee could not be found by ID '{id}'.
        </Alert>
      ) : (
        <EmployeeDetailHeader employeeName={employee.Name} />
      )}
      <div>
        {employeeAttributes.map((attribute, index) => (
          <Accordion key={index}>
            <AccordionSummary>
              <Typography className={classes.heading}>{attribute}</Typography>
              <Typography className={classes.secondaryHeading}>
                {employee[attribute]}
              </Typography>
            </AccordionSummary>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDetail;
