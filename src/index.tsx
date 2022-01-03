import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import ApiContextProvider from "./context/ApiContext"
import App from "./App"
import Login from "./components/Login"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CookiesProvider } from "react-cookie"
import { createTheme, MuiThemeProvider } from "@material-ui/core"

const theme = createTheme({
  palette: {
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
  <React.StrictMode>
    <ApiContextProvider>
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
    </ApiContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
