import clsx from 'clsx'
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

const StatusChip = ({ label, success, status, className, iconSize }) => {
  const classes = useStyles({ success })

  const icons = {
    CREADO: <CreatedIcon fontSize={iconSize} />,
    APROBADA: <ApprovedIcon fontSize={iconSize} />,
    POR_REVISAR: <FiClock fontSize={iconSize} />,
    RECHAZADA: <FiX fontSize={iconSize} />
  }

  return (
    <Chip
      label={
        <Box display="flex" alignItems="center">
          {icons[status]}
          <Typography className={clsx(classes.label, className)}>
            {label}
          </Typography>
        </Box>
      }
      className={clsx(
        classes.root,
        status === 'CREADO' && classes.created,
        status === 'APROBADA' && classes.approved,
        status === 'RECHAZADA' && classes.rejected,
        status === 'POR_REVISAR' && classes.check
      )}
    />
  )
}

StatusChip.defaultProps = {
  iconSize: 18
}

export default StatusChip
