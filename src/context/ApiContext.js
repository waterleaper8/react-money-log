import React, { createContext, useState, useEffect } from "react"
import { withCookies } from "react-cookie"
import axios from "axios"

export const ApiContext = createContext()

function formatDate(dt) {
  var y = dt.getFullYear()
  var m = ("00" + (dt.getMonth() + 1)).slice(-2)
  var d = ("00" + dt.getDate()).slice(-2)
  return y + "-" + m + "-" + d
}

const ApiContextProvider = (props) => {
  const token = props.cookies.get("jwt-token")
  const [uid, setUid] = useState("")
  const [bills, setBills] = useState([])
  const [preBills, setPreBills] = useState([])
  const [isCalc, setIsCalc] = useState(true)
  const today = formatDate(new Date())
  const [date, setDate] = useState(today)
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState(0)
  const [pocket, setPocket] = useState("財布")
  const [category, setCategory] = useState("未分類")
  const [subcategory, setSubcategory] = useState("未分類")
  const [memo, setMemo] = useState("")
  const [thum, setThum] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteSnackbarIsOpen, setDeleteSnackbarIsOpen] = useState(false)
  const [selectedBillId, setSelectedBillId] = useState("")

  useEffect(() => {
    const getUid = async () => {
      try {
        const res = await axios.get("http://192.168.11.87:8000/api/user/", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        setUid(res.data[0].id)
      } catch {
        console.log("error")
      }
    }
    const getBills = async () => {
      try {
        const res = await axios.get("http://192.168.11.87:8000/api/bills/", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        setBills(res.data)
      } catch {
        console.log("error")
      }
    }
    getUid()
    getBills()
  }, [token])

  const newBill = async (e) => {
    e.preventDefault()
    const uploadData = new FormData()
    uploadData.append("create_user", uid)
    uploadData.append("isCalc", isCalc)
    uploadData.append("date", date)
    uploadData.append("title", title)
    uploadData.append("amount", amount)
    uploadData.append("pocket", pocket)
    uploadData.append("category", category)
    uploadData.append("subcategory", subcategory)
    uploadData.append("memo", memo)
    try {
      const res = await axios.post(
        "http://192.168.11.87:8000/api/bills/",
        uploadData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      )
      setBills([...bills, res.data])
      setModalIsOpen(false)
      setTitle("")
    } catch {
      console.log("error")
    }
  }

  const deleteBill = async (id) => {
    try {
      await axios.delete(`http://192.168.11.87:8000/api/bills/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      setBills(bills.filter((item) => item.id !== id))
      setSelectedBillId(null)
    } catch {
      console.log("error")
    }
  }

  return (
    <ApiContext.Provider
      value={{
        bills,
        setBills,
        preBills,
        setPreBills,
        isCalc,
        setIsCalc,
        date,
        setDate,
        title,
        setTitle,
        amount,
        setAmount,
        pocket,
        setPocket,
        category,
        setCategory,
        subcategory,
        setSubcategory,
        memo,
        setMemo,
        thum,
        setThum,
        modalIsOpen,
        setModalIsOpen,
        deleteSnackbarIsOpen,
        setDeleteSnackbarIsOpen,
        selectedBillId,
        setSelectedBillId,
        newBill,
        deleteBill,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  )
}

export default withCookies(ApiContextProvider)
