import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  userInputForm: {
    display: "flex",
    flexDirection: "row",
  },
}));

const EmployeeFilter = ({ departments, formControlClass, filter }) => {
  const classes = useStyles();

  const [radioOption, setRadioOption] = useState("Name");
  const [userInput, setUserInput] = useState("");
  const [inputError, setInputError] = useState("");

  const filterByUserInput = () => {
    console.log(filter);
    if (userInput !== "") {
      const filterParams = {
        type: radioOption.toLowerCase(),
        value: userInput,
      };
      filter(filterParams);
    } else {
      setInputError("Required field.");
    }
  };

  return (
    <Box marginBottom={3}>
      <Paper elevation={2}>
        <Box padding={2} className={classes.formContainer}>
          <FormControl className={formControlClass}>
            <InputLabel id="department-select-label">Department</InputLabel>
            <Select
              labelId="department-select-label"
              id="department-select"
              defaultValue={"all"}
              onChange={(event) => {
                const filterParam = {
                  type: "department",
                  value: event.target.value,
                };
                filter(filterParam);
              }}
            >
              <MenuItem key={"all"} value={"all"} selected={true}>
                All
              </MenuItem>
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.name}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset" className={classes.userInputForm}>
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup
              row
              aria-label="type"
              name="type"
              defaultValue="Name"
              onChange={(event) => {
                setRadioOption(event.target.value);
              }}
            >
              <FormControlLabel
                value="Name"
                control={<Radio color="primary" />}
                label="Name"
                selected={true}
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="Email"
                control={<Radio color="primary" />}
                label="Email"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="Id"
                control={<Radio color="primary" />}
                label="Id"
                labelPlacement="bottom"
              />
            </RadioGroup>
            <TextField
              margin={"normal"}
              id="outlined-basic"
              label={radioOption}
              variant="outlined"
              helperText={inputError}
              error={inputError !== ""}
              onChange={(event) => {
                setInputError("");
                setUserInput(event.target.value);
              }}
            />
            <Button
              variant="outlined"
              margin={"normal"}
              color="secondary"
              onClick={() => {
                filterByUserInput();
              }}
            >
              Filter
            </Button>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmployeeFilter;
