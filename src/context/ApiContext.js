import React, { createContext, useState, useEffect } from "react"
import { withCookies } from "react-cookie"
import axios from "axios"

const _ = require("lodash")

export const endpoint = "http://localhost:8000"
// export const endpoint = "http://192.168.11.87:8000"

export const today = formatDate(new Date())
export const ApiContext = createContext()

function formatDate(dt) {
  var y = dt.getFullYear()
  var m = ("00" + (dt.getMonth() + 1)).slice(-2)
  var d = ("00" + dt.getDate()).slice(-2)
  return [y, m, d]
}

function groupBy(data, group) {
  const after = _(data)
    .groupBy(group)
    .map((value, key) => {
      return {
        pocket: key,
        sum: _.sumBy(value, "amount"),
      }
    })
    .value()
  return after
}

export function filterBills(data, year, month) {
  const startDate = new Date(`${year}-${month}-01`)
  const endDate = new Date(`${year}-${month}-31`)
  const dataList = data.filter((item) => {
    const hitDate = new Date(`${item.date}T00:00:00Z`)
    return hitDate >= startDate && hitDate <= endDate
  })
  return dataList
}

const ApiContextProvider = (props) => {
  const token = props.cookies.get("jwt-token")
  const [uid, setUid] = useState("")
  const [bills, setBills] = useState([])
  const [selectedBills, setSelectedBills] = useState([])
  const [sums, setSums] = useState([])
  const [pockets, setPockets] = useState([])
  const [bill, setBill] = useState({})
  const [isCalc, setIsCalc] = useState(true)
  const [date, setDate] = useState(today[0] + "-" + today[1] + "-" + today[2])
  const [selectedDate, setSelectedDate] = useState(today)
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState(0)
  const [pocket, setPocket] = useState("財布")
  const [category, setCategory] = useState("未分類")
  const [subcategory, setSubcategory] = useState("未分類")
  const [memo, setMemo] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteSnackbarIsOpen, setDeleteSnackbarIsOpen] = useState(false)
  const [selectedBillId, setSelectedBillId] = useState("")
  const [pocketName, setPocketName] = useState("")
  const [pocketCategory, setPocketCategory] = useState("現金管理")
  const [pocketAmount, setPocketAmount] = useState(0)
  const [pocketModalIsOpen, setPocketModalIsOpen] = useState(false)
  const [pocketsProccessed, setPocketsProccessed] = useState([])

  useEffect(() => {
    getUid()
    getBills()
    getPockets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    console.log(bills)
    setSums(groupBy(bills, "pocket"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bills])

  useEffect(() => {
    const data = pockets.map((pocket) => {
      return {
        name: pocket.name,
        amount: pocket.amount,
      }
    })
    setPocketsProccessed(data)
    console.log(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pockets, filterBills])

  const getUid = async () => {
    try {
      const res = await axios.get(`${endpoint}/api/user/`, {
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
      const res = await axios.get(`${endpoint}/api/bills/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      setBills(res.data)
      setSelectedBills(filterBills(res.data, today[0], today[1]))
      setSums(groupBy(res.data, "pocket"))
    } catch {
      console.log("error")
    }
  }
  const getPockets = async () => {
    try {
      const res = await axios.get(`${endpoint}/api/pockets/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      setPockets(res.data)
    } catch {
      console.log("error")
    }
  }

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
      const res = await axios.post(`${endpoint}/api/bills/`, uploadData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      const newBills = [res.data, ...bills]
      setBills(newBills)
      setSelectedBills(filterBills(newBills, selectedDate[0], selectedDate[1]))
      setModalIsOpen(false)
      setTitle("")
    } catch {
      console.log("error")
    }
  }

  const revertBill = async () => {
    try {
      await axios.post(`${endpoint}/api/bills/`, bill, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
    } catch {
      console.log("error")
    }
    try {
      const res = await axios.get(`${endpoint}/api/bills/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      setBills(res.data)
    } catch {
      console.log("error")
    }
  }

  const deleteBill = async (id) => {
    try {
      const res = await axios.get(`${endpoint}/api/bills/${id}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      setBill(res.data)
    } catch {
      console.log("error")
    }
    try {
      await axios.delete(`${endpoint}/api/bills/${id}/`, {
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

  const addPocket = async (e) => {
    e.preventDefault()
    const uploadData = new FormData()
    uploadData.append("create_user", uid)
    uploadData.append("category", pocketCategory)
    uploadData.append("name", pocketName)
    uploadData.append("amount", pocketAmount)
    try {
      const res = await axios.post(`${endpoint}/api/pockets/`, uploadData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
      const newPockets = [res.data, ...pockets]
      setPocket(newPockets)
      setPocketModalIsOpen(false)
    } catch {
      console.log("error")
    }
  }

  return (
    <ApiContext.Provider
      value={{
        // 新しい記録のstate群
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
        // pocket追加のstate群
        pocketCategory,
        setPocketCategory,
        pocketName,
        setPocketName,
        pocketAmount,
        setPocketAmount,
        // 処理のためのstate群
        bills,
        setBills,
        selectedBills,
        setSelectedBills,
        selectedDate,
        setSelectedDate,
        sums,
        setSums,
        pockets,
        setPockets,
        modalIsOpen,
        setModalIsOpen,
        pocketModalIsOpen,
        setPocketModalIsOpen,
        deleteSnackbarIsOpen,
        setDeleteSnackbarIsOpen,
        selectedBillId,
        setSelectedBillId,
        newBill,
        revertBill,
        deleteBill,
        addPocket,
        pocketsProccessed,
        setPocketsProccessed,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  )
}

export default withCookies(ApiContextProvider)
