import { Box } from "@mui/system"
import AddPocketBtn from "./AddPocketBtn"
import PocketCardList from "./PocketCardList"

const Aside = () => {
  return (
    <Box sx={{ pt: 1 }}>
      <AddPocketBtn />
      <PocketCardList />
    </Box>
  )
}

export default Aside
