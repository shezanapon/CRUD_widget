import * as React from "react";
import "./App.css";
import EnhancedTable from "./components/Table";
import { Box } from "@mui/material";

function App({ search }) {
  return (
    <Box className="App">
      <Box p={4}>
        <EnhancedTable />
      </Box>
    </Box>
  );
}
export default App;
