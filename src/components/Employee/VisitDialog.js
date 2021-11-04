import { Box, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate, formatHours } from '../../formatters'
import assistanceActions from '../../state/actions/assistance'
import VisitStatusChip from '../Assistance/VisitStatusChip'
import { DataTable, Dialog } from '../Shared'

const AssistanceDialog = ({ open, onClose, onSelected }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [totalVisits, setTotalVisits] = useState(0)
  const { isMobile } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    status: 'PROGRAMADA',
    user_id: user?.id
  })
  const [visits, setVisits] = useState([])
  const fetchList = () => {
    setLoading(true)
    dispatch(assistanceActions.getEvents({}, false)).then((result) => {
      setLoading(false)
      setVisits(result.items)
      setTotalVisits(result.total)
    })
  }
  const onRowClick = async (row) => {
    const selectedVisit = await dispatch(
      assistanceActions.getEventDetails(row.id)
    )
    onSelected(selectedVisit)
  }

  useEffect(() => {
    if (open) {
      fetchList()
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={isMobile}
      maxWidth={'lg'}
    >
      <Box>
        <Typography style={{ fontWeight: 'bold' }} variant="h6" align="center">
          Selecciona una visita
        </Typography>
        <Box>
          <DataTable
            emptyMessage={
              filters.search
                ? `No se encontraron resultados para: ${filters.search}`
                : 'No hay visitas registradas'
            }
            data={visits}
            progressPending={loading}
            highlightOnHover
            pointerOnHover
            columns={[
              {
                name: 'Fecha',
                selector: (row) => formatDate(row.date),
                sortable: true
              },
              {
                name: 'Hora',
                selector: (row) => formatHours(row.start_date),
                sortable: true
              },
              {
                name: 'Estado',
                selector: (row) => (
                  <Box>
                    <VisitStatusChip visit={row} />
                  </Box>
                )
              },
              {
                name: 'Titulo',
                selector: (row) => row.title
              },
              {
                name: 'Empresa',
                selector: (row) => row.business_name
              },
              {
                name: 'Obra',
                selector: (row) => row.construction_name,
                hide: 'md'
              }
            ]}
            pagination
            paginationServer={true}
            onRowClicked={onRowClick}
            paginationRowsPerPageOptions={[30, 40]}
            paginationPerPage={filters.size}
            onChangeRowsPerPage={(limit) => {
              setFilters({ ...filters, size: limit })
            }}
            onChangePage={(page) => {
              setFilters({ ...filters, page })
            }}
            paginationTotalRows={totalVisits}
          />
        </Box>
      </Box>
    </Dialog>
  )
}

export default AssistanceDialog
