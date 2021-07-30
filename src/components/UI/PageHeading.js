import { Typography, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    color: '#6A707E',
    [theme.breakpoints.up('lg')]: {
      fontSize: 22
    }
  }
}))

const PageHeading = ({ children }) => {
  const classes = useStyles()
  return <Typography className={classes.title}>{children}</Typography>
}

PageHeading.propTypes = {
  children: PropTypes.string.isRequired
}

export default PageHeading
