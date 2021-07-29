import PropTypes from 'prop-types'
import { Box, Grid, InputLabel, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: '14px',
    color: theme.palette.common.black,
    opacity: 0.8,
    marginBottom: '10px'
  }
}))

const Container = ({ children, label, required }) => {
  const classes = useStyles()
  return (
    <Box>
      <InputLabel className={classes.label} required={required}>
        {label}
      </InputLabel>
      <Grid container spacing={1}>
        {children}
      </Grid>
    </Box>
  )
}
Container.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default Container
