import { observer } from 'mobx-react-lite'
import React from 'react'
import Pokedex from './components/Pokedex'
import Pokemon from './components/Pokemon'
import { useMst } from './models/RootStore'

function App() {
  const { view } = useMst()
  return (
    <>
      <div className="App">Hello, you are seeing page: {view.page}</div>
      {view.page === '/' && <Pokedex />}
      {view.page === 'pokemon' && <Pokemon id={view.id || ''} />}
    </>
  )
}

export default observer(App)
