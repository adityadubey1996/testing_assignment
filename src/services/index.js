async function BitcoinDaily(QueryParams) {
  console.log('BitcoinDaily -> QueryParams', QueryParams)
  const Response = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?${QueryParams}`, {
    method: 'GET',
    headers: {},
  })

  const Res = await Response.json()

  return Res
}

async function TodayPrice(currency) {
  console.log('TodayPrice -> currency', currency)
  let retunData
  const PromiseReturn = new Promise((resolve, reject) => {
    fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`)
      .then((response) => {
        return response.json()
      })
      .then((res) => {
        console.log('TodayPrice -> res', res)
        let currentPrice = res.bpi[currency]
        console.log('TodayPrice -> currentPrice', currentPrice)
        resolve(currentPrice)
      })
      .catch((err) => {
        reject(err)
      })
  })
  return (retunData = await PromiseReturn)
}

export const Services = {
  BitcoinDaily,
  TodayPrice,
}
