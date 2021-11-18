import PropTypes from 'prop-types'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '5px 0px',
    alignItems: 'center'
  },
  label: ({ width }) => ({
    fontSize: 15,
    paddingRight: 5,
    opacity: 0.8,
    [theme.breakpoints.up('md')]: {
      minWidth: width || 150,
      paddingRight: 0
    }
  }),
  text: ({ width }) => ({
    fontSize: 16,
    textTransform: 'uppercase',
    [theme.breakpoints.up('md')]: {
      width: `calc( 100% - ${width || 150}px)`
    }
  })
}))

const LabeledRow = ({ label, children, width }) => {
  const classes = useStyles({ width })
  return (
    <Box className={classes.root}>
      <Box className={classes.label}>{label}</Box>
      <Box className={classes.text}>{children}</Box>
    </Box>
  )
}

LabeledRow.propTypes = {
  width: PropTypes.number
}

export default LabeledRow
