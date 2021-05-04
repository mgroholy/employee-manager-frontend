import React from "react";
import Dialog from "@material-ui/core/Dialog";

import RegistrationForm from "./RegistrationForm";

const ModalDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <RegistrationForm handleClose={handleClose} />
    </Dialog>
  );
};

export default ModalDialog;
