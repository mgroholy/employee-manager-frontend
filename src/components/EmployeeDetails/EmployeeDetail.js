import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Archive, Update } from "@material-ui/icons";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
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
  date: {
    minWidth: "15%",
  },
  button: {
    maxHeight: "30px",
    margin: "auto 0",
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
  const [status, setStatus] = useState("ACTIVE");
  const [terminationDate, setTerminationDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

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

  const sendUpdate = async () => {
    const url = EMPLOYEE_REST_API_URL + id + "/update";
    await axios.put(url, employee);
    setHasUpdate(!hasUpdate);
  };

  const updateDateValue = (attribute, e) => {
    const selected = e.target.value;
    employee[attribute] = selected;
    sendUpdate();
  };

  const updateDropdownValue = (attribute, e) => {
    if (attribute === "Status") setStatus("ACTIVE");
    else {
      const selected = e.target.dataset.value;
      employee[attribute] = selected;
      sendUpdate();
    }
  };

  const updateStatus = () => {
    if (employee.Status === "ACTIVE") {
      employee["Date of termination"] = terminationDate;
      employee["Status"] = "INACTIVE";
    } else {
      employee["Status"] = status;
      employee["Date of termination"] = null;
    }
    sendUpdate();
  };

  const isSpecialField = (attribute) => {
    const specialFields = [
      "ID",
      "Status",
      "Department",
      "Date of birth",
      "Clearance level",
      "Date of termination",
      "Date of hire",
    ];
    return specialFields.includes(attribute);
  };

  const isModifiableField = (attribute) => {
    return attribute !== "ID" && employee[attribute] !== null;
  };

  const renderSpecialUpdateField = (attribute) => {
    switch (attribute) {
      case "Department":
      case "Clearance level":
        return (
          <Dropdown
            type={attribute}
            onDropdownClick={(e) => updateDropdownValue(attribute, e)}
          />
        );
      case "Status":
        return (
          <>
            {employee.Status === "ACTIVE" ? (
              <TextField
                className={classes.date}
                label="Date of termination:"
                variant="outlined"
                type="date"
                defaultValue={terminationDate}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setTerminationDate(e.target.value)}
              />
            ) : (
              <Dropdown
                type={attribute}
                onDropdownClick={(e) => updateDropdownValue(attribute, e)}
              />
            )}
            <Button
              variant="contained"
              size="small"
              startIcon={<Archive />}
              className={classes.button}
              onClick={updateStatus}
            >
              Set
            </Button>
          </>
        );
      case "Date of termination":
      case "Date of birth":
      case "Date of hire":
        return (
          <TextField
            className={classes.date}
            label={"New " + attribute + ":"}
            variant="outlined"
            type="date"
            defaultValue={employee[attribute]}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => updateDateValue(attribute, e)}
          />
        );
      default:
        throw new Error("Case " + attribute + " not found.");
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
          enterPressed={updateEmployee}
          status={employee.Status}
        />
      )}
      <div>
        {employeeAttributes.map((attribute, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={isModifiableField(attribute) ? <Update /> : <></>}
            >
              <Typography className={classes.attributeName}>
                {attribute}
              </Typography>
              <Typography className={classes.attributeValue}>
                {attribute === "Department"
                  ? employee[attribute].name
                  : employee[attribute]}
              </Typography>
            </AccordionSummary>

            {isModifiableField(attribute) ? (
              <AccordionDetails>
                {isSpecialField(attribute) ? (
                  renderSpecialUpdateField(attribute)
                ) : (
                  <TextField
                    label={"New " + attribute}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    onKeyDown={(e) => updateEmployee(attribute, e)}
                    helperText={
                      errorMessage !== {} &&
                      Object.keys(errorMessage)[0] === attribute
                        ? errorMessage[attribute]
                        : ""
                    }
                    error={Object.keys(errorMessage)[0] === attribute}
                  />
                )}
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
