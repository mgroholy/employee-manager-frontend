import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";

const DepartmentDropdown = (props) => {
  const [departments, setDepartments] = useState([]);
  const labelRef = useRef();
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0;

  const fetchDepartments = async () => {
    const response = await axios.get(DEPARTMENTS_REST_API_URL);
    setDepartments(response.data);
  };

  useEffect(() => fetchDepartments(), []);

  return (
    <FormControl style={{ minWidth: "15%" }} variant="outlined">
      <InputLabel id="department" ref={labelRef}>
        New Department
      </InputLabel>
      <Select labelId="department" labelWidth={labelWidth} value={""}>
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
