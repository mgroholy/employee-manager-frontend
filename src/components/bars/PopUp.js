import React from "react";
import Popover from "@material-ui/core/Popover";
import { Alert } from "@material-ui/lab";

const PopUp = ({ open, handleClose }) => {
  return (
    <div>
      <Popover
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="error">An unexpected error occurred.</Alert>
      </Popover>
    </div>
  );
};

export default PopUp;
