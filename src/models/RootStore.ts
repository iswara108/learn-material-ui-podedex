import * as React from 'react'
import { Instance, types } from 'mobx-state-tree'
import { View } from './View'

export interface IRootStore extends Instance<typeof RootStore> {}

export const RootStore = types.model('Root Store', { view: View })

const RootStoreContext = React.createContext<null | IRootStore>(null)

export const Provider = RootStoreContext.Provider

export function useMst() {
  const store = React.useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
