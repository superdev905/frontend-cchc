import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import CompanyCard from '../Company/CompanyCard'
import ContactCard from './ContactCard'

const BenefitDetails = ({ loading }) => {
  const { scheduleDetails } = useSelector((state) => state.schedule)
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography style={{ fontWeight: 'bold', marginBottom: 8 }}>
            Detalles de Empresa
          </Typography>
          <CompanyCard company={scheduleDetails?.business} loading={loading} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography style={{ fontWeight: 'bold', marginBottom: 8 }}>
            Interlocutor de empresa
          </Typography>
          {scheduleDetails && (
            <ContactCard contact={scheduleDetails?.business?.interlocutor} />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

BenefitDetails.propTypes = {}

export default BenefitDetails
