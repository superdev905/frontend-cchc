import { Box, Typography } from '@material-ui/core'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import { ActionsTable, Button } from '../UI'
import AddRelatedDialog from './RelatedDialog'

const RelatedBusiness = ({ list, onAdd, onDelete }) => {
  const { open, toggleOpen } = useToggle()
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          component="div"
          style={{ display: 'flex', fontWeight: 'bold' }}
        >
          Empresas relaciondas
          <Typography
            style={{ marginLeft: '8px', opacity: 0.7, fontWeight: 'bold' }}
            component="p"
          >{`(${list.length}) seleccionados`}</Typography>
        </Typography>
        <Button onClick={toggleOpen}>Agregar</Button>
      </Box>

      <DataTable
        emptyMessage={'Esta empresa no empresas relacionadas'}
        data={list}
        progressPending={false}
        columns={[
          {
            name: 'Rut',
            selector: (row) => row.rut
          },
          {
            name: 'Nombre',
            selector: (row) => row.business_name.toUpperCase()
          },
          {
            name: 'Dirección',
            selector: (row) => row.address
          },
          {
            name: '',
            right: true,
            selector: (row) => (
              <ActionsTable
                onDelete={() => {
                  onDelete(row)
                }}
              />
            )
          }
        ]}
      />
      {open && (
        <AddRelatedDialog open={open} onClose={toggleOpen} onAdd={onAdd} />
      )}
    </Box>
  )
}

export default RelatedBusiness
