import { useSelector } from 'react-redux'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { Wrapper } from '../UI'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}))

const Details = () => {
  const classes = useStyles()
  const { company } = useSelector((state) => state.companies)
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Wrapper>
            <Box>
              <Typography className={classes.heading}>Información</Typography>
              <Box>
                <Typography>Rut: {company?.rut}</Typography>
                <Typography>Razón social: {company?.business_name}</Typography>
                <Typography>Nombre: {company?.name}</Typography>
                <Typography>Correo: {company?.email}</Typography>
                <Typography>Télefono: {company?.phone}</Typography>
                <Typography>Télefono: {company?.phone1}</Typography>
                <Typography>Télefono: {company?.phone2}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography className={classes.heading}>Dirección</Typography>
              <Box>
                <Typography>{company?.address}</Typography>
                <Typography>Región: {company?.region?.name}</Typography>
                <Typography>Communa: {company?.commune?.name}</Typography>
              </Box>
            </Box>
          </Wrapper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Wrapper></Wrapper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Details
