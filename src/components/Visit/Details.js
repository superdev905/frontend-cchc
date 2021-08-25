import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import commonActions from '../../state/actions/common'
import assistanceActions from '../../state/actions/assistance'
import usersActions from '../../state/actions/users'
import { LabeledRow, StatusChip, Text, Wrapper, Button } from '../UI'
import { formatDate, formatHours } from '../../formatters'
import { useToggle } from '../../hooks'
import ReportModal from './Report/ReportModal'

const Details = ({ fetching }) => {
  const dispatch = useDispatch()
  const { visit } = useSelector((state) => state.assistance)
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [shiftDetails, setShiftDetails] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const { open: openReport, toggleOpen: toggleOpenReport } = useToggle()

  const createReport = (values) => {
    const data = {
      user: `${user.names} ${user.paternal_surname} ${user.maternal_surname}`,
      user_email: user.email,
      user_phone: '---',
      ...values
    }
    return dispatch(assistanceActions.createVisitReport(visit.id, data))
  }

  useEffect(() => {
    if (visit) {
      setLoading(true)
      dispatch(commonActions.getShiftDetails(visit.shift_id)).then((result) => {
        setShiftDetails(result)
        setLoading(false)
      })
      dispatch(usersActions.getUserDetails(visit.assigned_id)).then(
        (result) => {
          setLoading(false)
          setUserDetails(result)
        }
      )
    }
  }, [visit])
  return (
    <Wrapper>
      <Box p={1} display="flex" justifyContent="flex-end">
        <Button>Iniciar visita</Button>
        <Button>Pausar visita</Button>
        <Button danger>Cancelar</Button>
        <Button
          disabled={Boolean(visit?.report_key)}
          onClick={toggleOpenReport}
        >
          Informar
        </Button>
      </Box>
      <Box p={1}>
        <Typography
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Detalles de visita
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Título:">
              <Text loading={fetching}>{visit?.title}</Text>
            </LabeledRow>
            <LabeledRow label="Empresa:">
              <Text loaderWidth="80%" loading={fetching}>
                {visit?.business_name}
              </Text>
            </LabeledRow>
            <LabeledRow label="Obra:">
              <Text loaderWidth="80%" loading={fetching}>
                {visit?.construction_name}
              </Text>
            </LabeledRow>
            <LabeledRow label="Jornada:">
              <Text loading={loading || fetching}>{shiftDetails?.name} </Text>
            </LabeledRow>
            <LabeledRow label="Estado:">
              <Text loaderWidth="80%" loading={fetching}>
                {visit ? <StatusChip success label={visit.status} /> : ''}
              </Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Fecha:">
              <Text loading={fetching} loaderWidth="70%">
                {visit ? formatDate(visit.date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Inicio:">
              <Text loading={fetching}>
                {visit ? formatHours(visit.start_date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Fin:">
              <Text loading={fetching}>
                {visit ? formatHours(visit.end_date) : ''}
              </Text>
            </LabeledRow>{' '}
            <LabeledRow label="Profesional:">
              <Text loading={loading || fetching}>
                {userDetails
                  ? `${userDetails?.names} ${userDetails?.paternal_surname} ${userDetails?.maternal_surname}`
                  : ''}
              </Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>
      {visit && openReport && (
        <ReportModal
          open={openReport}
          onClose={toggleOpenReport}
          submitFunction={createReport}
        />
      )}
    </Wrapper>
  )
}

export default Details
