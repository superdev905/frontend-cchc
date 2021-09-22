import { Box, Typography } from '@material-ui/core'
import { useToggle } from '../../../hooks'
import { Button } from '../../UI'
import BenefitCard from './Card'
import BenefitDialog from './Dialog'

const List = () => {
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  return (
    <Box p={1}>
      <Box display="flex" justifyContent="space-between">
        <Typography>Beneficios</Typography>
        <Button onClick={toggleOpenAdd}>Nuevo beneficio</Button>
      </Box>
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
      <BenefitDialog open={openAdd} onClose={toggleOpenAdd} />
    </Box>
  )
}

export default List
