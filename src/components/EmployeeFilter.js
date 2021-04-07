import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";

const EmployeeFilter = ({
  departments,
  formControlClass,
  filterByDepartment,
}) => {
  //   const [department, setDepartment] = useState("");
  return (
    <Box marginBottom={3}>
      <Paper elevation={2}>
        <Box padding={2}>
          <FormControl className={formControlClass}>
            <InputLabel id="department-select-label">Department</InputLabel>
            <Select
              labelId="department-select-label"
              id="department-select"
              //   value={department}
              onChange={(event) => {
                // setDepartment(event.target.value);
                filterByDepartment(event.target.value);
              }}
            >
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.name}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmployeeFilter;
