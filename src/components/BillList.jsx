import React, { useContext, useState } from "react"
import { ApiContext } from "../context/ApiContext"
import {
  Alert,
  Button,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { Paper, Snackbar, TableCell } from "@material-ui/core"
import DeleteIcon from "@mui/icons-material/Delete"

const BillList = () => {
  const {
    revertBill,
    bills,
    selectedBills,
    selectedBillId,
    setSelectedBillId,
    deleteBill,
    setBills,
  } = useContext(ApiContext)

  const [open, setOpen] = useState(false)

  // 削除ボタンが押されたときの処理
  const deleteHandler = (e) => {
    setOpen(true)
    setBills(bills.filter((item) => item.id !== e.target.id))
    setSelectedBillId(e.target.id)
    deleteBill(e.target.id)
  }
  // 通知が閉じたときの処理
  const handleClose = (event, reason) => {
    setOpen(false)
  }

  // もとに戻すを押したときの処理
  const handleRevert = (event) => {
    setOpen(false)
    revertBill(selectedBillId)
  }

  const action = (
    <React.Fragment>
      <Button size="small" onClick={handleRevert}>
        もとに戻す
      </Button>
    </React.Fragment>
  )

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "960px", minWidth: "720px", margin: "0 auto" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">日付</TableCell>
              <TableCell align="center">内容</TableCell>
              <TableCell align="center">金額（円）</TableCell>
              <TableCell align="center">出入元</TableCell>
              <TableCell align="center">大項目</TableCell>
              <TableCell align="center">小項目</TableCell>
              <TableCell align="center">メモ</TableCell>
              <TableCell align="center">削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedBills.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.pocket}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">{row.subcategory}</TableCell>
                <TableCell align="center">{row.memo}</TableCell>
                <TableCell align="center">
                  <IconButton
                    className="delete"
                    id={row.id}
                    onClick={deleteHandler}
                  >
                    <DeleteIcon
                      sx={{
                        color: "#777777",
                        pointerEvents: "none",
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="記録を削除しました"
      >
        <Alert action={action} severity="success" sx={{ width: "100%" }}>
          記録を削除しました
        </Alert>
      </Snackbar>
    </>
  )
}

export default BillList
