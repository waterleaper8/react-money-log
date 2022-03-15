import { Button, Container } from "@mui/material"
import { useContext, useEffect } from "react"
import { ApiContext } from "../context/ApiContext"

const AddPocketBtn = () => {
  const { pocketModalIsOpen, setPocketModalIsOpen } = useContext(ApiContext)

  useEffect(() => {
    pocketModalIsOpen
      ? (document.body.style.overflowX = "hidden")
      : (document.body.style.overflowX = "auto")
    return
  }, [pocketModalIsOpen])

  return (
    <Container sx={{ textAlign: "center", marginTop: "12px" }}>
      <Button onClick={() => setPocketModalIsOpen(true)} variant="contained">
        口座を追加
      </Button>
    </Container>
  )
}

export default AddPocketBtn
