import { createTheme } from "@material-ui/core"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#d45d87",
    },
    secondary: {
      main: "#0288d1",
    },
  },
  typography: {
    fontFamily: "M PLUS 1",
    allVariants: {
      color: "#555555",
    },
    subtitle1: {
      fontSize: 18,
    },
  },
})
