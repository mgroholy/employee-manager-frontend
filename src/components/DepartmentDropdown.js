import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, MenuItem, Select, makeStyles } from "@material-ui/core";

const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";

const useStyles = makeStyles(() => ({
  dropDown: {
    width: "15%",
    marginLeft: "15px",
    marginBottom: "15px",
  },
}));

const DepartmentDropdown = (props) => {
  const classes = useStyles();
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    const response = await axios.get(DEPARTMENTS_REST_API_URL);
    setDepartments(response.data);
  };

  useEffect(() => fetchDepartments(), []);

  return (
    <FormControl fullWidth={true} variant="outlined">
      <Select className={classes.dropDown} value={""}>
        {departments.map((department) => (
          <MenuItem
            onClick={props.onDepartmentClick}
            key={department.id}
            value={department.name}
          >
            {department.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DepartmentDropdown;
