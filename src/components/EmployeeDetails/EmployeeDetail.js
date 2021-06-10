import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
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
import { UserContext } from "../Security/UserContext";
import ConfirmModal from "../FeedbackModal/ConfirmModal";

const EMPLOYEE_REST_API_URL = process.env.REACT_APP_EMPLOYEE_URL;

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
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const { roles } = useContext(UserContext);
  const [employee, setEmployee] = useState({});
  const [isError, setIsError] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [status, setStatus] = useState("ACTIVE");
  const [terminationDate, setTerminationDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [dialogContent, setDialogContent] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  let employeeAttributes = Object.keys(employee);
  const index = employeeAttributes.indexOf("Name");
  if (index > -1) {
    employeeAttributes.splice(index, 1);
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsError(false);
      try {
        const response = await axios.get(EMPLOYEE_REST_API_URL + "/" + id, {
          withCredentials: true,
        });
        setEmployee(response.data);
      } catch (error) {
        setIsError(true);
        setDialogContent(`Employee could not be found by ID ${id}.`);
        toggleDialog();
      }
    };

    fetchEmployee();
  }, [id, hasUpdate]);

  const getFormattedData = (attribute, data) => {
    if (attribute === "Status") {
      return {
        [attribute]: data[0],
        "Date of termination": data[1],
      };
    } else {
      return { [attribute]: data };
    }
  };

  const sendUpdate = async (attribute, data) => {
    const url = EMPLOYEE_REST_API_URL + "/" + id + "/partial-update";

    try {
      const update = getFormattedData(attribute, data);
      await axios.patch(url, update, { withCredentials: true });
    } catch (error) {
      setErrorMessage({ [attribute]: error.response.data.message });
    }

    setHasUpdate(!hasUpdate);
  };

  const updateTextFieldValue = async (attribute, e) => {
    const isEnterPressed = e.keyCode === 13;
    if (isEnterPressed) {
      const input = e.target.value;
      sendUpdate(attribute, input);
    }
  };

  const updateDateValue = (attribute, e) => {
    const selected = e.target.value;
    sendUpdate(attribute, selected);
  };

  const updateDropdownValue = (attribute, e) => {
    if (attribute === "Status") setStatus("ACTIVE");
    else {
      const selected = e.target.dataset.value;
      sendUpdate(attribute, selected);
    }
  };

  const updateStatus = () => {
    if (employee.Status === "ACTIVE") {
      sendUpdate("Status", ["INACTIVE", terminationDate]);
    } else {
      sendUpdate("Status", [status, null]);
    }
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
      "Position",
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
      case "Position":
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
      {!isError && (
        <EmployeeDetailHeader
          employeeName={employee.Name}
          employeeId={employee.ID}
          enterPressed={updateTextFieldValue}
          status={employee.Status}
        />
      )}
      <div>
        {employeeAttributes.map((attribute, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={
                isModifiableField(attribute) &&
                roles.includes("SUPERVISOR") && <Update />
              }
            >
              <Typography className={classes.attributeName}>
                {attribute}
              </Typography>
              <Typography className={classes.attributeValue}>
                {attribute === "Department" || attribute === "Position"
                  ? employee[attribute].name
                  : employee[attribute]}
              </Typography>
            </AccordionSummary>

            {isModifiableField(attribute) && roles.includes("SUPERVISOR") && (
              <AccordionDetails>
                {isSpecialField(attribute) ? (
                  renderSpecialUpdateField(attribute)
                ) : (
                  <TextField
                    label={"New " + attribute}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    onKeyDown={(e) => updateTextFieldValue(attribute, e)}
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
            )}
          </Accordion>
        ))}
      </div>
      <ConfirmModal
        open={dialogOpen}
        toggleOpen={toggleDialog}
        dialogContent={dialogContent}
        setDialogContent={setDialogContent}
        dialogButtonOneText="OK"
        onClickAction={() => history.push("/employees")}
      />
    </div>
  );
};

export default EmployeeDetail;
