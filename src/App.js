import * as React from "react";
import "./App.css";
import EnhancedTable from "./components/Table";
import { Box } from "@mui/material";

import Insert from "./components/Insert";
import Delete from "./components/Delete";
// const Com2 = ({ p }) => {
//   return <h1>{p}</h1>;
// };
// const Com = ({ nameee }) => {
//   const val = <Com2 p={nameee}></Com2>;
//   return val;
// };

function App() {
  // const [n, sN] = React.useState("My name");
  return (
    <Box className="App">
      <Box p={4}>
        {/* <Com nameee={n} /> */}
        <EnhancedTable />
        {/* <Insert /> */}
        {/* <Delete /> */}
      </Box>
    </Box>
  );
}

export default App;
