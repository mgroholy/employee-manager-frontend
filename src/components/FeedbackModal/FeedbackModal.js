import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";

const FeedbackModal = ({
  dialogContent,
  setDialogContent,
  dialogButtonOneText,
  dialogButtonTwoText,
  dialogTitle,
  sendChoice,
}) => {
  const [choice, setChoice] = useState(false);

  return (
    <Dialog
      open={dialogContent !== ""}
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
        <Button
          onClick={() => {
            setDialogContent("");
            setChoice(true);
            sendChoice && sendChoice(choice);
          }}
          color="primary"
        >
          {dialogButtonOneText}
        </Button>
        {dialogButtonTwoText && (
          <Button
            onClick={() => {
              setDialogContent("");
              setChoice(false);
              sendChoice && sendChoice(choice);
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

export default FeedbackModal;
