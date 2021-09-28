import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useToggle } from '../../hooks'
import { LabeledRow, StatusChip, Text, Wrapper } from '../UI'
import { formatDate } from '../../formatters'
import CustomButton from '../UI/CustomButton'
import commonActions from '../../state/actions/common'
import usersActions from '../../state/actions/users'
import FileVisor from '../Shared/FileVisor'

const AttentionView = ({ fetching }) => {
  const dispatch = useDispatch()
  const { attention } = useSelector((state) => state.assistance)
  const [loading, setLoading] = useState(false)
  const [setAttentionDetails] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [current] = useState(null)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  useEffect(() => {
    if (attention) {
      setLoading(true)
      dispatch(commonActions.getInterventionDetails(attention.id)).then(
        (result) => {
          setAttentionDetails(result)
          setLoading(false)
        }
      )
      dispatch(usersActions.getUserDetails(attention.assigned_id)).then(
        (result) => {
          setLoading(false)
          setUserDetails(result)
        }
      )
    }
  }, [attention])
  return (
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
            Detalles
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LabeledRow label={'Nombre Trabajador'}>
                <Text loading={loading}>{attention?.name}</Text>
              </LabeledRow>
              <LabeledRow label={'Metodo de Contacto:'}>
                <Text loading={loading}>{attention?.contact_method}</Text>
              </LabeledRow>
              <LabeledRow label={'Origen Sistema:'}>
                <Text loading={loading}>{attention?.source_system}</Text>
              </LabeledRow>
              <LabeledRow label={'Origen Empresa:'}>
                <Text loading={loading}>{attention?.source_business}</Text>
              </LabeledRow>
              <LabeledRow label="Empresa:">
                <Text loaderWidth="80%" loading={fetching}>
                  {attention?.business_name}
                </Text>
              </LabeledRow>
              <LabeledRow label="Obra:">
                <Text loaderWidth="80%" loading={fetching}>
                  {attention?.construction_name}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Plan de Intervención:'}>
                <Text loading={loading}>{attention?.task_id}</Text>
              </LabeledRow>
              <LabeledRow label="Estado:">
                <Text loaderWidth="80%" loading={fetching}>
                  {attention ? (
                    <StatusChip success label={attention.status} />
                  ) : (
                    ''
                  )}
                </Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={6}>
              <LabeledRow label="Fecha:">
                <Text loading={fetching} loaderWidth="70%">
                  {attention ? formatDate(attention.date) : ''}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Lugar de atención:'}>
                <Text loading={loading}>{attention?.attention_place}</Text>
              </LabeledRow>

              <LabeledRow label={'Área: '}>
                <Text loading={loading}>{attention?.area_id}</Text>
              </LabeledRow>
              <LabeledRow label={'Tema: '}>
                <Text loading={loading}>{attention?.topic_id}</Text>
              </LabeledRow>
              <LabeledRow label={'Gestión: '}>
                <Text loading={loading}>{attention?.management_id}</Text>
              </LabeledRow>

              <LabeledRow label={'Informe Empresa: '}>
                <Text loading={loading}>{attention?.company_report}</Text>
              </LabeledRow>
              <LabeledRow label={'Caso Social: '}>
                <Text loading={loading}>{attention?.is_social_case}</Text>
              </LabeledRow>
              <LabeledRow label={'Caso: '}>
                <Text loading={loading}>{attention?.case_id}</Text>
              </LabeledRow>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
      <Wrapper>
        <Grid>
          <LabeledRow label="Profesional:">
            <Text loading={loading || fetching}>
              {userDetails
                ? `${userDetails?.names} ${userDetails?.paternal_surname} ${userDetails?.maternal_surname}`
                : ''}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Observaciones:'}>
            <Text loading={loading}>{attention?.task_id}</Text>
          </LabeledRow>
        </Grid>
      </Wrapper>
      <Wrapper>
        <Box textAlign="center">
          <CustomButton onClick={toggleOpenVisor}>Ver Archivo </CustomButton>
        </Box>

        {current && openVisor && (
          <FileVisor
            open={openVisor}
            onClose={toggleOpenVisor}
            src={current.attached_url}
          />
        )}
      </Wrapper>
    </Box>
  )
}

export default AttentionView
