import React, { useContext, useEffect } from "react"
import { ApiContext } from "../context/ApiContext"
import { makeStyles } from "@material-ui/core/styles"

import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { IoMdClose } from "react-icons/io"
import { Box } from "@mui/system"
import { Button, MenuItem } from "@mui/material"
import { Select } from "@material-ui/core"
import Modal from "react-modal"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "2rem",
    textAlign: "center",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  item: {
    width: "108px",
  },
  value: {
    width: "180px",
    color: "#555555",
  },
}))

const CreateModal = () => {
  const classes = useStyles()
  Modal.setAppElement("#root")
  const {
    date,
    setDate,
    title,
    setTitle,
    amount,
    setAmount,
    pocket,
    setPocket,
    category,
    setCategory,
    subcategory,
    setSubcategory,
    setMemo,
    modalIsOpen,
    setModalIsOpen,
    newBill,
    pockets,
  } = useContext(ApiContext)

  const customStyles = {
    content: {
      width: "300px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.2)",
    },
  }

  useEffect(() => {
    modalIsOpen
      ? (document.body.style.overflowX = "hidden")
      : (document.body.style.overflowX = "auto")
    return
  }, [modalIsOpen])

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyles}
    >
      <Box sx={{ textAlign: "right" }}>
        <button
          type="button"
          className="btn-modal"
          style={{ textAlign: "right" }}
          onClick={() => setModalIsOpen(false)}
        >
          <IoMdClose />
        </button>
      </Box>
      <form onSubmit={(e) => newBill(e)}>
        <Box className={classes.box}>
          <Typography variant="body2">??????</Typography>
          <TextField
            className={classes.value}
            id="date"
            type="date"
            defaultValue={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </Box>
        <Box className={classes.box} mt={2}>
          <Typography variant="body2" className={classes.item}>
            ??????
          </Typography>
          <TextField
            autoFocus
            className={classes.value}
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
        </Box>
        <Box className={classes.box} mt={2}>
          <Typography variant="body2" className={classes.item}>
            ???????????????
          </Typography>
          <TextField
            className={classes.value}
            type="number"
            onChange={(event) => setAmount(event.target.value * -1)}
            defaultValue={amount}
          />
        </Box>
        <Box className={classes.box} mt={2}>
          <Typography variant="body2" className={classes.item}>
            ?????????
          </Typography>
          <Select
            className={classes.value}
            label="?????????"
            onChange={(event) => setPocket(event.target.value)}
            defaultValue="??????"
          >
            {pockets.map((pocket) => {
              return (
                <MenuItem key={pocket.id} value={pocket.name}>
                  {pocket.name}
                </MenuItem>
              )
            })}
          </Select>
        </Box>
        <Box className={classes.box} mt={2}>
          <Typography variant="body2" className={classes.item}>
            ?????????
          </Typography>
          <Select
            className={classes.value}
            label="?????????"
            onChange={(event) => setCategory(event.target.value)}
            defaultValue={category}
          >
            <MenuItem value={"?????????"}>?????????</MenuItem>
            <MenuItem value={"??????"}>??????</MenuItem>
          </Select>
        </Box>

        <Box className={classes.box} mt={2}>
          <Typography variant="body2" className={classes.item}>
            ?????????
          </Typography>
          <Select
            className={classes.value}
            label="?????????"
            onChange={(event) => setSubcategory(event.target.value)}
            defaultValue={subcategory}
          >
            <MenuItem value={"?????????"}>?????????</MenuItem>
            <MenuItem value={"??????"}>??????</MenuItem>
            <MenuItem value={"??????"}>??????</MenuItem>
            <MenuItem value={"??????"}>??????</MenuItem>
            <MenuItem value={"?????????"}>?????????</MenuItem>
          </Select>
        </Box>
        <Box className={classes.box} mt={2}>
          <Typography variant="body2" className={classes.item}>
            ??????
          </Typography>
          <TextField
            className={classes.value}
            type="text"
            onChange={(event) => setMemo(event.target.value)}
          />
        </Box>
        <Container className={classes.container}>
          <Button
            type="submit"
            variant="contained"
            disabled={
              (title === "") | (amount === 0) | (pocket === "") ? true : false
            }
            color="success"
            onClick={(e) => newBill(e)}
          >
            ????????????
          </Button>
        </Container>
      </form>
    </Modal>
  )
}

export default CreateModal
