import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

export default function CustomMessageModal(props) {
  const {
    open = false,
    title,
    description,
    onHandleClose = () => {},
    onHandleCancel = () => {},
    onHandleOkay = () => {},
    isCancle = false,
    isOk = false,
    cancelText = `Cancel`,
    okText = `Okay`,
  } = props;

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onHandleClose}
      aria-describedby="message-alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="message-alert-dialog-slide-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {isCancle && <Button onClick={onHandleCancel}>{cancelText}</Button>}
        {isOk && <Button onClick={onHandleOkay}>{okText}</Button>}
      </DialogActions>
    </Dialog>
  );
}
