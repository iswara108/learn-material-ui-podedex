import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px'
  }
})
function Pokedex() {
  const classes = useStyles()

  return (
    <>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      <Grid container spacing={2} className={classes.pokedexContainer}>
        <Grid item xs={4}>
          Item 1
        </Grid>
        <Grid item xs={4}>
          Item 2
        </Grid>
      </Grid>
    </>
  )
}

export default Pokedex
