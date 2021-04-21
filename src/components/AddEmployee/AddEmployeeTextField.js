import { TextField } from "@material-ui/core";
import React from "react";

const AddEmployeeTextField = ({
  label,
  setError,
  setEmployee,
  fieldName,
  error,
  employee,
  type,
  InputLabelProps,
}) => {
  return (
    <TextField
      margin={"normal"}
      fullWidth={true}
      id="outlined-basic"
      label={label}
      variant="outlined"
      required={true}
      InputLabelProps={InputLabelProps && { shrink: true }}
      type={type && type}
      onChange={(event) => {
        setError({ ...error, [fieldName]: "" });
        setEmployee({ ...employee, [fieldName]: event.target.value });
      }}
      helperText={error[fieldName]}
      error={error[fieldName] !== ""}
    />
  );
};

export default AddEmployeeTextField;
