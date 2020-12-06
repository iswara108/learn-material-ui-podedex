import { Instance, types } from 'mobx-state-tree'
import { match, compile } from 'path-to-regexp'

export interface IView extends Instance<typeof View> {}

type IPageWithId = { id: string }
const viewModel = types
  .model('View', {
    page: types.union(types.literal('pokemon'), types.literal('/')),
    id: types.maybe(types.string)
  })
  .views(self => ({
    get currentURL() {
      switch (self.page) {
        case '/':
          return '/'
        case 'pokemon':
          const toPath = compile<IPageWithId>('/pokemon/:id')
          return toPath({ id: self.id || '' })
        default:
          return self.page
      }
    }
  }))
  .actions(self => ({
    openHomePage() {
      self.page = '/'
      self.id = undefined
    },
    openPokemonPage(id: string) {
      self.page = 'pokemon'
      self.id = id
    }
  }))

export const View = types.optional(
  viewModel,
  getViewFromURL() as Instance<typeof viewModel>
)

function getViewFromURL() {
  const matchPokemon = match<IPageWithId>('/pokemon/:id')
  const matchedPokemon = matchPokemon(window.location.pathname)

  if (matchedPokemon) return { page: 'pokemon', id: matchedPokemon.params.id }
  return { page: '/' }
}
