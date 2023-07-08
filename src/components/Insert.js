import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Alert, Snackbar } from "@mui/material";

const ZOHO = window.ZOHO;
export default function Insert({ module, datas }) {
  const [name, setName] = React.useState(null);
  const [position, setPosition] = React.useState(null);
  const [id, setID] = React.useState(null);
  // const [aid, setAID] = React.useState();
  const [bday, setBDay] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [stage, setStage] = React.useState(null);
  const [deal_name, setDeal_Name] = React.useState(null);
  const [modified_time, setModified_Time] = React.useState(null);
  const [color, setColor] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(false);
  const [start_date, setStart_Date] = React.useState(null);
  const [end_date, setEnd_Date] = React.useState(null);
  const [team, setTeam] = React.useState(null);
  const [street, setStreet] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleButton = () => {
    if (name === "") {
      return true;
    } else if (deal_name === "") {
      return true;
    } else {
      return false;
    }
  };
  // console.log(handleButton());
  const handleShut = () => {
    handleInsert(
      id,
      name,
      position,
      team,
      bday,
      email,
      deal_name,
      stage,
      street,
      modified_time,
      amount,
      title,
      start_date,
      color,
      end_date
    );
    setOpen(false);
    // window.location.reload(false);
    // window.location.reload(false);
    // window.location.reload(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log("data check", start_date, color, end_date);
  const handleInsert = (
    id,
    name,
    position,
    team,
    bday,
    email,
    deal_name,
    stage,
    street,
    modified_time,
    amount,
    title,
    start_date,
    color,
    end_date
  ) => {
    let recordData = [];

    if (module === "CRUD") {
      recordData = {
        Name: name,
        Position: position,
        id: id,
        Team: team,
        BDay: bday,
        Email: email,
      };
    } else if (module === "Deals") {
      recordData = {
        Deal_Name: deal_name,
        Stage: stage,
        Street: street,
        id: id,
        Modified_Time: modified_time,
        Amount: amount,
      };
    } else if (module === "TESTS") {
      recordData = {
        Name: name,
        Start_Date: start_date,
        Title: title,
        id: id,
        End_Date: end_date,
        Color: color,
      };
    }
    // console.log(recordData);

    ZOHO.CRM.API.insertRecord({
      Entity: module,
      APIData: recordData,
      Trigger: ["workflow"],
    })
      .then(function (data) {
        id = data?.data?.details.id;
        datas.push({
          Name: name,
          Position: position,
          id: id,
          Team: team,
          BDay: bday,
          Email: email,
        });

        // setAllData((pre) => {
        //   console.log(pre);
        //   return [...pre, data];
        // });
        // console.log({ data });
        if (data.data[0].code === "SUCCESS") {
          console.log(data);

          setSnackbar(true);
        }
      })
      .catch((err) => {
        // console.log(err);
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
              required
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            ></TextField>
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
              type="number"
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
        ) : module === "Deals" ? (
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="deal_name"
              label="Deal_Name"
              required
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
              id="street"
              label="Street"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setStreet(e.target.value)}
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
              id="name"
              label="Name"
              required
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
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
          <Button
            disabled={name ? false : deal_name ? false : true}
            type="submit"
            variant="contained"
            onClick={handleShut}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {snackbar && (
        <Snackbar
          open={snackbar}
          autoHideDuration={5000}
          message="Note archived"
          onClose={() => setSnackbar(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            successfully Inserted!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
