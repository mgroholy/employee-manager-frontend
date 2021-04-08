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
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

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
}));

const EmployeeFilter = ({
  departments,
  formControlClass,
  filter,
  inputError,
  setInputError,
  userInput,
  setUserInput,
}) => {
  const classes = useStyles();

  const [radioOption, setRadioOption] = useState("Name");

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
        <Box
          padding={2}
          paddingLeft={5}
          paddingRight={5}
          className={classes.formContainer}
        >
          <FormControl className={formControlClass} variant={"outlined"}>
            <InputLabel id="department-select-label">Department</InputLabel>
            <Select
              labelId="department-select-label"
              id="department-select"
              defaultValue={"all"}
              onChange={(event) => {
                setUserInput("");
                setInputError("");
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
          <Box className={classes.userInputContainer}>
            <FormControl component="fieldset">
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
                  control={<Radio size="small" color="primary" />}
                  label={
                    <Typography variant="body2" color="textSecondary">
                      Name
                    </Typography>
                  }
                  selected={true}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="Email"
                  control={<Radio size="small" color="primary" />}
                  label={
                    <Typography variant="body2" color="textSecondary">
                      Email
                    </Typography>
                  }
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="Id"
                  control={<Radio size="small" color="primary" />}
                  label={
                    <Typography variant="body2" color="textSecondary">
                      Id
                    </Typography>
                  }
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              id="outlined-basic"
              label={radioOption}
              variant="outlined"
              value={userInput}
              helperText={inputError}
              error={inputError !== ""}
              onChange={(event) => {
                setInputError("");
                setUserInput(event.target.value);
              }}
            />
            <Button
              size="large"
              variant="outlined"
              color="secondary"
              onClick={() => {
                filterByUserInput();
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
