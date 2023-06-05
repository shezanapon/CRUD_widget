import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const ZOHO = window.ZOHO;
export default function Insert({ module }) {
  const [name, setName] = React.useState();
  const [position, setPosition] = React.useState();
  const [id, setID] = React.useState();
  const [aid, setAID] = React.useState();
  const [bday, setBDay] = React.useState();
  const [email, setEmail] = React.useState();
  const [stage, setStage] = React.useState();
  const [deal_name, setDeal_Name] = React.useState();
  const [modified_time, setModified_Time] = React.useState();
  const [color, setColor] = React.useState();
  const [amount, setAmount] = React.useState();
  const [title, setTitle] = React.useState();

  const [start_date, setStart_Date] = React.useState();
  const [end_date, setEnd_Date] = React.useState();
  const [ownerName, setOwnerName] = React.useState();

  const [open, setOpen] = React.useState(false);

  const handleShut = () => {
    handleInsert(
      id,
      name,
      position,
      bday,
      email,
      deal_name,
      stage,
      modified_time,
      amount,
      title,
      start_date,
      color,
      end_date
    );
    setOpen(false);
    window.location.reload(false);
    window.location.reload(false);
    window.location.reload(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInsert = (
    id,
    name,
    position,
    bday,
    email,
    deal_name,
    stage,
    modified_time,
    amount,
    title,
    start_date,
    color,
    end_date
  ) => {
    let recordData = {};

    if (module === "CRUD") {
      recordData = {
        Name: name,
        Position: position,
        id: id,
        BDay: bday,
        Email: email,
      };
    } else if (module === "Deals") {
      recordData = {
        Deal_Name: deal_name,
        Stage: stage,
        id: id,
        Modified_Time: modified_time,
        Amount: amount,
      };
    } else {
      recordData = {
        Title: title,
        Start_Date: start_date,
        id: id,
        End_Date: end_date,
        Color: color,
      };
    }

    ZOHO.CRM.API.insertRecord({
      Entity: module,
      APIData: recordData,
      Trigger: ["workflow"],
    }).then(function (data) {
      console.log({ data });
    });
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{
          bgcolor: "purple",
          color: "white",
          "&:hover": {
            bgcolor: "purple",
            color: "white",
          },
        }}
      >
        <ControlPointIcon />
        Add Record
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Please fill-up the form below </DialogTitle>
        {module === "CRUD" ? (
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="position"
              label="Position"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setPosition(e.target.value)}
            />

            <TextField
              autoFocus
              margin="dense"
              id="bday"
              type="date"
              fullWidth
              variant="standard"
              onChange={(e) => setBDay(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
        ) : module === "Deals" ? (
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="deal_name"
              label="Deal_Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setDeal_Name(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="stage"
              label="Stage"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setStage(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="id"
              label="ID"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setID(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="modified_time"
              type="date"
              fullWidth
              variant="standard"
              onChange={(e) => setModified_Time(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => setAmount(e.target.value)}
            />
          </DialogContent>
        ) : module === "TESTS" ? (
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <TextField
              autoFocus
              margin="dense"
              id="id"
              label="ID"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => setID(e.target.value)}
            /> */}
            <TextField
              autoFocus
              margin="dense"
              id="start_date"
              type="date"
              fullWidth
              variant="standard"
              onChange={(e) => setStart_Date(e.target.value)}
            />

            <TextField
              autoFocus
              margin="dense"
              id="color"
              label="Color"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setColor(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="end_date"
              type="date"
              fullWidth
              variant="standard"
              onChange={(e) => setEnd_Date(e.target.value)}
            />
          </DialogContent>
        ) : (
          <p>You are selecting a wrong module</p>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" onClick={handleShut}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
