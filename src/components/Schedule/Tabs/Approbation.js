import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useToggle } from '../../../hooks'
import scheduleActions from '../../../state/actions/schedule'
import { EmptyState } from '../../UI'
import { ApprobationCard, ApproveDialog } from '../Approbation'
import { SendCard, SendDialog } from '../Send'
import useStyles from './styles'

const Approbation = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { scheduleId } = useParams()
  const { scheduleDetails } = useSelector((state) => state.schedule)
  const { open: approveAdd, toggleOpen: toggleApproveAdd } = useToggle()
  const { open: sendOpen, toggleOpen: toggleSendOpen } = useToggle()

  const handleApprove = (values) => {
    if (!scheduleDetails?.approbation) {
      return dispatch(scheduleActions.createApprobation(scheduleId, values))
    }
    return dispatch(
      scheduleActions.updateApprobation(
        scheduleId,
        scheduleDetails.approbation.id,
        values
      )
    )
  }

  const handleSendSchedule = (values) => {
    if (!scheduleDetails?.sendStatus) {
      return dispatch(scheduleActions.createSendStatus(scheduleId, values))
    }
    return dispatch(
      scheduleActions.updateSendStatus(
        scheduleId,
        scheduleDetails.sendStatus.id,
        values
      )
    )
  }

  return (
    <Box>
      <Box>
        <Box mb={1}>
          <Typography className={classes.subHeading}>
            Estado de envio
          </Typography>
        </Box>
        <Box>
          {scheduleDetails && (
            <>
              {scheduleDetails?.sendStatus ? (
                <Box>
                  <SendCard
                    onEdit={toggleSendOpen}
                    data={scheduleDetails.sendStatus}
                  />
                </Box>
              ) : (
                <EmptyState
                  message="Esta programación no fue enviado"
                  event={toggleSendOpen}
                  actionMessage="Enviar"
                />
              )}
            </>
          )}
        </Box>
      </Box>
      <Box mt={2}>
        <Box mb={1}>
          <Typography className={classes.subHeading}>
            Estado de aprobación
          </Typography>
        </Box>
        <Box>
          {scheduleDetails && (
            <>
              {scheduleDetails?.approbation ? (
                <Box>
                  <ApprobationCard
                    onEdit={toggleApproveAdd}
                    data={scheduleDetails.approbation}
                  />
                </Box>
              ) : (
                <EmptyState
                  message="Esta programación no tiene aprobación"
                  event={toggleApproveAdd}
                  actionMessage="Registrar"
                />
              )}
            </>
          )}
        </Box>
        {approveAdd && (
          <ApproveDialog
            successMessage={
              scheduleDetails?.approbation
                ? 'Approbación actualizada'
                : 'Approbación creada'
            }
            data={scheduleDetails?.approbation}
            open={approveAdd}
            onClose={toggleApproveAdd}
            submitFunction={handleApprove}
          />
        )}
        {sendOpen && (
          <SendDialog
            successMessage={
              scheduleDetails?.sendStatus
                ? 'Datos de envío actualizada'
                : 'Datos de envío creada'
            }
            data={scheduleDetails?.sendStatus}
            open={sendOpen}
            onClose={toggleSendOpen}
            submitFunction={handleSendSchedule}
          />
        )}
      </Box>
    </Box>
  )
}

export default Approbation
