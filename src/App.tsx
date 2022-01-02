import "./App.css"

import NavBar from "./components/NavBar"
import ApiContextProvider from "./context/ApiContext"
import Main from "./components/Main"

function App() {
  return (
    <ApiContextProvider>
      <NavBar />
      <Main />
    </ApiContextProvider>
  )
}

export default App
