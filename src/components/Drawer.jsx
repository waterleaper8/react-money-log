import React, { useContext } from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import PocketCard from "./PocketCard"
import { ApiContext } from "../context/ApiContext"

const drawerWidth = 240

export default function ClippedDrawer() {
  const { pockets } = useContext(ApiContext)
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
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
        </Box>
      </Drawer>
    </>
  )
}
