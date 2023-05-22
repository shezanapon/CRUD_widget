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
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Collapse, TextField } from "@mui/material";
import Insert from "./Insert";
import Delete from "./Delete";
import App from "../App";

const ZOHO = window.ZOHO;

const headCells = [
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
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
export default function EnhancedTable() {
  const [id, setID] = React.useState();
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    // console.log("shezan", id);

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
            <Insert />
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
  const [zohoLoaded, setZohoLoaded] = React.useState(false);
  const [allData, setAllData] = React.useState([]);
  // console.log(allData);

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
        Entity: "CRUD",
        sort_order: "asc",
        per_page: 200,
        page: 1,
      }).then(function (data) {
        setAllData(data.data);
      });
    }
  }, [zohoLoaded]);

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
    ZOHO.CRM.API.updateRecord(config).then(function (data) {
      // console.log(data);
    });
  };

  const [name, setName] = React.useState();
  const [position, setPosition] = React.useState();
  const [team, setTeam] = React.useState();
  const [bday, setBDay] = React.useState();
  const [email, setEmail] = React.useState();

  const [search, setSearch] = React.useState();

  // console.log(id);

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", p: 1, m: 1 }}></Box>
        <Box>
          <Box
            sx={{
              width: 400,
              maxWidth: "100%",
              display: "inline-flex",
            }}
          >
            <TextField
              fullWidth
              label="SEARCH"
              size="small"
              id="fullWidth"
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon />
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
                .filter((user) => user.Name.toLowerCase().includes(search))
                .map((data, index) => {
                  // console.log({ data });
                  const isItemSelected = isSelected(data.Name);
                  const labelId = `enhanced-table-checkbox-${index}`;

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
                              onClick={() => handleSelect(data.Name)}
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
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        sx={{ width: "150px" }}
                                        type="submit"
                                        variant="contained"
                                        onClick={() =>
                                          handleUpdate(
                                            data.id,
                                            name,
                                            position,
                                            team,
                                            bday,
                                            email
                                          )
                                        }
                                      >
                                        save
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                  {/* <TableRow>
                                  <TableCell>
                                    <TextField
                                      id="outlined-size-small"
                                      defaultValue="Small"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {" "}
                                    <FormControl
                                      sx={{ m: 1, minWidth: 120 }}
                                      size="small"
                                    >
                                      <InputLabel id="demo-select-small-label">
                                        Experience
                                      </InputLabel>
                                      <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                      >
                                        <MenuItem value={10}>2 year</MenuItem>
                                        <MenuItem value={20}>4 year</MenuItem>
                                        <MenuItem value={30}>5 year</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell>
                                    {" "}
                                    <FormControl
                                      sx={{ m: 1, minWidth: 120 }}
                                      size="small"
                                    >
                                      <InputLabel id="demo-select-small-label">
                                        Team
                                      </InputLabel>
                                      <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                      >
                                        <MenuItem value={1}>10</MenuItem>
                                        <MenuItem value={2}>20</MenuItem>
                                        <MenuItem value={3}>18</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell>
                                    {" "}
                                    <FormControl
                                      sx={{ m: 1, minWidth: 120 }}
                                      size="small"
                                    >
                                      <InputLabel id="demo-select-small-label">
                                        BDay
                                      </InputLabel>
                                      <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                      >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      id="outlined-size-small"
                                      defaultValue="Small"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell></TableCell>
                                </TableRow> */}
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    </>
                  );
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
