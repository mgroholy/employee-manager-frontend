import React from "react";
import Dialog from "@material-ui/core/Dialog";

import RegistrationForm from "./RegistrationForm";

const ModalDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      BackdropProps={{ style: { opacity: "0.75", backgroundColor: "black" } }}
    >
      <RegistrationForm handleClose={handleClose} />
    </Dialog>
  );
};

export default ModalDialog;
