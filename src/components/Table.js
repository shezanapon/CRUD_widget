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
import { Button, Chip, Collapse, Stack, TextField } from "@mui/material";
import Insert from "./Insert";
import Delete from "./Delete";
import App from "../App";

const ZOHO = window.ZOHO;

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const data = [];

  const [open, setOpen] = React.useState(false);
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
  const [allData, setAllData] = React.useState([]);
  console.log(allData);
  if (module === "CRUD") {
    var headCells = [
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
    var headCells = [
      {
        id: "deal_Name",
        numeric: false,
        disablePadding: true,
        label: "Deal_Name",
      },
      {
        id: "id",
        numeric: true,
        disablePadding: false,
        label: "id",
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
  } else if (module === "Accounts") {
    var headCells = [
      {
        id: "account_Name",
        numeric: false,
        disablePadding: true,
        label: "Account_Name",
      },
      {
        id: "id",
        numeric: true,
        disablePadding: false,
        label: "id",
      },
      {
        id: "exchange_Rate",
        numeric: true,
        disablePadding: false,
        label: "Exchange_Rate",
      },

      {
        id: "time",
        numeric: true,
        disablePadding: false,
        label: "Modified_Time",
      },
      {
        id: "account_Number",
        numeric: true,
        disablePadding: false,
        label: "Account_Number",
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
  const [id, setID] = React.useState();
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    // console.log("shezan", disable);

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
            <Insert module={module} />
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <Delete id={id} />
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
      team: item.Team,
      email: item.Email,
      bday: item.BDay,
    });
  });
  React.useEffect(() => {
    if (zohoLoaded) {
      ZOHO.CRM.API.getAllRecords({
        Entity: module,
        sort_order: "asc",
        per_page: 200,
        page: 1,
      }).then(function (data) {
        setAllData(data.data);
      });
    }
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleUpdate = (id, name, position, team, bday, email) => {
    var config = {
      Entity: module,
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
    ZOHO.CRM.API.updateRecord(config).then(function (data) {
      // console.log(data);
    });
  };

  const [name, setName] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [team, setTeam] = React.useState("");
  const [bday, setBDay] = React.useState("");
  const [email, setEmail] = React.useState();

  const [search, setSearch] = React.useState("");

  console.log(id);
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const [disable, setDisable] = React.useState(true);

  const checkEmail = (e) => {
    setDisable(!regex.test(e.target.value));
    setEmail(e.target.value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", p: 1, m: 1 }}></Box>
        <Box>
          <Box
            sx={{
              width: 900,
              maxWidth: "100%",
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <Stack direction="row" spacing={1} sx={{ paddingRight: "200px" }}>
              <Button variant="contained" onClick={() => setModule("CRUD")}>
                CRUD
              </Button>
              <Button variant="contained" onClick={() => setModule("Deals")}>
                Deals
              </Button>
              <Button variant="contained" onClick={() => setModule("Accounts")}>
                Accounts
              </Button>
            </Stack>
            <TextField
              fullWidth
              label="Search here..."
              size="small"
              id="fullWidth"
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
              }}
            />
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
              {allData
                .filter((user) => user.id.includes(search))
                .map((data, index) => {
                  // console.log({ data });
                  const isItemSelected = isSelected(data.Name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  if (module === "CRUD") {
                    return (
                      <>
                        <React.Fragment>
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, data.Name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={data.Name}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                value={data.id}
                                onClick={(e) => setID(e.target.value)}
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
                                in={open === data.Name}
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
                                          value={name}
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
                                          value={position}
                                          onChange={(e) =>
                                            setPosition(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Team"
                                          type="text"
                                          name="team"
                                          value={team}
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
                                          value={bday}
                                          onChange={(e) =>
                                            setBDay(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Email"
                                          type="text"
                                          name="email"
                                          value={email}
                                          onChange={(e) => checkEmail(e)}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          disabled={disable}
                                          sx={{ width: "150px" }}
                                          type="submit"
                                          variant="contained"
                                          onClick={function refreshPage() {
                                            window.location.reload(false);
                                            window.location.reload(false);
                                            handleUpdate(
                                              data.id,
                                              name,
                                              position,
                                              team,
                                              bday,
                                              email
                                            );
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
                    return (
                      <>
                        <React.Fragment>
                          <TableRow
                            hover
                            onClick={(event) =>
                              handleClick(event, data.Deal_Name)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={data.Deal_Name}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                value={data.id}
                                onClick={(e) => setID(e.target.value)}
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
                            <TableCell align="right">{data.id}</TableCell>
                            <TableCell align="right">{data.Stage}</TableCell>
                            <TableCell align="right">
                              {data.Modified_Time}
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
                                in={open === data.Deal_Name}
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
                                          value={name}
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
                                          value={position}
                                          onChange={(e) =>
                                            setPosition(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Team"
                                          type="text"
                                          name="team"
                                          value={team}
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
                                          value={bday}
                                          onChange={(e) =>
                                            setBDay(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Email"
                                          type="text"
                                          name="email"
                                          value={email}
                                          onChange={(e) => checkEmail(e)}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          disabled={disable}
                                          sx={{ width: "150px" }}
                                          type="submit"
                                          variant="contained"
                                          onClick={function refreshPage() {
                                            window.location.reload(false);
                                            window.location.reload(false);
                                            handleUpdate(
                                              data.id,
                                              name,
                                              position,
                                              team,
                                              bday,
                                              email
                                            );
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
                  } else {
                    return (
                      <>
                        <React.Fragment>
                          <TableRow
                            hover
                            onClick={(event) =>
                              handleClick(event, data.Account_Name)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={data.Account_Name}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                value={data.id}
                                onClick={(e) => setID(e.target.value)}
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
                              {data.Account_Name}
                            </TableCell>
                            <TableCell align="right">{data.id}</TableCell>
                            <TableCell align="right">
                              {data.Exchange_Rate}
                            </TableCell>
                            <TableCell align="right">
                              {data.Modified_Time}
                            </TableCell>
                            <TableCell align="right">
                              {data.Account_Number}
                            </TableCell>
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
                                in={open === data.Account_Name}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box sx={{ margin: 1 }}>
                                  <Table size="small" aria-label="purchases">
                                    <TableRow>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Account_Name"
                                          type="text"
                                          name="Account_Name"
                                          value={name}
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
                                          value={position}
                                          onChange={(e) =>
                                            setPosition(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Team"
                                          type="text"
                                          name="team"
                                          value={team}
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
                                          value={bday}
                                          onChange={(e) =>
                                            setBDay(e.target.value)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          size="small"
                                          placeholder="Email"
                                          type="text"
                                          name="email"
                                          value={email}
                                          onChange={(e) => checkEmail(e)}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          disabled={disable}
                                          sx={{ width: "150px" }}
                                          type="submit"
                                          variant="contained"
                                          onClick={function refreshPage() {
                                            window.location.reload(false);
                                            window.location.reload(false);
                                            handleUpdate(
                                              data.id,
                                              name,
                                              position,
                                              team,
                                              bday,
                                              email
                                            );
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
    </Box>
  );
}
