import { Box, Typography } from '@material-ui/core'
import BenefitCard from './Card'

const List = () => (
  <Box p={1}>
    <Typography>Beneficios</Typography>
    <Box>
      <BenefitCard loader />
      <BenefitCard
        benefit={{
          name: 'Nombre del beneficio',
          description: 'Descripcion del beneficio',
          amount: 10,
          date: new Date()
        }}
      />
    </Box>
  </Box>
)

export default List
