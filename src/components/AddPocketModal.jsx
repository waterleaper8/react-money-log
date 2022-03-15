import React, { useContext } from "react"
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

const AddPocketModal = () => {
  const classes = useStyles()
  Modal.setAppElement("#root")
  const {
    pocketName,
    setPocketName,
    pocketCategory,
    setPocketCategory,
    pocketAmount,
    setPocketAmount,
    pocketModalIsOpen,
    setPocketModalIsOpen,
    addPocket,
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
      overflow: "hidden",
    },
  }

  return (
    <Modal
      isOpen={pocketModalIsOpen}
      onRequestClose={() => setPocketModalIsOpen(false)}
      style={customStyles}
    >
      <Box sx={{ textAlign: "right" }}>
        <button
          type="button"
          className="btn-modal"
          style={{ textAlign: "right" }}
          onClick={() => setPocketModalIsOpen(false)}
        >
          <IoMdClose />
        </button>
      </Box>
      <form onSubmit={(e) => addPocket(e)}>
        <Box className={classes.box} mt={2}>
          <Typography variant="body2" className={classes.item}>
            口座名
          </Typography>
          <TextField
            autoFocus
            className={classes.value}
            type="text"
            onChange={(event) => setPocketName(event.target.value)}
          />
        </Box>
        <Box className={classes.box} mt={2}>
          <Typography variant="body2" className={classes.item}>
            カテゴリー
          </Typography>
          <Select
            className={classes.value}
            label="カテゴリー"
            onChange={(event) => setPocketCategory(event.target.value)}
            defaultValue={pocketCategory}
          >
            <MenuItem value={"現金管理"}>現金管理</MenuItem>
            <MenuItem value={"電子マネー・プリペイド"}>
              電子マネー・プリペイド
            </MenuItem>
            <MenuItem value={"銀行"}>銀行</MenuItem>
            <MenuItem value={"証券"}>証券</MenuItem>
            <MenuItem value={"カード"}>カード</MenuItem>
          </Select>
        </Box>
        <Box className={classes.box} mt={2}>
          <Typography variant="body2" className={classes.item}>
            残高（円）
          </Typography>
          <TextField
            className={classes.value}
            type="number"
            onChange={(event) => setPocketAmount(event.target.value)}
            defaultValue={pocketAmount}
          />
        </Box>
        <Container className={classes.container}>
          <Button
            type="submit"
            variant="contained"
            disabled={
              (pocketName === "") |
              (pocketAmount === 0) |
              (pocketCategory === "")
                ? true
                : false
            }
            color="success"
            onClick={(e) => addPocket(e)}
          >
            追加する
          </Button>
        </Container>
      </form>
    </Modal>
  )
}

export default AddPocketModal
