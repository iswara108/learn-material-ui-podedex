import { reaction } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IRootStore, RootStore, Provider } from './models/RootStore'

const rootStore = ((window as typeof window & {
  rootStore: IRootStore
}).rootStore = RootStore.create())

ReactDOM.render(
  <React.StrictMode>
    <Provider value={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reaction(
  () => rootStore.view.currentURL,
  path => {
    if (window.location.pathname !== path)
      window.history.pushState(null, '', path)
  }
)
