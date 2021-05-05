import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import React from "react";

const ConfirmModal = ({
  open,
  toggleOpen,
  dialogContent,
  setDialogContent,
  dialogButtonOneText,
  setChoice,
  onClickAction,
  dialogButtonTwoText,
  setDialogButtonOneText,
  setDialogButtonTwoText,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            toggleOpen();
            setChoice && setChoice(true);
            onClickAction && onClickAction();
            setDialogContent && setDialogContent("");
            setDialogButtonOneText && setDialogButtonOneText("");
            setDialogButtonTwoText && setDialogButtonTwoText("");
          }}
          color="primary"
        >
          {dialogButtonOneText}
        </Button>
        {dialogButtonTwoText && (
          <Button
            onClick={() => {
              toggleOpen();
              setDialogContent && setDialogContent("");
              setDialogButtonOneText && setDialogButtonOneText("");
              setDialogButtonTwoText && setDialogButtonTwoText("");
            }}
            color="primary"
          >
            {dialogButtonTwoText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
