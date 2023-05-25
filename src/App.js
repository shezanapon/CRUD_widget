import * as React from "react";
import "./App.css";
import EnhancedTable from "./components/Table";
import { Box, Chip, Stack, TextField } from "@mui/material";

import Insert from "./components/Insert";
import Delete from "./components/Delete";
// const Com2 = ({ p }) => {
//   return <h1>{p}</h1>;
// };
// const Com = ({ nameee }) => {
//   const val = <Com2 p={nameee}></Com2>;
//   return val;
// };

function App({ search }) {
  const [sarch, setSearch] = React.useState(search);
  // const [n, sN] = React.useState("My name");
  return (
    <Box className="App">
      <Box p={4}>
        {/* <Box
          sx={{
            width: 900,
            maxWidth: "100%",
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <Stack direction="row" spacing={1} sx={{ paddingRight: "200px" }}>
            <Chip label="CRUD" color="primary" />
            <Chip label="Deals" color="primary" />
            <Chip label="Accounts" color="primary" />
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
        </Box> */}
        {/* <Com nameee={n} /> */}
        <EnhancedTable />
        {/* <Insert /> */}
        {/* <Delete /> */}
      </Box>
    </Box>
  );
}

export default App;
