import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
  FiCheckCircle as ApprovedIcon,
  FiSave as CreatedIcon,
  FiClock,
  FiX
} from 'react-icons/fi'
import { Box, Chip, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    minWidth: '85px',
    color: theme.palette.common.white
  },
  label: {
    marginLeft: 2,
    fontSize: 15
  },
  created: {
    backgroundColor: theme.palette.purple.main
  },
  approved: {
    backgroundColor: theme.palette.success.main
  },
  check: {
    backgroundColor: theme.palette.primary.main
  },
  rejected: {
    backgroundColor: theme.palette.error.main
  }
}))

const StatusChip = ({ label, success, status }) => {
  const classes = useStyles({ success })

  const icons = {
    CREADA: <CreatedIcon fontSize={18} />,
    APROBADA: <ApprovedIcon fontSize={18} />,
    POR_REVISAR: <FiClock fontSize={18} />,
    RECHAZADA: <FiX fontSize={18} />
  }

  return (
    <Chip
      label={
        <Box display="flex" alignItems="center">
          {icons[status]}
          <Typography className={classes.label}>{label}</Typography>
        </Box>
      }
      className={clsx(
        classes.root,
        status === 'CREADA' && classes.created,
        status === 'APROBADA' && classes.approved,
        status === 'RECHAZADA' && classes.rejected,
        status === 'POR_REVISAR' && classes.check
      )}
    />
  )
}

StatusChip.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool
}

export default StatusChip
