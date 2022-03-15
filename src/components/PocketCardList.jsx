import { useContext } from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import PocketCard from "./PocketCard"
import { ApiContext } from "../context/ApiContext"
import { Divider } from "@mui/material"

export default function PocketCardList() {
  const { pockets } = useContext(ApiContext)
  return (
    <List>
      <Divider />
      {pockets.map((data, index) => (
        <ListItem key={data.id}>
          <PocketCard
            category={data.category}
            name={data.name}
            amount={data.amount}
          />
        </ListItem>
      ))}
    </List>
  )
}
