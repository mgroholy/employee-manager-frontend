import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";

const Dropdown = (props) => {
  const [data, setData] = useState([]);
  const labelRef = useRef();
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0;

  const fetchData = async () => {
    const response = await axios.get(DEPARTMENTS_REST_API_URL);
    setData(response.data);
  };

  useEffect(() => fetchData(), []);

  return (
    <FormControl style={{ minWidth: "15%" }} variant="outlined">
      <InputLabel id="dropdown" ref={labelRef}>
        New Department
      </InputLabel>
      <Select labelId="dropdown" labelWidth={labelWidth} value={""}>
        {data.map((item, index) => (
          <MenuItem
            onClick={props.onDropdownClick}
            key={index}
            value={item.name}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
