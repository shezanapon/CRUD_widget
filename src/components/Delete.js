import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const ZOHO = window.ZOHO;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Delete({ props }) {
  const id = props;
  console.log(id);
  const [open, setOpen] = React.useState(false);

  const handleDelete = (id) => {
    ZOHO.CRM.API.deleteRecord({ Entity: "CRUD", RecordID: id }).then(function (
      data
    ) {
      console.log(data);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          bgcolor: "black",
          color: "white",
          "&:hover": {
            bgcolor: "black",
            color: "white",
          },
        }}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ bgcolor: "red", color: "white" }}>
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this file?
            <br />
            You can not undo this action
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            sx={{
              bgcolor: "red",
              color: "white",
              "&:hover": {
                bgcolor: "red",
                color: "white",
              },
            }}
            onClick={() => handleDelete(id)}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
