import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import companiesActions from '../../state/actions/companies'
import { LabeledRow, StatusChip, Text, Wrapper } from '../UI'
import { Map } from '../Shared'
import useStyles from './styles'

const Details = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [mainCompany, setMainCompany] = useState(null)
  const { company } = useSelector((state) => state.companies)

  useEffect(() => {
    if (company?.parent_business_id) {
      dispatch(
        companiesActions.getMainCompany(company.parent_business_id)
      ).then((data) => {
        setMainCompany(data)
      })
    } else {
      setMainCompany(null)
    }
  }, [company])

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
                  <Text>{company?.benefit_pyme}</Text>
                </LabeledRow>
                <LabeledRow label="Comentarios">
                  <Text>{company?.comments}</Text>
                </LabeledRow>
                {mainCompany && (
                  <LabeledRow label="Empresa madre">
                    <Text>
                      <a href={`/company/${mainCompany?.id}/details`}>
                        {mainCompany?.business_name}
                      </a>
                    </Text>
                  </LabeledRow>
                )}
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
