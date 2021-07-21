import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { LabeledRow, StatusChip, Text, Wrapper } from '../UI'
import { Map } from '../Shared'
import useStyles from './styles'

const Details = () => {
  const classes = useStyles()
  const { company } = useSelector((state) => state.companies)
  return (
    <Box>
      <Wrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography className={classes.heading}>Información</Typography>
              <Box>
                <LabeledRow label="Razón social">
                  <Text>{company?.business_name}</Text>
                </LabeledRow>
                <LabeledRow label="Rut">
                  <Text>{company?.rut}</Text>
                </LabeledRow>
                {company && company.name && (
                  <LabeledRow label="Nombre">
                    <Text>{company?.name}</Text>
                  </LabeledRow>
                )}
                <LabeledRow label="Correo">
                  <Text>{company?.email}</Text>
                </LabeledRow>
                <LabeledRow label="Estado">
                  <StatusChip
                    label={
                      company?.state === 'CREATED' ? 'Activo' : 'Eliminado'
                    }
                    error={company?.state !== 'CREATED'}
                    success={company?.state === 'CREATED'}
                  />
                </LabeledRow>
                <LabeledRow label="Tipo">
                  <Text>{company?.type}</Text>
                </LabeledRow>
                <LabeledRow label="Empresa asociada">
                  <Text>{company?.is_partner}</Text>
                </LabeledRow>
                <LabeledRow label="Servicio social">
                  <Text>{company?.social_service}</Text>
                </LabeledRow>
                <LabeledRow label="Beneficio Pyme">
                  <Text>{company?.benfit_pyme}</Text>
                </LabeledRow>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Box>
                <Typography className={classes.heading}>Dirección</Typography>
                <Box>
                  <LabeledRow label="Dirección">{company?.address}</LabeledRow>
                  <LabeledRow label="Región">
                    {company?.region?.name}
                  </LabeledRow>
                  <LabeledRow label="Comuna">
                    {company?.commune?.name}
                  </LabeledRow>
                </Box>
              </Box>
            </Box>
            {company && company.latitude && company.longitude && (
              <Box marginTop="15px">
                <Map
                  disabled
                  latitude={parseFloat(company?.latitude)}
                  longitude={parseFloat(company?.longitude)}
                  markers={[
                    {
                      latitude: parseFloat(company?.latitude),
                      longitude: parseFloat(company?.longitude)
                    }
                  ]}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Wrapper>
    </Box>
  )
}

export default Details
