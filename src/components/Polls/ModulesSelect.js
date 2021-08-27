import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Grid, Typography, makeStyles } from '@material-ui/core'

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />)

const useStyles = makeStyles((theme) => ({
  Typography: {
    fontSize: '15px',
    color: theme.palette.gray.gray600
  }
}))

export default function ModulesSelect() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    checkBusiness: true,
    checkConstruction: true,
    checkEmployees: true,
    checkVisit: true
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return (
    <Grid>
      <Typography className={classes.Typography}>Módulos</Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkBusiness}
              onChange={handleChange}
              name="checkBusiness"
            />
          }
          label="Empresas"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkConstruction}
              onChange={handleChange}
              name="checkConstruction"
            />
          }
          label="Obras"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkEmployees}
              onChange={handleChange}
              name="checkEmployees"
            />
          }
          label="Trabajadores"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkVisit}
              onChange={handleChange}
              name="checkVisit"
            />
          }
          label="Visitas"
        />
      </FormGroup>
    </Grid>
  )
}
