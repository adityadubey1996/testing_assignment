import React from 'react'
import styled from 'styled-components'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ChartJS from './components/chart'
import moment from 'moment'
import { Services } from './services'
import { device } from './components/device'
const Card = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .card-wrapper {
    height: 50%;
    width: 60%;
    @media ${device.laptopL} {
      width: 90%;
    }
  }
  .card-wrapper > .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .card > .chart-wrapper {
    height: 100%;
    width: 100%;
  }
  .card > .left-content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
  }
  .card > .left-content-wrapper > .left-content {
  }
  .card > .right-content {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card > .right-content > .chart-wrapper {
    height: 60%;
    width: 100%;
  }
`
const Text = styled.h1`
  font-size: 20px;
`

function App() {
  let PresentDate = moment(new Date()).format('YYYY-MM-DD')

  let Previousdate = new Date()
  Previousdate.setDate(Previousdate.getDate() - 60)

  const [values, setvlaues] = React.useState({})
  const [presentPrice, setpresentPrice] = React.useState({})
  const [Curreny, setCurreny] = React.useState('USD')
  const [QueryParams, setQueryParams] = React.useState(`curreny=${Curreny}&start=${moment(Previousdate).format('YYYY-MM-DD')}&end=${PresentDate}`)

  const handleChange = async (select, setCurreny, setQueryParams, setvlaues) => {
    setCurreny(select.target.value)
  }
  React.useEffect(async () => {
    setQueryParams(`curreny=${Curreny}&start=${moment(Previousdate).format('YYYY-MM-DD')}&end=${PresentDate}`)
  }, [Curreny])

  React.useEffect(async () => {
    let BitcoinPrice = await Services.BitcoinDaily(QueryParams)
    let CurrentPrice = await Services.TodayPrice(Curreny)
    setpresentPrice(CurrentPrice)

    setvlaues(BitcoinPrice.bpi)
  }, [QueryParams])

  React.useEffect(async () => {
    let CurrentPrice = await Services.TodayPrice(Curreny)
    let BitcoinPrice = await Services.BitcoinDaily(QueryParams)

    setvlaues(BitcoinPrice.bpi)

    setpresentPrice(CurrentPrice)
  }, [setpresentPrice, setQueryParams])
  return (
    <div className="App">
      <Card>
        <div className="card-wrapper">
          <div className="card">
            <div className="left-content-wrapper">
              <div className="left-content">
                <div className="header-text">1 Bitcoin equals</div>
                <div className="dropdown">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Curreny}
                    onChange={(event) => {
                      handleChange(event, setCurreny, setQueryParams, setvlaues)
                    }}
                  >
                    <MenuItem value={'USD'}>United States Dollar</MenuItem>
                    <MenuItem value={'GBP'}>British Pound Sterling</MenuItem>
                    <MenuItem value={'EUR'}>Euro</MenuItem>
                  </Select>
                </div>
                <Text>{Object.keys(presentPrice).length > 0 ? `${presentPrice.rate} ${presentPrice.description}` : null}</Text>
              </div>
            </div>
            <div className="right-content">
              <div className="chart-wrapper">
                <ChartJS value={values} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App
