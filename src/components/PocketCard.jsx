import React, { useContext } from "react"
import { ApiContext } from "../context/ApiContext"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { Paper } from "@material-ui/core"

export default function PocketCard(props) {
  const { sums } = useContext(ApiContext)
  const s = sums.filter((sum) => sum.pocket === props.name)[0]

  return (
    <Card
      style={{ padding: "0 !important" }}
      sx={{ minWidth: "192px" }}
      variant="outlined"
      component={Paper}
    >
      <CardContent>
        <Typography
          sx={{ borderBottom: 2, borderColor: "#d45d87" }}
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          {props.category}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {props.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {s ? props.amount + s.sum : props.amount}円
        </Typography>
      </CardContent>
    </Card>
  )
}
