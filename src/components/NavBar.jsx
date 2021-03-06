import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { FiLogOut } from "react-icons/fi"
import { withCookies } from "react-cookie"
import { useNavigate } from "react-router"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"

// 適用したいCSSの定義をuseStylesに格納する
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontFamily: "Merienda",
    color: "white",
  },
  appbar: {
    zIndex: 1201,
  },
}))

const NavBar = (props) => {
  let navigate = useNavigate()
  const classes = useStyles()

  const Logout = () => {
    props.cookies.remove("jwt-token")
    navigate("/")
  }

  return (
    <AppBar position="static" className={classes.appbar} color="primary">
      <Toolbar>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <figure className="logo">
            <MonetizationOnIcon />
          </figure>
          <Typography variant="h5" className={classes.title}>
            Money Log
          </Typography>
        </div>

        <button className="logout" onClick={() => Logout()}>
          <span>ログアウト</span>
          <FiLogOut />
        </button>
      </Toolbar>
    </AppBar>
  )
}

export default withCookies(NavBar)
