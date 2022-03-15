import { Box } from "@mui/system"
import "./App.css"
import "./sass/main.css"

import Main from "./components/Main"
import NavBar from "./components/NavBar"
import { Container } from "@mui/material"
import Aside from "./components/Aside"

function App() {
  return (
    <Container style={{ padding: "0" }}>
      <NavBar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Aside />
        <Main />
      </Box>
    </Container>
  )
}

export default App
