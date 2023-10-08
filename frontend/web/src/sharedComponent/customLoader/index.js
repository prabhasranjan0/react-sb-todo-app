import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from "@mui/material";

export default function CustomLoader(props) {
  const { open = false } = props;
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => {}}
      aria-describedby="loader-alert-dialog-slide-description"
      sx={{
        zIndex: 11111,
      }}
    >
      <DialogContent>
        <DialogContentText id="loader-alert-dialog-slide-description">
          <CircularProgress />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
