import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import companiesActions from '../../state/actions/companies'
import { LabeledRow, StatusChip, Text, Wrapper } from '../UI'
import { Map } from '../Shared'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}))

const Details = ({ loading }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [billing, setBilling] = useState(null)
  const { construction } = useSelector((state) => state.constructions)

  useEffect(() => {
    if (construction) {
      dispatch(
        companiesActions.getCompany(construction.billing_business_id, false)
      ).then((result) => {
        setBilling(result)
      })
    }
  }, [construction])
  return (
    <Box>
      <Wrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography className={classes.heading}>Información</Typography>
              <Box>
                <LabeledRow label="Razón social">
                  <Text loading={loading}> {construction?.business_name}</Text>
                </LabeledRow>
                {construction && construction.name && (
                  <LabeledRow label="Nombre">
                    <Text loading={loading}>{construction?.name}</Text>
                  </LabeledRow>
                )}
                <LabeledRow label="Rut">
                  <Text loading={loading}> {construction?.rut}</Text>
                </LabeledRow>
                <LabeledRow label="Sector económico">
                  <Text loading={loading}>
                    {construction?.economic_sector?.name}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Tipología">
                  <Text loading={loading}>{construction?.typology?.name}</Text>
                </LabeledRow>
                <LabeledRow label="Estado">
                  <StatusChip
                    success={construction?.state === 'VIGENTE'}
                    label={
                      construction?.state === 'VIGENTE'
                        ? 'Vigente'
                        : 'No vigente'
                    }
                  />
                </LabeledRow>
                {construction && construction.end_date && (
                  <LabeledRow label="Fecha de termino">
                    <Text loading={loading}>
                      {new Date(construction?.end_date).toLocaleDateString(
                        'es-CL',
                        {
                          dateStyle: 'long'
                        }
                      )}
                    </Text>
                  </LabeledRow>
                )}
                <LabeledRow label="Empresa">
                  <Text loading={loading}>
                    <a href={`/company/${construction?.business?.id}/details`}>
                      {construction?.business?.business_name}
                    </a>
                  </Text>
                </LabeledRow>
              </Box>
            </Box>
            <Box>
              <Typography className={classes.heading}>Facturación</Typography>
              <LabeledRow label="Rut">
                <Text loading={loading}> {billing?.rut}</Text>
              </LabeledRow>
              <LabeledRow label="Razón social">
                <Text loading={loading}>{billing?.business_name}</Text>
              </LabeledRow>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography className={classes.heading}>Ubicación</Typography>
              <Box>
                <LabeledRow label="Dirección">
                  <Text loading={loading}>{construction?.address}</Text>
                </LabeledRow>
                <LabeledRow label="Región">
                  <Text loaderWidth="80%" loading={loading}>
                    {construction?.region?.name}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Comuna">
                  <Text loading={loading}>{construction?.commune?.name}</Text>
                </LabeledRow>
              </Box>
              {construction && (
                <Map
                  longitude={parseFloat(construction.longitude)}
                  latitude={parseFloat(construction.latitude)}
                  markers={[
                    {
                      address: construction.address,
                      longitude: parseFloat(construction.longitude),
                      latitude: parseFloat(construction.latitude)
                    }
                  ]}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
    </Box>
  )
}

export default Details
