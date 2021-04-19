import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";
const LEVELS_REST_API_URL = "http://localhost:8080/levels";

const Dropdown = (props) => {
  const [data, setData] = useState([]);
  const labelRef = useRef();
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0;

  const url =
    props.type === "Department"
      ? DEPARTMENTS_REST_API_URL
      : LEVELS_REST_API_URL;

  const fetchData = async (url) => {
    const response = await axios.get(url);
    setData(response.data);
  };

  useEffect(() => fetchData(url), [url]);

  return (
    <FormControl style={{ minWidth: "15%" }} variant="outlined">
      <InputLabel id="dropdown" ref={labelRef}>
        {props.type === "Department" ? "New Department" : "New Level"}
      </InputLabel>
      <Select labelId="dropdown" labelWidth={labelWidth} value={""}>
        {data.map((item, index) => (
          <MenuItem
            onClick={props.onDropdownClick}
            key={index}
            value={props.type === "Department" ? item.name : item}
          >
            {props.type === "Department" ? item.name : item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
