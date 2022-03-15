import React, { useContext } from "react"
import { Cell, Pie, PieChart, Tooltip } from "recharts"
import { ApiContext } from "../context/ApiContext"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
const RADIAN = Math.PI / 180

const PocketsPieGraph = () => {
  const { pocketsProccessed } = useContext(ApiContext)

  return (
    <PieChart width={600} height={400}>
      <Pie
        data={pocketsProccessed}
        dataKey="amount"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        labelLine={false}
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          percent,
          index,
        }) => {
          const radius = 25 + innerRadius + (outerRadius - innerRadius)
          const x = cx + radius * Math.cos(-midAngle * RADIAN)
          const y = cy + radius * Math.sin(-midAngle * RADIAN)

          return (
            <text
              x={x}
              y={y}
              fill="#565656"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {percent > 0.05 ? pocketsProccessed[index].name : ""}
            </text>
          )
        }}
      >
        {pocketsProccessed.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )
}

export default PocketsPieGraph
