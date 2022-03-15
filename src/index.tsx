import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import ApiContextProvider from "./context/ApiContext"
import App from "./App"
import Login from "./components/Login"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CookiesProvider } from "react-cookie"
import { createTheme, ThemeProvider } from "@material-ui/core"

const theme = createTheme({
  palette: {
    primary: {
      main: "#d45d87",
    },
    secondary: {
      main: "#d45d87",
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

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <ApiContextProvider>
        <BrowserRouter>
          <CookiesProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="app" element={<App />} />
            </Routes>
          </CookiesProvider>
        </BrowserRouter>
      </ApiContextProvider>
    </ThemeProvider>
  </>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
