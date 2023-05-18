import logo from "./logo.svg";
import "./App.css";
import EnhancedTable from "./components/Table";
import { Box } from "@mui/material";

import Insert from "./components/Insert";
import Delete from "./components/Delete";

function App() {
  return (
    <Box className="App">
      <Box p={4}>
        <EnhancedTable />
        {/* <Insert /> */}
        {/* <Delete /> */}
      </Box>
    </Box>
  );
}

export default App;
