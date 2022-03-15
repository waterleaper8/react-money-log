import React, { useContext } from "react"
import { ApiContext } from "../context/ApiContext"
import { makeStyles } from "@material-ui/core/styles"

import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import AddIcon from "@material-ui/icons/Add"
import BillList from "./BillList"
import CreateModal from "./CreateModal"
import { Fab } from "@mui/material"
import BillsSelector from "./BillsSelector"
import AddPocketModal from "./AddPocketModal"
import PocketsPieGraph from "./PocketsPieGraph"
import { Box } from "@mui/system"

const useStyles = makeStyles({
  container: {
    marginTop: "1rem",
    textAlign: "center",
  },
  grid: {
    justifyContent: "center",
  },
  fab: {
    right: "60px",
    bottom: "60px",
  },
  button: {
    marginTop: "2rem",
    textAlign: "center",
  },
})

const Main = (props) => {
  const classes = useStyles(props)
  const { setModalIsOpen } = useContext(ApiContext)

  return (
    <Container
      sx={{ flexGrow: 1, p: 3 }}
      className={classes.container}
      maxWidth="md"
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PocketsPieGraph />
      </Box>
      <Grid container mt={5} className={(classes.grid, classes.container)}>
        <BillsSelector />
        <BillList />
      </Grid>
      <Fab
        sx={{ position: "fixed" }}
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={() => setModalIsOpen(true)}
      >
        <AddIcon />
      </Fab>
      <CreateModal />
      <AddPocketModal />
    </Container>
  )
}

export default Main
