import React from "react"
import { withCookies } from "react-cookie"
import axios from "axios"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import CircularProgress from "@material-ui/core/CircularProgress"
import styles from "../styles/common.module.css"
import { endpoint } from "../context/ApiContext"
import { loginReducer } from "./loginReducer"
import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_EDIT,
  TOGGLE_MODE,
} from "./actionTypes"
import { useStyles } from "./LoginStyles"

const initialState = {
  isLoading: false,
  isLoginView: true,
  error: "",
  credentialsLog: {
    email: "",
    password: "",
  },
}
const demoState = {
  isLoading: false,
  isLoginView: true,
  error: "",
  credentialsLog: {
    email: "test@example.com",
    password: "test6487",
  },
}

const Login = (props: any) => {
  const classes = useStyles()
  const [state, dispatch] = React.useReducer(loginReducer, initialState)

  const inputChangedLog = () => (event: any) => {
    const cred = state.credentialsLog
    cred[event.target.name] = event.target.value
    dispatch({
      type: INPUT_EDIT,
      inputName: event.target.name,
      payload: event.target.value,
    })
  }

  const login = async (event: any) => {
    event.preventDefault()
    if (state.isLoginView) {
      try {
        dispatch({ type: START_FETCH })
        const res = await axios
          .post(
            `${endpoint}/authen/jwt/create/`,
            // `http://192.168.11.87:8000/authen/jwt/create/`,
            state.credentialsLog,
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            props.cookies.set("jwt-token", res.data.access)
            res.data.access
              ? (window.location.href = "/app")
              : (window.location.href = "/")
            dispatch({ type: FETCH_SUCCESS })
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
        console.log(res)
      } catch {
        dispatch({ type: ERROR_CATCHED })
      }
    } else {
      try {
        dispatch({ type: START_FETCH })
        await axios.post(
          `${endpoint}/api/create/`,
          // `http://192.168.11.87:8000/api/create/`,
          state.credentialsLog,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        // 登録に成功したら、そのままログインする
        const res = await axios.post(
          `${endpoint}/authen/jwt/create/`,
          // `http://192.168.11.87:8000/authen/jwt/create/`,
          state.credentialsLog,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        props.cookies.set("jwt-token", res.data.access)
        res.data.access
          ? (window.location.href = "/app")
          : (window.location.href = "/")
        dispatch({ type: FETCH_SUCCESS })
      } catch {
        dispatch({ type: ERROR_CATCHED })
      }
    }
  }

  const demoLogin = async (event: any) => {
    event.preventDefault()
    try {
      dispatch({ type: START_FETCH })
      const res = await axios
        .post(
          `${endpoint}/authen/jwt/create/`,
          // `http://192.168.11.87:8000/authen/jwt/create/`,
          demoState.credentialsLog,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          props.cookies.set("jwt-token", res.data.access)
          res.data.access
            ? (window.location.href = "/app")
            : (window.location.href = "/")
          dispatch({ type: FETCH_SUCCESS })
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      console.log(res)
    } catch {
      dispatch({ type: ERROR_CATCHED })
    }
  }

  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE })
  }

  return (
    <Container maxWidth="xs">
      <form onSubmit={login}>
        <div className={classes.paper}>
          {state.isLoading && <CircularProgress />}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h3" className={styles.title}>
            MoneyLog
          </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="メールアドレス"
            name="email"
            value={state.credentialsLog.email}
            onChange={inputChangedLog()}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            value={state.credentialsLog.password}
            onChange={inputChangedLog()}
            label="パスワード"
            type="password"
          />
          <span className={classes.spanError}>{state.error}</span>
          <Button
            name="demo"
            onClick={demoLogin}
            className={classes.submit}
            fullWidth
            variant="contained"
            color="secondary"
          >
            デモページへ
          </Button>
          <Button
            className={classes.submit}
            type="submit"
            disabled={
              !state.credentialsLog.password || !state.credentialsLog.email
            }
            fullWidth
            variant="contained"
            color="primary"
          >
            {state.isLoginView ? "ログイン" : "新規登録"}
          </Button>
          <span onClick={() => toggleView()} className={classes.span}>
            {state.isLoginView ? "新規登録する" : "ログイン画面へ"}
          </span>
        </div>
      </form>
    </Container>
  )
}

export default withCookies(Login)
