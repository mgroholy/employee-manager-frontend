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
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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
          <FormControl className={formControlClass} variant={"outlined"}>
            <InputLabel id="department-select-label">Department</InputLabel>
            <Select
              labelId="department-select-label"
              id="department-select"
              defaultValue={"all"}
              value={departmentOption}
              onChange={(event) => {
                setUserInput("");
                setError("");
                setDepartmentOption(event.target.value);
                console.log("value ", event.target.value);
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
          <FormControlLabel
            control={
              <Checkbox
                checked={showInactive}
                onChange={() => {
                  setShowInactive(!showInactive);
                  setError("");
                }}
                name="showInactive"
              />
            }
            label="Show inactive employees"
          />
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
