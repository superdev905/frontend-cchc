import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Chip, Grid } from '@material-ui/core'
import InclusionDialog from './Dialog'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import { Button, SearchInput } from '../UI'
import inclusionActions from '../../state/actions/inclusion'
import { formatDate } from '../../formatters'

const List = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const { inclusionCases } = useSelector((state) => state.inclusion)
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()

  const onCreateCase = (values) =>
    dispatch(
      inclusionActions.createCase({
        ...values,
        date: new Date().toISOString(),
        assistanceId: user.id
      })
    )

  const getCases = () => {
    setLoading(true)
    dispatch(inclusionActions.getCases())
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    getCases()
  }, [])

  return (
    <Box>
      <Box mt={2}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6} lg={5}>
            <SearchInput placeholder="Buscar..." />
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Box textAlign="right">
              <Button>Filtros</Button>
              <Button onClick={toggleOpenCreate}>Nuevo</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <DataTable
          data={inclusionCases}
          progressPending={loading}
          columns={[
            {
              name: 'N°',
              width: '80px',
              sortable: true,
              center: true,
              selector: (row) => row.number
            },
            {
              name: 'Estado',
              compact: true,
              selector: (row) => <Chip color="primary" label={row.status} />
            },
            {
              name: 'Rut de trabajador',
              compact: true,
              selector: (row) => row.employeeRut
            },
            {
              name: 'Trabajador',
              compact: true,
              selector: (row) => row.employeeNames
            },
            {
              name: 'Fecha',
              compact: true,
              selector: (row) => formatDate(row.date, {})
            },
            {
              name: 'Rut de empresa',
              compact: true,
              selector: (row) => row.businessRut
            },
            {
              name: 'Empresa',
              compact: true,
              selector: (row) => row.businessName
            },
            {
              name: 'Metodo cobro',
              compact: true,
              selector: (row) => row.chargeMethod.name
            }
          ]}
          onRowClicked={(row) => {
            history.push(`/inclusion-cases/${row.number}`)
          }}
          pagination
          selectableRowsHighlight
        />
      </Box>
      {openCreate && (
        <InclusionDialog
          open={openCreate}
          onClose={toggleOpenCreate}
          submitFunction={onCreateCase}
        />
      )}
    </Box>
  )
}

export default List
