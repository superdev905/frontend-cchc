import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Button, LabeledRow, StatusChip, Text, Wrapper } from '../UI'
import { formatDate } from '../../formatters'
import { Dialog } from '../Shared'
import commonActions from '../../state/actions/common'
import assistanceActions from '../../state/actions/assistance'

const AssistanceDetailsModal = ({ fetching, open, onClose, data }) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { attention } = useSelector((state) => state.assistance)
  const [loading, setLoading] = useState(false)
  const [setAttention] = useState([])

  useEffect(() => {
    if (attention) {
      setLoading(true)
      dispatch(assistanceActions.getPersonalInterventionDetails(data.id)).then(
        (result) => {
          setAttention(result)
          setLoading(false)
        }
      )
    }
  }, [attention])

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getAreas())
      dispatch(commonActions.getTopics())
      dispatch(commonActions.getManagement())
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'lg'}
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Wrapper>
          <Box p={1}>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}
            >
              Detalles de la asistencia
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <LabeledRow label={'Nombre Trabajador: '}>
                  <Text loading={loading}>
                    {`${data?.employee_name} ${data?.employee_lastname}`}
                  </Text>
                </LabeledRow>
                <LabeledRow label={'Metodo de Contacto: '}>
                  <Text loading={loading}>{data?.contact_method}</Text>
                </LabeledRow>
                <LabeledRow label={'Origen Sistema: '}>
                  <Text loading={loading}>{data?.source_system}</Text>
                </LabeledRow>
                <LabeledRow label={'Origen Empresa: '}>
                  <Text loading={loading}>{data?.source_business}</Text>
                </LabeledRow>
                <LabeledRow label="Empresa: ">
                  <Text loaderWidth="80%" loading={fetching}>
                    {data?.business_name}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Obra: ">
                  <Text loaderWidth="80%" loading={fetching}>
                    {data?.construction_name}
                  </Text>
                </LabeledRow>
                <LabeledRow label={'Plan de Intervención: '}>
                  <Text loading={loading}>{data?.task_id}</Text>
                </LabeledRow>
                <LabeledRow label="Estado: ">
                  <Text loaderWidth="80%" loading={fetching}>
                    {data ? <StatusChip success label={data.status} /> : ''}
                  </Text>
                </LabeledRow>
              </Grid>
              <Grid data xs={12} md={6}>
                <LabeledRow label="Fecha: ">
                  <Text loading={fetching} loaderWidth="70%">
                    {data ? formatDate(data.date) : ''}
                  </Text>
                </LabeledRow>
                <LabeledRow label={'Lugar de atención: '}>
                  <Text loading={loading}>{data?.attention_place}</Text>
                </LabeledRow>

                <LabeledRow label={'Área: '}>
                  <Text loading={loading}>{data?.area_name}</Text>
                </LabeledRow>
                <LabeledRow label={'Tema: '}>
                  <Text loading={loading}>{data?.topic_name}</Text>
                </LabeledRow>
                <LabeledRow label={'Gestión: '}>
                  <Text loading={loading}>{data?.management_id}</Text>
                </LabeledRow>

                <LabeledRow label={'Informe Empresa: '}>
                  <Text loading={loading}>{data?.company_report}</Text>
                </LabeledRow>
                <LabeledRow label={'Caso Social: '}>
                  <Text loading={loading}>{data?.is_social_case}</Text>
                </LabeledRow>
                <LabeledRow label={'Caso: '}>
                  <Text loading={loading}>{data?.case_id}</Text>
                </LabeledRow>
              </Grid>
            </Grid>
          </Box>
        </Wrapper>
        <Wrapper>
          <Grid>
            <LabeledRow label={'Observaciones:'}>
              <Text loading={loading}>{data?.observation}</Text>
            </LabeledRow>
          </Grid>
        </Wrapper>
        <Box textAlign="center" marginTop="10px">
          <Button variant="outlined" onClick={onClose}>
            Aceptar
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

export default AssistanceDetailsModal
