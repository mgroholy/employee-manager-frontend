import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import React, { useRef } from "react";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: "150px",
  },
}));

const DepartmentFilterDropDown = ({
  departments,
  departmentOption,
  setUserInput,
  setError,
  setDepartmentOption,
}) => {
  const classes = useStyles();

  const labelRef = useRef();
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0;

  return (
    <FormControl className={classes.formControl} variant={"outlined"}>
      <InputLabel id="department-select-label" ref={labelRef}>
        Department
      </InputLabel>
      <Select
        labelId="department-select-label"
        labelWidth={labelWidth}
        id="department-select"
        defaultValue={"all"}
        value={departmentOption}
        onChange={(event) => {
          setUserInput("");
          setError("");
          setDepartmentOption(event.target.value);
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
  );
};

export default DepartmentFilterDropDown;
