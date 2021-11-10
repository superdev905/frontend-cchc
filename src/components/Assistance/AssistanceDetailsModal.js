import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { Button, LabeledRow, StatusChip, Text, Wrapper } from '../UI'
import { formatDate } from '../../formatters'
import { Dialog } from '../Shared'
import assistanceActions from '../../state/actions/assistance'
import commonActions from '../../state/actions/common'

const AssistanceDetailsModal = ({ fetching, open, onClose }) => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const { isMobile } = useSelector((state) => state.ui)
  const [loading, setLoading] = useState(false)
  const [attention, setAttention] = useState([])

  const fetchList = () => {
    setLoading(true)
    dispatch(
      assistanceActions.getAttention({
        id_employee: idEmployee
      })
    ).then((data) => {
      setLoading(false)
      setAttention(
        data.map((item) => ({
          ...item,
          stringDate: formatDate(item.date, {})
        }))
      )
    })
  }

  useEffect(() => {
    fetchList()
  }, [])

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getAreas())
      dispatch(commonActions.getTopics())
      dispatch(commonActions.getManagement())
    }
  }, [open])

  console.log(attention)
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
            {attention.map((item) => (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <LabeledRow label={'Nombre Trabajador: '}>
                    <Text loading={loading}>
                      {`${item?.employee_name} ${item?.employee_lastname}`}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label={'Metodo de Contacto: '}>
                    <Text loading={loading}>{item?.contact_method}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Origen Sistema: '}>
                    <Text loading={loading}>{item?.source_system}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Origen Empresa: '}>
                    <Text loading={loading}>{item?.source_business}</Text>
                  </LabeledRow>
                  <LabeledRow label="Empresa: ">
                    <Text loaderWidth="80%" loading={fetching}>
                      {item?.business_name}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label="Obra: ">
                    <Text loaderWidth="80%" loading={fetching}>
                      {item?.construction_name}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label={'Plan de Intervención: '}>
                    <Text loading={loading}>{item?.task_id}</Text>
                  </LabeledRow>
                  <LabeledRow label="Estado: ">
                    <Text loaderWidth="80%" loading={fetching}>
                      {item ? <StatusChip success label={item.status} /> : ''}
                    </Text>
                  </LabeledRow>
                </Grid>
                <Grid item xs={12} md={6}>
                  <LabeledRow label="Fecha: ">
                    <Text loading={fetching} loaderWidth="70%">
                      {item ? formatDate(item.date) : ''}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label={'Lugar de atención: '}>
                    <Text loading={loading}>{item?.attention_place}</Text>
                  </LabeledRow>

                  <LabeledRow label={'Área: '}>
                    <Text loading={loading}>{item?.area_name}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Tema: '}>
                    <Text loading={loading}>{item?.topic_name}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Gestión: '}>
                    <Text loading={loading}>{item?.management_id}</Text>
                  </LabeledRow>

                  <LabeledRow label={'Informe Empresa: '}>
                    <Text loading={loading}>{item?.company_report}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Caso Social: '}>
                    <Text loading={loading}>{item?.is_social_case}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Caso: '}>
                    <Text loading={loading}>{item?.case_id}</Text>
                  </LabeledRow>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Wrapper>
        <Wrapper>
          {attention.map((item) => (
            <Grid>
              <LabeledRow label={'Observaciones:'}>
                <Text loading={loading}>{item?.observation}</Text>
              </LabeledRow>
            </Grid>
          ))}
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
