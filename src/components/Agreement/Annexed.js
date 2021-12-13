import { Box, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import housingActions from '../../state/actions/housing'
import { ConfirmDelete } from '../Shared'
import { Button, LabeledRow, Text } from '../UI'
import EmployeeList from './EmployeeList'

const Annexed = ({ data }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(null)
  const [validating, setValidating] = useState(false)
  const { open: openValid, toggleOpen: toggleOpenValidate } = useToggle()

  const fetchDetails = () => {
    setLoading(true)
    dispatch(housingActions.getAnnexed(data.id)).then((res) => {
      setDetails(res)
      setLoading(false)
    })
  }

  const validAnnexed = (id) => {
    setValidating(true)
    dispatch(housingActions.validAnnexed(id)).then(() => {
      setValidating(false)
      toggleOpenValidate()
      enqueueSnackbar('Anexo validado', { variant: 'success' })
      fetchDetails()
    })
  }

  useEffect(() => {
    if (data) {
      fetchDetails()
    }
  }, [data])
  return (
    <Box>
      <Typography
        style={{ fontSize: 20, fontWeight: 'bold' }}
      >{`Detalles de Anexo ${details?.id}`}</Typography>
      <Box my={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            <LabeledRow label="Fecha de creación">
              <Text loading={loading}>{formatDate(details?.createDate)}</Text>
            </LabeledRow>
            <LabeledRow label="Creado por">
              <Text
                loading={loading}
              >{`${details?.author?.names} ${details?.author?.paternalSurname}`}</Text>
            </LabeledRow>
            <LabeledRow width="220px" label="Cantidad de trabajadores">
              <Text loading={loading} loaderWidth="30%">
                {details?.totalEmployees}
              </Text>
            </LabeledRow>
            <LabeledRow label="Observaciones">
              <Text loading={loading} loaderWidth="70%">
                {details?.observations}
              </Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box>
              <Alert
                severity={details?.state !== 'DRAFT' ? 'success' : 'warning'}
                icon={false}
                action={
                  details?.state === 'DRAFT' && (
                    <Button onClick={toggleOpenValidate}>Validar</Button>
                  )
                }
              >
                <Typography>
                  <Text loading={loading} loaderWidth="50px">
                    {`Anexo ${
                      details?.state === 'DRAFT' ? 'Sin Validar' : 'Validado'
                    }`}
                  </Text>
                </Typography>
              </Alert>
            </Box>
          </Grid>
        </Grid>
        {openValid && (
          <ConfirmDelete
            event="CONFIRM"
            confirmText="Validar"
            loading={validating}
            message={
              <Box>
                <Typography variant="h6">
                  ¿Estás seguro de marcar como validado este anexo?
                </Typography>
                <Box mt={1}>
                  <Alert severity="warning">
                    Al validar el anexo no se prodrá agregar mas trabajadores
                  </Alert>
                </Box>
              </Box>
            }
            open={openValid}
            onClose={toggleOpenValidate}
            onConfirm={() => validAnnexed(data.id)}
          />
        )}
        <Box></Box>
      </Box>
      <Box>
        {details && (
          <EmployeeList annexedId={details.id} status={details?.state} />
        )}
      </Box>
    </Box>
  )
}
export default Annexed
