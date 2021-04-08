import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Update } from "@material-ui/icons";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
} from "@material-ui/core";
import EmployeeDetailHeader from "./EmployeeDetailHeader";

const EMPLOYEE_REST_API_URL = "http://localhost:8080/employees/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  attributeName: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  attributeValue: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const EmployeeDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [isError, setIsError] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);

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
  }, [id, hasUpdate]);

  const updateEmployee = async (attribute, e) => {
    const isEnterPressed = e.keyCode === 13;
    if (isEnterPressed) {
      const input = e.target.value;
      const url = EMPLOYEE_REST_API_URL + id + "/update";
      employee[attribute] = input;
      await axios.put(url, employee);
      setHasUpdate(!hasUpdate);
    }
  };

  return (
    <div className={classes.root}>
      {isError ? (
        <Alert severity="error">
          Employee could not be found by ID '{id}'.
        </Alert>
      ) : (
        <EmployeeDetailHeader
          employeeName={employee.Name}
          employeeId={employee.ID}
        />
      )}
      <div>
        {employeeAttributes.map((attribute, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={index !== 0 ? <Update /> : <></>}>
              <Typography className={classes.attributeName}>
                {attribute}
              </Typography>
              <Typography className={classes.attributeValue}>
                {employee[attribute]}
              </Typography>
            </AccordionSummary>
            {index !== 0 ? (
              <AccordionDetails>
                <TextField
                  label={"New " + attribute}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  onKeyDown={(e) => updateEmployee(attribute, e)}
                />
              </AccordionDetails>
            ) : (
              <></>
            )}
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDetail;
