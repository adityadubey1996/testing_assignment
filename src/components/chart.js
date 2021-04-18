import React from 'react'
import { LineChart, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import moment from 'moment'
const ChartJS = (props) => {
  console.log('ChartJS -> props', props)

  const [data, setdata] = React.useState([])
  //   for (const [key, value] of Object.entries(props.value)) {
  //     let Date1 = moment(key).format('Do MMM')
  //     data.push({ name: Date1, value: value })
  //   }
  function ValueUpdate(values) {
    let DATA = []
    for (const [key, value] of Object.entries(values)) {
      let Date1 = moment(key).format('Do MMM')
      DATA.push({ name: Date1, value: value })
    }
    setdata(DATA)
  }
  React.useEffect(() => {
    ValueUpdate(props.value)
  }, [props.value])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#129a74" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tickCount={2} minTickGap={100} />
        <YAxis dataKey="value" type="number" axisLine={false} tickLine={false} />
        <Tooltip />
        <CartesianGrid vertical={false} stroke="#DDD" />

        <Area dataKey="value" stroke="#129a74" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default ChartJS
