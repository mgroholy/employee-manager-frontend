import {
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
} from "@material-ui/core";
import React from "react";

const FilterTypeRadio = ({ setRadioOption, setUserInput }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Type</FormLabel>
      <RadioGroup
        row
        aria-label="type"
        name="type"
        defaultValue="Name"
        onChange={(event) => {
          setRadioOption(event.target.value);
          setUserInput("");
        }}
      >
        <FormControlLabel
          value="Name"
          control={<Radio size="small" color="primary" />}
          label={
            <Typography variant="body2" color="textSecondary">
              Name
            </Typography>
          }
          selected={true}
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="Email"
          control={<Radio size="small" color="primary" />}
          label={
            <Typography variant="body2" color="textSecondary">
              Email
            </Typography>
          }
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="Id"
          control={<Radio size="small" color="primary" />}
          label={
            <Typography variant="body2" color="textSecondary">
              Id
            </Typography>
          }
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default FilterTypeRadio;
