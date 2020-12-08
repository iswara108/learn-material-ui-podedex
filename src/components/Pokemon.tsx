import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import * as React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useMst } from '../models/RootStore'

const useStyles = makeStyles({ image: { height: '300px', width: '300px' } })

function Pokemon({ id }: { id: string }) {
  const { pokemons } = useMst()
  const classes = useStyles()
  const pokemon = pokemons.get(id)
  return (
    <>
      <Card>
        <CardMedia
          image={pokemon?.sprites.front_default || ''}
          className={classes.image}
        ></CardMedia>
      </Card>
    </>
  )
}

export default Pokemon
