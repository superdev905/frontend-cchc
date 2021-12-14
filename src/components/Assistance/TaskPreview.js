import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiCheck as CompletedIcon } from 'react-icons/fi'
import {
  Box,
  Chip,
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
import assistanceActions from '../../state/actions/assistance'
import AssistanceDialog from './Dialog'
import { useToggle } from '../../hooks'

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
  },
  completedChip: {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  completedIcon: {
    color: theme.palette.common.white,
    fontSize: 20
  }
}))

const TaskPreview = ({ open, onClose, anchorEl, event }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { interventionPlanTask: task } = useSelector(
    (state) => state.socialCase
  )
  const { open: openAssistance, toggleOpen: toggleOpenAssistance } = useToggle()

  useEffect(() => {
    if (open) {
      dispatch(socialCasesActions.getInterventionTaskDetails(event.taskId))
    }
  }, [open])

  const createAttention = (values) =>
    dispatch(
      assistanceActions.createAssistance({
        ...values,
        employee_id: task?.socialCase.employeeId,
        employee_name: task?.socialCase.employeeNames.split(' ')[0],
        employee_lastname: task?.socialCase.employeeNames.split(' ')[1],
        employee_rut: task?.socialCase.employeeRut
      })
    )

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
          <Box mb={2}>
            {task?.isCompleted && (
              <Chip
                className={classes.completedChip}
                icon={<CompletedIcon className={classes.completedIcon} />}
                label="Completado"
              />
            )}
          </Box>
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
            disabled={event.isCompleted}
            onClick={toggleOpenAssistance}
          >
            Registrar atención
          </Button>
        </Box>
      </Box>
      {openAssistance && (
        <AssistanceDialog
          sourceSystem={'CASOS SOCIALES'}
          open={openAssistance}
          onClose={toggleOpenAssistance}
          company={{ business_name: task?.socialCase?.businessName }}
          construction={{ name: '' }}
          defaultCaseId={task?.socialCase.id}
          defaultTaskId={task?.id}
          defaultSocialCase={'SI'}
          submitFunction={createAttention}
          successFunction={() => {
            toggleOpenAssistance()
            onClose()
          }}
        />
      )}
    </Menu>
  )
}

export default TaskPreview
