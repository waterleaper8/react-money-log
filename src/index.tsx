import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import Login from "./components/Login"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CookiesProvider } from "react-cookie"
import { createTheme, MuiThemeProvider } from "@material-ui/core"
import { indigo } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: "#d45d87",
    },
  },
  typography: {
    fontFamily: "M PLUS 1",
    allVariants: {
      color: "#555555",
    },
  },
})

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <CookiesProvider>
        <MuiThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="app" element={<App />} />
          </Routes>
        </MuiThemeProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
