import { observer } from 'mobx-react-lite'
import React from 'react'
import Pokedex from './components/Pokedex'
import Pokemon from './components/Pokemon'
import { useMst } from './models/RootStore'

function App() {
  const { view } = useMst()

  if (view.page === '/') return <Pokedex />
  else if (view.page === 'pokemon') return <Pokemon id={view.id || ''} />

  return <></>
}

export default observer(App)
