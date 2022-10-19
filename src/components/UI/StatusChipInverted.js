import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Chip, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    minWidth: '85px',
    fontWeight: 'bold',
    fontSize: 14
  },
  error: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark
  },
  success: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark
  },
  late: {
    backgroundColor: 'Gold',
    color: 'GoldenRod'
  }
}))

const StatusChipInverted = ({ label, success, error, late, icon }) => {
  const classes = useStyles({ success })
  return (
    <Chip
      label={label}
      icon={icon}
      className={clsx(
        classes.root,
        error && classes.error,
        success && classes.success,
        late && classes.late
      )}
    />
  )
}

StatusChipInverted.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
}

export default StatusChipInverted
