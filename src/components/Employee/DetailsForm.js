import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { formatDate } from '../../formatters'
import { LabeledRow, Text } from '../UI'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  comments: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  }
}))

const Details = ({ loading, data }) => {
  const classes = useStyles()

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <LabeledRow label={'Run'}>
            <Text loading={loading}>{data?.run}</Text>
          </LabeledRow>
          <LabeledRow label={'Nombres'}>
            <Text loading={loading}>{data?.names}</Text>
          </LabeledRow>
          <LabeledRow label={'Apellido paterno'}>
            <Text loading={loading}>{data?.paternal_surname}</Text>
          </LabeledRow>
          <LabeledRow label={'Apellido materno'}>
            <Text loading={loading}>{data?.maternal_surname || `---`}</Text>
          </LabeledRow>
          <LabeledRow label={'Sexo'}>
            <Text loading={loading}>{data?.gender}</Text>
          </LabeledRow>
        </Grid>
        <Grid item xs={12} md={6}>
          <LabeledRow label={'Estado civil'}>
            <Text loading={loading}>{data?.marital_status?.description}</Text>
          </LabeledRow>
          <LabeledRow label={'Nacionalidad'}>
            <Text loading={loading}>{data?.nationality?.description}</Text>
          </LabeledRow>
          <LabeledRow label={'Escolaridad'}>
            <Text loading={loading}>{data?.scholarship?.description}</Text>
          </LabeledRow>
          <LabeledRow width={170} label={'Fecha de nacimiento'}>
            <Text loading={loading}>{formatDate(data?.born_date)}</Text>
          </LabeledRow>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography className={classes.heading}>
            Información económica
          </Typography>
          <LabeledRow label={'Nombre de banco'}>
            <Text loading={loading}>{data?.bank?.description}</Text>
          </LabeledRow>
          <LabeledRow label={'Tipo de cuenta'}>
            <Text loading={loading}>{data?.account_type}</Text>
          </LabeledRow>
          <LabeledRow label={'Número de cuenta'}>
            <Text loading={loading}>{data?.account_number}</Text>
          </LabeledRow>
          <LabeledRow label={'RSH'}>
            <Text loading={loading}>{data?.rsh}</Text>
          </LabeledRow>
          <LabeledRow label={'RSH %'}>
            <Text loading={loading}>{data?.rsh_percentage || `---`}</Text>
          </LabeledRow>
          <LabeledRow label={'Estado RSH'}>
            <Text loading={loading}>{data?.rsh_status}</Text>
          </LabeledRow>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography className={classes.heading}>
            Información de discapacidad
          </Typography>

          <LabeledRow width={200} label={'Discapacidad'}>
            <Text loading={loading}>{data?.disability}</Text>
          </LabeledRow>
          <LabeledRow width={200} label={'Credencial discapacidad'}>
            <Text loading={loading}>{data?.credential_disability}</Text>
          </LabeledRow>
          <LabeledRow width={200} label={'Tipo de discapacidad'}>
            <Text loading={loading}>{data?.disability_type}</Text>
          </LabeledRow>
          <LabeledRow width={200} label={'Discapacidad %'}>
            <Text loading={loading}>{data?.disability_percentage}</Text>
          </LabeledRow>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography className={classes.heading}>
            Información adicional
          </Typography>

          <LabeledRow width={200} label={'Vivo'}>
            <Text loading={loading}>{data?.alive}</Text>
          </LabeledRow>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Details
