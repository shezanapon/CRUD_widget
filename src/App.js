import logo from "./logo.svg";
import "./App.css";
import EnhancedTable from "./components/Table";
import { Box } from "@mui/material";

function App() {
  return (
    <Box className="App">
      <Box p={4}>
        <EnhancedTable />
      </Box>
    </Box>
  );
}

export default App;
