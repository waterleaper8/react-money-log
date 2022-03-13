import { Box } from "@mui/system"
import "./App.css"
import "./sass/main.css"

import Main from "./components/Main"
import NavBar from "./components/NavBar"
import { Container } from "@mui/material"
import PocketCardList from "./components/PocketCardList"

function App() {
  return (
    <Container style={{ padding: "0" }}>
      <NavBar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PocketCardList />
        <Main />
      </Box>
    </Container>
  )
}

export default App
