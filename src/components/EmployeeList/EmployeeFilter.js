import { Box, Paper, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import DepartmentFilterDropDown from "./DepartmentFilterDropDown";
import FilterTypeRadio from "./FilterTypeRadio";
import ShowInactiveCheckbox from "./ShowInactiveCheckbox";

const useStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "55%",
  },
  formControl: {
    minWidth: "150px",
  },
}));

const EmployeeFilter = ({
  departments,
  filter,
  setError,
  userInput,
  setUserInput,
  radioOption,
  setRadioOption,
  departmentOption,
  setDepartmentOption,
  showInactive,
  setShowInactive,
}) => {
  const classes = useStyles();

  return (
    <Box marginBottom={3}>
      <Paper elevation={2}>
        <Box
          padding={2}
          paddingLeft={5}
          paddingRight={5}
          className={classes.formContainer}
        >
          <DepartmentFilterDropDown
            departmentOption={departmentOption}
            departments={departments}
            setUserInput={setUserInput}
            setError={setError}
            setDepartmentOption={setDepartmentOption}
          />
          <ShowInactiveCheckbox
            showInactive={showInactive}
            setShowInactive={setShowInactive}
            setError={setError}
          />
          <Box className={classes.userInputContainer}>
            <FilterTypeRadio
              setRadioOption={setRadioOption}
              setUserInput={setUserInput}
            />
            <TextField
              id="outlined-basic"
              label={radioOption}
              variant="outlined"
              value={userInput}
              onChange={(event) => {
                setError("");
                setDepartmentOption("all");
                setUserInput(event.target.value);
              }}
            />
            <Button
              size="large"
              variant="outlined"
              color="secondary"
              onClick={() => {
                filter();
                setError("");
              }}
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmployeeFilter;
