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
import Dropdown from "./Dropdown";

const EMPLOYEE_REST_API_URL = "http://localhost:8080/employees/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "auto",
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
  error: {
    color: "red",
    marginLeft: "15px",
  },
}));

const EmployeeDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [isError, setIsError] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

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
      const response = await axios
        .put(url, employee)
        .catch((error) => error.response);

      if (response.status === 400) {
        if (response.data === "")
          setErrorMessage({ [attribute]: "Invalid input." });
        else {
          const message = response.data.errors[0].defaultMessage;
          setErrorMessage({ [attribute]: message });
        }
      } else setErrorMessage({});

      setHasUpdate(!hasUpdate);
    }
  };

  const updateDepartment = async (e) => {
    const url = EMPLOYEE_REST_API_URL + id + "/update";
    const selected = e.target.dataset.value;
    employee["Department"] = selected;
    await axios.put(url, employee);
    setHasUpdate(!hasUpdate);
  };

  const updateDate = async (e) => {
    const url = EMPLOYEE_REST_API_URL + id + "/update";
    const selected = e.target.value;
    employee["Date of birth"] = selected;
    await axios.put(url, employee);
    setHasUpdate(!hasUpdate);
  };

  const updateClearanceLevel = async (e) => {
    const url = EMPLOYEE_REST_API_URL + id + "/update";
    const selected = e.target.dataset.value;
    employee["Clearance level"] = selected;
    await axios.put(url, employee);
    setHasUpdate(!hasUpdate);
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
          enterPressed={updateEmployee}
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
                {attribute === "Department"
                  ? employee[attribute].name
                  : employee[attribute]}
              </Typography>
            </AccordionSummary>
            {index !== 0 &&
            attribute !== "Department" &&
            attribute !== "Date of birth" &&
            attribute !== "Clearance level" ? (
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

            {attribute === "Date of birth" ? (
              <AccordionDetails>
                <TextField
                  style={{ minWidth: "15%" }}
                  label="New Date of birth:"
                  variant="outlined"
                  type="date"
                  defaultValue="1985-01-01"
                  InputLabelProps={{ shrink: true }}
                  onChange={updateDate}
                />
              </AccordionDetails>
            ) : (
              <></>
            )}

            {attribute === "Department" ? (
              <AccordionDetails>
                <Dropdown type={attribute} onDropdownClick={updateDepartment} />
              </AccordionDetails>
            ) : (
              <></>
            )}

            {attribute === "Clearance level" ? (
              <AccordionDetails>
                <Dropdown
                  type={attribute}
                  onDropdownClick={updateClearanceLevel}
                />
              </AccordionDetails>
            ) : (
              <></>
            )}

            {errorMessage !== {} &&
            Object.keys(errorMessage)[0] === attribute ? (
              <Typography className={classes.error}>
                {errorMessage[attribute]}
              </Typography>
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
