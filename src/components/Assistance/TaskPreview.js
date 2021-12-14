import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Divider,
  IconButton,
  makeStyles,
  Menu,
  Typography
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { formatDate } from '../../formatters'
import { Button, LabeledRow } from '../UI'
import socialCasesActions from '../../state/actions/socialCase'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '500px'
    }
  },
  title: {
    fontSize: 20,
    marginBottom: 5
  },
  info: {
    color: theme.palette.gray.gray600
  },
  tag: {
    color: theme.palette.primary.main,
    fontSize: 13,
    fontWeight: 'bold',
    opacity: 0.7
  }
}))

const TaskPreview = ({ open, onClose, anchorEl, event, onCancel }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { interventionPlanTask: task } = useSelector(
    (state) => state.socialCase
  )

  useEffect(() => {
    if (open) {
      dispatch(socialCasesActions.getInterventionTaskDetails(event.taskId))
    }
  }, [open])

  return (
    <Menu
      classes={{ paper: classes.root }}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
    >
      <Box p={1}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box p={2}>
          <Typography className={classes.tag}>
            TAREA DE PLAN DE INTERVENCIÓN
          </Typography>
          <Typography className={classes.title}>{event.title}</Typography>
          <Box className={classes.info}>
            <Typography>{`${formatDate(event.nextDate)}`}</Typography>
          </Box>
          <Box className={classes.info}>
            <Typography>{`Caso N° ${task?.socialCaseId}`}</Typography>
          </Box>
          <Box>
            <LabeledRow label="Rut de trabajador">
              {task?.socialCase?.employeeRut}
            </LabeledRow>
            <LabeledRow label="Trabajador">
              {task?.socialCase?.employeeNames}
            </LabeledRow>
            <LabeledRow label="Responsable">
              {`${task?.professional?.names} ${task?.professional?.paternalSurname}`}
            </LabeledRow>
          </Box>
        </Box>
        <Divider />

        <Box display="flex" justifyContent="flex-end">
          <Button
            size="small"
            disabled={event.status === 'CANCELADA'}
            onClick={onCancel}
          >
            Cambiar fecha
          </Button>
          <Button
            size="small"
            disabled={event.status === 'CANCELADA'}
            onClick={onCancel}
          >
            Registrar atención
          </Button>
        </Box>
      </Box>
    </Menu>
  )
}

export default TaskPreview
