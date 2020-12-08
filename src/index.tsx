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
    console.log('current url changed to ', path)
    if (window.location.pathname !== path)
      window.history.pushState(null, '', path)
  }
)

window.onpopstate = function historyChange(ev: PopStateEvent) {
  if (ev.type === 'popstate') rootStore.view.setFromURL()
}

function homepageOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') rootStore.view.openHomePage()
}

function setNavigationKeys(page: typeof rootStore.view.page) {
  if (page === 'pokemon') document.addEventListener('keydown', homepageOnEscape)
  else document.removeEventListener('keydown', homepageOnEscape)
}

function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1)
}

function setTitle(page: typeof rootStore.view.page) {
  if (page === 'pokemon')
    document.title = `Pokemon ${capitalize(
      rootStore.pokemons.get(rootStore.view.id!)?.name || ''
    )}`
  else document.title = page
}

reaction(() => rootStore.view.page, setNavigationKeys)
reaction(() => rootStore.view.page, setTitle)
setNavigationKeys(rootStore.view.page)
setTitle(rootStore.view.page)
