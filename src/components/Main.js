import React, { useContext } from "react"
import { ApiContext } from "../context/ApiContext"
import Modal from "react-modal"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"

import { IoMdClose } from "react-icons/io"

import BillList from "./BillList"
import { Box } from "@mui/system"
import { Button, MenuItem } from "@mui/material"
import { Paper, Select } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "1rem",
    textAlign: "center",
  },
  button: {
    marginTop: "2rem",
    textAlign: "center",
  },
  grid: {
    justifyContent: "center",
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
  fab: {
    position: "fixed",
    zIndex: 2,
    right: "60px",
    bottom: "60px",
  },
}))

const Main = () => {
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
    deleteModalIsOpen,
    setDeleteModalIsOpen,
    newBill,
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

  return (
    <Container maxWidth="md">
      <Fab
        className={classes.fab}
        color="secondary"
        aria-label="add"
        onClick={() => setModalIsOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Grid container className={classes.grid}>
        <Grid item xs={11}>
          <Grid container spacing={5} mt={5} className={classes.container}>
            <Grid item xs={12}>
              <BillList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

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
            onClick={() => setModalIsOpen()}
          >
            <IoMdClose />
          </button>
        </Box>
        <form onSubmit={(e) => newBill(e)}>
          <Box className={classes.box}>
            <Typography variant="body2">日付</Typography>
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
              内容
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
              金額（円）
            </Typography>
            <TextField
              className={classes.value}
              type="text"
              onChange={(event) => setAmount(event.target.value)}
            />
          </Box>
          <Box className={classes.box} mt={2}>
            <Typography variant="body2" className={classes.item}>
              出入元
            </Typography>
            <Select
              className={classes.value}
              label="出入元"
              onChange={(event) => setPocket(event.target.value)}
              defaultValue={pocket}
            >
              <MenuItem value={"財布"}>財布</MenuItem>
              <MenuItem value={"PayPay"}>PayPay</MenuItem>
            </Select>
          </Box>
          <Box className={classes.box} mt={2}>
            <Typography variant="body2" className={classes.item}>
              大項目
            </Typography>
            <Select
              className={classes.value}
              label="大項目"
              onChange={(event) => setCategory(event.target.value)}
              defaultValue={category}
            >
              <MenuItem value={"未分類"}>未分類</MenuItem>
              <MenuItem value={"食費"}>食費</MenuItem>
            </Select>
          </Box>
          {category === "食費" ? (
            <Box className={classes.box} mt={2}>
              <Typography variant="body2" className={classes.item}>
                小項目
              </Typography>
              <Select
                className={classes.value}
                label="小項目"
                onChange={(event) => setSubcategory(event.target.value)}
                defaultValue={subcategory}
              >
                <MenuItem value={"野菜"}>野菜</MenuItem>
                <MenuItem value={"お肉"}>お肉</MenuItem>
                <MenuItem value={"調味料"}>調味料</MenuItem>
              </Select>
            </Box>
          ) : (
            <Box className={classes.box} mt={2}>
              <Typography variant="body2" className={classes.item}>
                小項目
              </Typography>
              <Select
                className={classes.value}
                label="小項目"
                onChange={(event) => setSubcategory(event.target.value)}
                defaultValue={subcategory}
              >
                <MenuItem value={"未分類"}>未分類</MenuItem>
              </Select>
            </Box>
          )}
          <Box className={classes.box} mt={2}>
            <Typography variant="body2" className={classes.item}>
              メモ
            </Typography>
            <TextField
              className={classes.value}
              type="text"
              onChange={(event) => setMemo(event.target.value)}
            />
          </Box>
          <Container className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              disabled={
                (title === "") | (amount === "") | (pocket === "")
                  ? true
                  : false
              }
              color="success"
              onClick={(e) => newBill(e)}
            >
              保存する
            </Button>
          </Container>
        </form>
      </Modal>
    </Container>
  )
}

export default Main
