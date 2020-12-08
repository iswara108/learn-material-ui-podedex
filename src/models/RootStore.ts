import * as React from 'react'
import { Instance, types } from 'mobx-state-tree'
import { View } from './View'
import mockData from '../mockData'

export interface IRootStore extends Instance<typeof RootStore> {}

const PokemonModel = types.model('pokemon', {
  name: types.string,
  id: types.identifierNumber,
  species: types.model({
    name: types.string,
    url: types.string
  }),
  height: types.number,
  weight: types.number,
  types: types.array(
    types.model({
      slot: types.number,
      type: types.model({
        name: types.string,
        url: types.string
      })
    })
  ),
  sprites: types.model({
    back_default: types.maybeNull(types.string),
    back_female: types.maybeNull(types.string),
    back_shiny: types.maybeNull(types.string),
    back_shiny_female: types.maybeNull(types.string),
    front_default: types.maybeNull(types.string),
    front_female: types.maybeNull(types.string),
    front_shiny: types.maybeNull(types.string),
    front_shiny_female: types.maybeNull(types.string)
  })
})

export interface IPokemonModel extends Instance<typeof PokemonModel> {}

export const RootStore = types.model('Root Store', {
  view: View,
  pokemons: types.optional(types.map(PokemonModel), mockData)
})

const RootStoreContext = React.createContext<null | IRootStore>(null)

export const Provider = RootStoreContext.Provider

export function useMst() {
  const store = React.useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
