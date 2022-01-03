import React, { useContext } from "react"
import { ApiContext } from "../context/ApiContext"
import { makeStyles } from "@material-ui/core/styles"

import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import AddIcon from "@material-ui/icons/Add"
import BillList from "./BillList"
import CreateModal from "./CreateModal"
import { Fab } from "@mui/material"

const useStyles = makeStyles({
  container: {
    marginTop: "2rem",
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
      <Grid container className={classes.grid}>
        <Grid item xs={10}>
          <Grid container spacing={5} mt={5} className={classes.container}>
            <Grid item xs={12}>
              <BillList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Fab
        sx={{ position: "fixed" }}
        className={classes.fab}
        color="secondary"
        aria-label="add"
        onClick={() => setModalIsOpen(true)}
      >
        <AddIcon />
      </Fab>
      {/* <button className={classes.fab} onClick={() => setModalIsOpen(true)}>
        <AddIcon />
      </button> */}
      <CreateModal />
    </Container>
  )
}

export default Main
