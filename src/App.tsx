import { Box } from "@mui/system"
import "./App.css"

import PersistentDrawerLeft from "./components/Drawer"
import Main from "./components/Main"
import NavBar from "./components/NavBar"

function App() {
  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex" }}>
        <PersistentDrawerLeft />
        <Main />
      </Box>
    </>
  )
}

export default App
