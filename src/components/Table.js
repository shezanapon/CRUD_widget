import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import Insert from "./Insert";
import Delete from "./Delete";
import dayjs from "dayjs";

const ZOHO = window.ZOHO;

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [snackbar, setSnackbar] = React.useState(false);
  const [allData, setAllData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const data = [];

  const handleSelect = (name) => {
    setOpen((currentId) => {
      // if it's already opened then unselect it
      if (currentId === name) return null;
      return name;
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const [module, setModule] = React.useState("CRUD");
  const [zohoLoaded, setZohoLoaded] = React.useState(false);
  // console.log(allData);
  let headCells = [];
  if (module === "CRUD") {
    headCells = [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
      },
      {
        id: "position",
        numeric: true,
        disablePadding: false,
        label: "Position",
      },
      {
        id: "team",
        numeric: true,
        disablePadding: false,
        label: "Team",
      },
      {
        id: "bday",
        numeric: true,
        disablePadding: false,
        label: "BDay",
      },
      {
        id: "email",
        numeric: true,
        disablePadding: false,
        label: "Email",
      },
    ];
  } else if (module === "Deals") {
    headCells = [
      {
        id: "deal_Name",
        numeric: false,
        disablePadding: true,
        label: "Deal_Name",
      },
      {
        id: "street",
        numeric: true,
        disablePadding: false,
        label: "Street",
      },
      {
        id: "stage",
        numeric: true,
        disablePadding: false,
        label: "Stage",
      },

      {
        id: "time",
        numeric: true,
        disablePadding: false,
        label: "Modified_Time",
      },
      {
        id: "amount",
        numeric: true,
        disablePadding: false,
        label: "Amount",
      },
    ];
  } else if (module === "TESTS") {
    headCells = [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
      },
      {
        id: "title",
        numeric: true,
        disablePadding: false,
        label: "Title",
      },
      {
        id: "start_date",
        numeric: true,
        disablePadding: false,
        label: "Start_Date",
      },

      {
        id: "color",
        numeric: true,
        disablePadding: false,
        label: "Color",
      },
      {
        id: "end_date",
        numeric: true,
        disablePadding: false,
        label: "End_Date",
      },
    ];
  }

  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <b> {headCell.label}</b>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  const [id, setID] = React.useState([]);
  // console.log("sss", id);
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    // console.log("shezan", disable);
    // console.log(setAllData);
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            <Insert module={module} datas={datas} />
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <Delete id={id} module={module} />
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  React.useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      //Custom Bussiness logic goes here
      // console.log(data);
    });

    ZOHO.embeddedApp.init().then(() => {
      setZohoLoaded(true);
    });
  }, []);

  allData.forEach((item) => {
    data.push({
      name: item.Name,
      position: item.Position,
      id: item.id,
      team: item.Team,
      email: item.Email,
      bday: item.BDay,
      deal_name: item.deal_name,
      street: item.Street,
      stage: item.stage,
      modified_time: item.modified_time,
      amount: item.amount,
      title: item.title,
      start_date: item.start_date,
      color: item.color,
      end_date: item.end_date,
    });
  });

  React.useEffect(() => {
    async function fetchData() {
      // You can await here
      setLoad(true);
      await ZOHO.CRM.API.getAllRecords({
        Entity: module,
        sort_order: "asc",
        per_page: 200,
        page: 1,
      }).then(function (data) {
        setAllData(data.data);
        setLoad(false);
      });
      // ...
    }
    fetchData();
    // if (zohoLoaded) {
    //    ZOHO.CRM.API.getAllRecords ({
    //     Entity: module,
    //     sort_order: "asc",
    //     per_page: 200,
    //     page: 1,
    //   }).then(function (data) {
    //     setAllData(data.data);
    //   });
    //   setLoad(true);
    // }
  }, [zohoLoaded, module]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleUpdate = async ({ id, name, position, team, bday, email }) => {
    // console.log(id, name, position, team, bday, email);
    setSnackbar(true);
    window.location.reload(false);
    window.location.reload(false);
    let config = {
      Entity: "CRUD",
      APIData: {
        id: id,
        Name: name,
        Position: position,
        Team: team,
        BDay: bday,
        Email: email,
      },
      Trigger: ["workflow"],
    };
    // console.log("mahadi", config);
    await ZOHO.CRM.API.updateRecord(config).then(function (data) {
      // console.log(data);
      if (data.data[0].code === "SUCCESS") {
        setSnackbar(true);
      }
    });
  };
  const handleUpdate1 = ({
    id,
    deal_name,
    street,
    stage,
    modified_time,
    amount,
  }) => {
    setSnackbar(true);
    window.location.reload(false);
    window.location.reload(false);
    let entry = {
      Entity: "Deals",
      APIData: {
        id: id,
        Deal_Name: deal_name,
        Street: street,
        Stage: stage,
        Modified_Time: modified_time,
        Amount: amount,
      },
      Trigger: ["workflow"],
    };
    // console.log("mahadi", entry);
    ZOHO.CRM.API.updateRecord(entry).then(function (data) {
      // console.log(data);
    });
  };
  const handleUpdate2 = ({ id, name, title, start_date, color, end_date }) => {
    setSnackbar(true);

    let show = {
      Entity: "TESTS",
      APIData: {
        id: id,
        Name: name,
        Title: title,
        Start_Date: start_date,
        End_Date: end_date,
        Color: color,
      },
      Trigger: ["workflow"],
    };
    // console.log("mahadi", show);
    ZOHO.CRM.API.updateRecord(show).then(function (data) {
      // console.log(data);
    });
  };
  const [load, setLoad] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [position, setPosition] = React.useState(null);
  const [team, setTeam] = React.useState(null);
  const [bday, setBDay] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [stage, setStage] = React.useState(null);
  const [deal_name, setDeal_Name] = React.useState(null);
  const [modified_time, setModified_Time] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [start_date, setStart_Date] = React.useState(null);
  const [end_date, setEnd_Date] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [color, setColor] = React.useState(null);
  const [street, setStreet] = React.useState(null);

  // const [deal_Name, setDeal_Name] = React.useState("");

  // const [modified_Time, setModified_Time] = React.useState("");
  // const [stage, setStage] = React.useState("");
  // const [amount, setAmount] = React.useState("");

  const [search, setSearch] = React.useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const checkEmail=()=>{
  //   if(){

  //   }
  // }
  const handleEmail = () => {
    if (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return false;
    } else if (email === null) {
      return false;
    } else {
      return true;
    }
  };

  // const keys = allData.keys;
  let datas = [];
  datas = allData;
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", p: 1, m: 1 }}></Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Stack direction="row" spacing={1}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="CRUD" onClick={() => setModule("CRUD")} />
                  <Tab label="Deals" onClick={() => setModule("Deals")} />
                  <Tab label="TESTS" onClick={() => setModule("TESTS")} />
                </Tabs>
              </Stack>
            </Box>
            <Box sx={{ width: "50%" }}>
              <TextField
                sx={{ width: "400px" }}
                label="Search..."
                size="small"
                id="fullWidth"
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  endAdornment: <SearchIcon />,
                  style: {
                    borderRadius: "20px",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} allData={allData} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />

            <TableBody>
              {datas
                .filter((user) => {
                  return Object.values(user).some((value) => {
                    // console.log("User", user);
                    if (typeof value === "string") {
                      // console.log("value", value);
                      return value.toLowerCase().includes(search.toLowerCase());
                    }
                    return false;
                  });
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                .map((data, index) => {
                  // console.log("appon", data);
                  if (module === "CRUD") {
                    const isItemSelected = isSelected(data.Name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <>
                        <React.Fragment key={data.Name}>
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, data.Name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                value={data.id}
                                onClick={(e) =>
                                  setID((prev) => [...prev, e.target.value])
                                }
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {data.Name}
                            </TableCell>
                            <TableCell align="right">{data.Position}</TableCell>
                            <TableCell align="right">{data.Team}</TableCell>
                            <TableCell align="right">{data.BDay}</TableCell>
                            <TableCell align="right">{data.Email}</TableCell>
                            <TableCell align="right">
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleSelect(data.id)}
                              >
                                {open ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ paddingBottom: 0, paddingTop: 0 }}
                              colSpan={6}
                            >
                              <Collapse
                                in={open === data.id}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box sx={{ margin: 1 }}>
                                  <Table size="small" aria-label="purchases">
                                    <TableRow>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          type="text"
                                          name="name"
                                          defaultValue={data.Name || ""}
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Position"
                                          type="text"
                                          name="position"
                                          defaultValue={data.Position || ""}
                                          onChange={(e) =>
                                            setPosition(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Team"
                                          type="number"
                                          name="team"
                                          defaultValue={data.Team || ""}
                                          onChange={(e) =>
                                            setTeam(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="BDay"
                                          type="date"
                                          name="bday"
                                          defaultValue={data.BDay || ""}
                                          onChange={(e) =>
                                            setBDay(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          error={handleEmail()}
                                          placeholder="Email"
                                          type="text"
                                          name="email"
                                          defaultValue={data.Email || ""}
                                          onChange={(e) =>
                                            setEmail(e.target.value)
                                          }
                                        />
                                      </TableCell>

                                      <TableCell>
                                        <Button
                                          disabled={handleEmail()}
                                          sx={{ width: "150px" }}
                                          type="submit"
                                          variant="contained"
                                          onClick={function refreshPage() {
                                            handleUpdate({
                                              id: data.id,
                                              name: name || data.Name,
                                              position:
                                                position || data.Position,
                                              team: team || data.Team,
                                              bday: bday || data.BDay,
                                              email: email || data.Email,
                                            });
                                          }}
                                        >
                                          update
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      </>
                    );
                  } else if (module === "Deals") {
                    const isItemSelected = isSelected(data.Deal_Name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <>
                        <React.Fragment key={index}>
                          <TableRow
                            hover
                            onClick={(event) =>
                              handleClick(event, data.Deal_Name)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                value={data.id}
                                onClick={(e) =>
                                  setID((prev) => [...prev, e.target.value])
                                }
                                // value={data.id}
                                // onChange={(e) => setID(e.target.value)}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {data.Deal_Name}
                            </TableCell>
                            <TableCell align="right">{data.Street}</TableCell>
                            <TableCell align="right">{data.Stage}</TableCell>
                            <TableCell align="right">
                              {dayjs(data.Modified_Time).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell align="right">{data.Amount}</TableCell>
                            <TableCell align="right">
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleSelect(data.id)}
                              >
                                {open ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ paddingBottom: 0, paddingTop: 0 }}
                              colSpan={6}
                            >
                              <Collapse
                                in={open === data.id}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box sx={{ margin: 1 }}>
                                  <Table size="small" aria-label="purchases">
                                    <TableRow>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Deal_Name"
                                          type="text"
                                          name="Deal_Name"
                                          defaultValue={data.Deal_Name || ""}
                                          onChange={(e) =>
                                            setDeal_Name(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Street"
                                          type="text"
                                          name="street"
                                          defaultValue={data.Street || ""}
                                          onChange={(e) =>
                                            setStreet(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Stage"
                                          type="text"
                                          name="Stage"
                                          defaultValue={data.Stage || ""}
                                          onChange={(e) =>
                                            setStage(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Modified_Time"
                                          type="date"
                                          name="Modified_Time"
                                          defaultValue={
                                            data.Modified_Time || ""
                                          }
                                          onChange={(e) =>
                                            setModified_Time(e.target.value)
                                          }
                                        />
                                      </TableCell>

                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Amount"
                                          type="text"
                                          name="Amount"
                                          defaultValue={data.Amount || ""}
                                          onChange={(e) =>
                                            setAmount(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          // disabled={disable}
                                          sx={{ width: "150px" }}
                                          type="submit"
                                          variant="contained"
                                          onClick={() =>
                                            handleUpdate1({
                                              id: data.id,
                                              deal_name:
                                                deal_name || data.Deal_Name,
                                              street: street || data.Street,
                                              stage: stage || data.Stage,
                                              modified_time:
                                                modified_time ||
                                                data.Modified_Time,
                                              amount: amount || data.Amount,
                                            })
                                          }
                                        >
                                          update
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      </>
                    );
                  } else if (module === "TESTS") {
                    const isItemSelected = isSelected(data.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <React.Fragment>
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, data.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              value={data.id}
                              onClick={(e) =>
                                setID((prev) => [...prev, e.target.value])
                              }
                              // value={data.id}
                              // onChange={(e) => setID(e.target.value)}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {data?.Name}
                          </TableCell>
                          <TableCell align="right">{data.Title}</TableCell>
                          <TableCell align="right">{data.Start_Date}</TableCell>
                          <TableCell align="right">{data.Color}</TableCell>
                          <TableCell align="right">{data.End_Date}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => handleSelect(data.id)}
                            >
                              {open ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={6}
                          >
                            <Collapse
                              in={open === data.id}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ margin: 1 }}>
                                <Table size="small" aria-label="purchases">
                                  <TableRow>
                                    <TableCell>
                                      <TextField
                                        size="small"
                                        placeholder="Name"
                                        type="text"
                                        name="name"
                                        defaultValue={data.Name || ""}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        size="small"
                                        placeholder="Title"
                                        type="text"
                                        name="title"
                                        defaultValue={data.Title || ""}
                                        onChange={(e) =>
                                          setTitle(e.target.value)
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        size="small"
                                        placeholder="Start_Date"
                                        type="date"
                                        name="start_date"
                                        defaultValue={data.Start_Date || ""}
                                        onChange={(e) =>
                                          setStart_Date(e.target.value)
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        size="small"
                                        placeholder="Color"
                                        type="text"
                                        name="color"
                                        defaultValue={data.Color || ""}
                                        onChange={(e) =>
                                          setColor(e.target.value)
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        size="small"
                                        placeholder="End_Date"
                                        type="date"
                                        name="end_date"
                                        defaultValue={data.End_Date || ""}
                                        onChange={(e) =>
                                          setEnd_Date(e.target.value)
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        sx={{ width: "150px" }}
                                        type="submit"
                                        variant="contained"
                                        onClick={function refreshPage() {
                                          window.location.reload(false);
                                          window.location.reload(false);
                                          handleUpdate2({
                                            id: data.id,
                                            name: name || data.Name,
                                            title: title || data.Title,
                                            start_date:
                                              start_date || data.Start_Date,
                                            color: color || data.Color,
                                            end_date: end_date || data.End_Date,
                                          });
                                        }}
                                      >
                                        update
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  }
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <br />
      <br />
      <br />
      {load && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {snackbar && (
        <Snackbar
          open={snackbar}
          autoHideDuration={5000}
          message="Note archived"
          onClose={() => setSnackbar(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            successfully updated!
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
