import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  formErrorText: {
    color: "red",
  },
}));

const AddEmployeeDropDown = ({
  label,
  setError,
  error,
  fieldName,
  setEmployee,
  employee,
  selectOptions,
}) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" fullWidth={true} margin={"normal"}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        defaultValue={""}
        error={error[fieldName] !== ""}
        onChange={(event) => {
          setError({ ...error, [fieldName]: "" });
          setEmployee({
            ...employee,
            [fieldName]: event.target.value,
          });
        }}
      >
        {selectOptions.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText className={classes.formErrorText}>
        {error[fieldName]}
      </FormHelperText>
    </FormControl>
  );
};

export default AddEmployeeDropDown;
