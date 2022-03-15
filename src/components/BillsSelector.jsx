import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useContext } from "react"
import { ApiContext, filterBills, today } from "../context/ApiContext"

const BillsSelector = () => {
  const { bills, setSelectedBills, selectedDate, setSelectedDate } =
    useContext(ApiContext)

  const prevMonthHandler = () => {
    let year = selectedDate[0]
    let month = ("00" + (Number(selectedDate[1]) - 1)).slice(-2)
    if (month === "00") {
      year -= 1
      month = "12"
    }
    const newDate = [year, month, selectedDate[2]]
    console.log(newDate)
    setSelectedDate(newDate)
    const filteredBills = filterBills(bills, newDate[0], newDate[1])
    setSelectedBills(filteredBills)
  }

  const thisMonthHandler = () => {
    const newDate = [today[0], today[1], today[2]]
    console.log(newDate)
    setSelectedDate(newDate)
    const filteredBills = filterBills(bills, newDate[0], newDate[1])
    setSelectedBills(filteredBills)
  }

  const nextMonthHandler = () => {
    let year = selectedDate[0]
    let month = ("00" + (Number(selectedDate[1]) + 1)).slice(-2)
    if (month === "13") {
      year += 1
      month = "01"
    }
    const newDate = [year, month, selectedDate[2]]
    console.log(newDate)
    setSelectedDate(newDate)
    const filteredBills = filterBills(bills, newDate[0], newDate[1])
    setSelectedBills(filteredBills)
  }

  return (
    <Box sx={{ display: "flex", gap: "15px" }} mb={3}>
      <Box sx={{ flexGrow: "2" }}></Box>
      <Button
        className="primaryBtn"
        variant="outlined"
        onClick={prevMonthHandler}
      >
        前月へ
      </Button>
      <Typography variant={"h4"}>
        {selectedDate[0]}-{selectedDate[1]}
      </Typography>
      <Button
        className="primaryBtn"
        variant="outlined"
        onClick={nextMonthHandler}
      >
        次月へ
      </Button>
      <Button
        className="primaryBtn"
        variant="outlined"
        onClick={thisMonthHandler}
      >
        今月
      </Button>
    </Box>
  )
}

export default BillsSelector
