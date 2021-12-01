import { Typography, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    color: '#6A707E',
    textTransform: 'uppercase',
    [theme.breakpoints.up('lg')]: {
      fontSize: 22
    }
  }
}))

const PageHeading = ({ children, className }) => {
  const classes = useStyles()
  return (
    <Typography className={clsx(classes.title, className)}>
      {children}
    </Typography>
  )
}

PageHeading.propTypes = {
  children: PropTypes.string.isRequired
}

export default PageHeading
