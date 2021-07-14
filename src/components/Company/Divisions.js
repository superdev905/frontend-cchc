import { useSelector } from 'react-redux'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Button, Wrapper } from '../UI'
import { Table } from '../Shared'
import DivisionModal from '../Companies/Division/Modal'
import { useToggle } from '../../hooks'

const useStyles = makeStyles(() => ({
  root: {}
}))

const Details = () => {
  const classes = useStyles()
  const { company } = useSelector((state) => state.companies)
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()
  return (
    <Box className={classes.root}>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography>Divisiones</Typography>
          <Button onClick={toggleOpenCreate}>Agregar</Button>
        </Box>
        <Box>{company?.sub_businesses.length}</Box>
        <Box>
          <Table
            data={company?.sub_businesses}
            heading={{
              business_name: { title: 'Razón social', width: 3 },
              rut: { title: 'Rut', width: 2 },
              is_partner: {
                title: 'Empresa socia',
                width: 2,
                component: () => <span>SI</span>
              },
              created_at: { title: 'Fecha de creación', width: 2 },
              actions: {
                title: '',
                center: true,
                width: 3,
                component: () => (
                  <Box>
                    <span>ss</span>
                    <span>ss</span>
                  </Box>
                )
              }
            }}
          />
        </Box>
      </Wrapper>
      <DivisionModal open={openCreate} onClose={toggleOpenCreate} />
    </Box>
  )
}

export default Details
