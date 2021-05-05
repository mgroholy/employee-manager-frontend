import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

const FeedbackModal = ({
  dialogContent,
  dialogButtonText,
  dialogTitle,
  open,
  toggleModal,
}) => {
  return (
    <Dialog
      open={open}
      onClose={toggleModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleModal} color="primary">
          {dialogButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;
