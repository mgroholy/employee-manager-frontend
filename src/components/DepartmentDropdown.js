import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, MenuItem, Select } from "@material-ui/core";

const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";

const DepartmentDropdown = (props) => {
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    const response = await axios.get(DEPARTMENTS_REST_API_URL);
    setDepartments(response.data);
  };

  useEffect(() => fetchDepartments(), []);

  return (
    <FormControl style={{ minWidth: "15%" }} variant="outlined">
      <Select value={""}>
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
