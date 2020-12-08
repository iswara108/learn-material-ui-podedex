import { keys } from 'mobx'
import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { useMst } from '../models/RootStore'

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  cardMedia: { margin: 'auto', width: '130px', height: '130px' },
  name: { textTransform: 'capitalize' }
})
function Pokedex() {
  const classes = useStyles()

  const { view, pokemons } = useMst()

  return (
    <>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      <Grid container spacing={2} className={classes.pokedexContainer}>
        {keys(pokemons).map(pokemonKey => {
          if (typeof pokemonKey !== 'string') return <></>

          const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            +pokemonKey + 1
          }.png`

          return (
            <Grid key={pokemonKey} item xs={12} sm={6} md={4} lg={3}>
              <Card onClick={() => view.openPokemonPage(pokemonKey)}>
                <CardMedia className={classes.cardMedia} image={sprite} />
                <CardContent className={classes.name}>
                  <Typography>
                    {`${pokemonKey}. ${pokemons.get(pokemonKey)?.name}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default Pokedex
