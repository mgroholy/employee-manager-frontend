import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Update from "@material-ui/icons/Update";
import Delete from "@material-ui/icons/Delete";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Archive } from "@material-ui/icons";
import ConfirmModal from "../FeedbackModal/ConfirmModal";

const EMPLOYEE_REST_API_URL = "http://localhost:8080/employees/";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const EmployeeDetailHeader = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [hasUpdate, setHasUpdate] = useState(false);

  const [dialogContent, setDialogContent] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [dialogButtonOneText, setDialogButtonOneText] = useState("");

  const [dialogButtonTwoText, setDialogButtonTwoText] = useState("");

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const redirectToEmployees = () => {
    history.push("/employees");
  };

  const [onClickHandler, setOnClickHandler] = useState(() => () =>
    redirectToEmployees()
  );

  const deleteEmployee = async () => {
    setDialogContent("Delete employee with ID " + props.employeeId + "?");
    setDialogButtonOneText("Confirm");
    setDialogButtonTwoText("Decline");
    setOnClickHandler(() => () => sendDelete());
    toggleDialog();
  };

  const sendDelete = async () => {
    const url = EMPLOYEE_REST_API_URL + props.employeeId + "/delete";
    try {
      await axios.delete(url, { withCredentials: true });
      setDialogContent(
        "Employee with ID " +
          props.employeeId +
          " has been successfully deleted!"
      );
      setDialogButtonOneText("OK");
      setOnClickHandler(() => () => redirectToEmployees());
      toggleDialog();
    } catch (error) {
      setDialogContent(
        "Employee with ID " + props.employeeId + " could not be found!"
      );
      setOnClickHandler(() => () => redirectToEmployees());
      toggleDialog();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <ConfirmModal
        open={dialogOpen}
        toggleOpen={toggleDialog}
        dialogContent={dialogContent}
        setDialogContent={setDialogContent}
        dialogButtonOneText={dialogButtonOneText}
        setDialogButtonOneText={setDialogButtonOneText}
        dialogButtonTwoText={dialogButtonTwoText}
        setDialogButtonTwoText={setDialogButtonTwoText}
        onClickAction={onClickHandler}
      />
      {hasUpdate ? (
        <TextField
          label="Name"
          onKeyDown={(e) => props.enterPressed("Name", e)}
          helperText={"Press Enter to save"}
        ></TextField>
      ) : (
        <h1
          style={{
            marginRight: "2rem",
          }}
        >
          {props.employeeName}
        </h1>
      )}
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={hasUpdate ? <ArrowBackIos /> : <Update />}
        onClick={() => setHasUpdate(!hasUpdate)}
      >
        Update name
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
      {props.status === "INACTIVE" ? (
        <Button
          variant="contained"
          size="small"
          disabled
          className={classes.button}
          startIcon={<Archive />}
        >
          Deactivated
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EmployeeDetailHeader;
