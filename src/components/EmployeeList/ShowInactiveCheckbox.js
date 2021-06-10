import { FormControlLabel, Checkbox } from "@material-ui/core";
import React from "react";

const ShowInactiveCheckbox = ({ showInactive, setShowInactive, setError }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={showInactive}
          onChange={() => {
            setShowInactive(!showInactive);
            setError("");
          }}
          name="showInactive"
        />
      }
      label="Show inactive employees"
    />
  );
};

export default ShowInactiveCheckbox;
