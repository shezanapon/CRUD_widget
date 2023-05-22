import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const ZOHO = window.ZOHO;
export default function Insert({ handleChange }) {
  console.log("shezan", handleChange);
  const [name, setName] = React.useState();
  const [position, setPosition] = React.useState();
  const [team, setTeam] = React.useState();
  const [bday, setBDay] = React.useState();
  const [email, setEmail] = React.useState();

  const [open, setOpen] = React.useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInsert = (name, position, team, bday, email) => {
    var recordData = {
      Name: name,
      Position: position,
      Team: team,
      BDay: bday,
      Email: email,
    };
    ZOHO.CRM.API.insertRecord({
      Entity: "CRUD",
      APIData: recordData,
      Trigger: ["workflow"],
    }).then(function (data) {
      console.log(data);
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
            id="team"
            label="Team"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTeam(e.target.value)}
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
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => handleInsert(name, position, team, bday, email)}
            onChange={handleChange}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
