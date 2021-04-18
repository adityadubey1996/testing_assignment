function Loader(Loading) {
  let State = 'none'
  if (Loading) {
    State = 'block'
  } else {
    State = 'none'
  }
  return <div style={{ height: '100%', width: '100%', background: 'white', display: State }}></div>
}
