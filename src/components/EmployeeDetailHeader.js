import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Update from "@material-ui/icons/Update";
import Delete from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const EmployeeDetailHeader = (props) => {
  const classes = useStyles();

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
      >
        Delete
      </Button>
    </div>
  );
};

export default EmployeeDetailHeader;
