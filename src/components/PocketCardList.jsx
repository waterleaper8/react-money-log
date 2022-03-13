import React, { useContext } from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import PocketCard from "./PocketCard"
import { ApiContext } from "../context/ApiContext"

export default function PocketCardList() {
  const { pockets } = useContext(ApiContext)
  return (
    <>
      <Box sx={{ pt: 1 }}>
        <List>
          {pockets.map((data, index) => (
            <ListItem button key={data.id}>
              <PocketCard
                category={data.category}
                name={data.name}
                amount={data.amount}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {pockets.map((data, index) => (
            <ListItem button key={data.id}>
              <PocketCard
                category={data.category}
                name={data.name}
                amount={data.amount}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  )
}
