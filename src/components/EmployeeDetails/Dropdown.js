import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const DEPARTMENTS_REST_API_URL = "http://localhost:8080/departments";
const LEVELS_REST_API_URL = "http://localhost:8080/levels";
const STATUSES_REST_API_URL = "http://localhost:8080/statuses";

const Dropdown = (props) => {
  const [data, setData] = useState([]);
  const labelRef = useRef();
  const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0;

  const getUrl = () => {
    switch (props.type) {
      case "Department":
        return DEPARTMENTS_REST_API_URL;
      case "Clearance level":
        return LEVELS_REST_API_URL;
      case "Status":
        return STATUSES_REST_API_URL;
      default:
        throw new Error("Case " + props.type + " not found.");
    }
  };

  const getLabel = () => {
    switch (props.type) {
      case "Department":
        return "New Department";
      case "Clearance level":
        return "New Level";
      case "Status":
        return "New Status";
      default:
        throw new Error("Case " + props.type + " not found.");
    }
  };

  const url = getUrl();
  const label = getLabel();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      setData(response.data);
    };
    fetchData();
  }, [url]);

  return (
    <FormControl style={{ minWidth: "15%" }} variant="outlined">
      <InputLabel id="dropdown" ref={labelRef}>
        {label}
      </InputLabel>
      <Select labelId="dropdown" labelWidth={labelWidth}>
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
