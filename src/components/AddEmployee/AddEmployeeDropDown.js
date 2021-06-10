import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import React, { useRef } from "react";

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

  const labelRef = useRef();
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0;

  return (
    <FormControl variant="outlined" fullWidth={true} margin={"normal"}>
      <InputLabel id="select-label" ref={labelRef}>
        {label}
      </InputLabel>
      <Select
        labelId="select-label"
        labelWidth={labelWidth}
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
