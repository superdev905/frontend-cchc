import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import {
  FiMoreVertical as MoreIcon,
  FiCheckSquare as CheckIcon
} from 'react-icons/fi'
import assistanceActions from '../../state/actions/assistance'
import { formatDate, formatHours } from '../../formatters'
import { useMenu, useToggle } from '../../hooks'
import { ActionsTable, Button, SearchInput, Wrapper } from '../UI'
import { DataTable, OptionsMenu } from '../Shared'
import VisitStatusChip from './VisitStatusChip'
import { VisitCloseDialog } from '../Visit'

const List = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const [totalPages, setTotalPages] = useState(0)
  const [currentVisit, setCurrentVisit] = useState(null)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    user_id: user?.id,
    role: user.role.key
  })
  const { open, anchorEl, handleClose, handleOpen } = useMenu()
  const { open: openVisitClose, toggleOpen: toggleOpenVisitClose } = useToggle()

  const redirectToVisits = () => {
    history.push('/visits')
  }

  const fetchList = () => {
    setLoading(true)
    dispatch(
      assistanceActions.getVisitsToClose({
        ...filters,
        search: filters.search.trim()
      })
    ).then((result) => {
      setTableData(
        result.items.map((item) => ({
          ...item,
          dateEvent: formatDate(item.date, {}),
          startHour: `${formatHours(item.start_date)} - ${formatHours(
            item.end_date
          )}`
        }))
      )
      setTotalPages(result.total)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchList()
  }, [filters])

  return (
    <Box>
      <Box marginTop="10px">
        <Wrapper>
          <Grid container>
            <Grid item xs={12} md={5}>
              <SearchInput
                value={filters.search}
                onChange={(e) => {
                  setFilters({ ...filters, search: e.target.value })
                }}
                placeholder={'Buscar por: Título, Empresa, Obra'}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={redirectToVisits}>Ver visitas</Button>
              </Box>
            </Grid>
          </Grid>

          <DataTable
            emptyMessage={
              filters.search
                ? `No se encontraron resultados para: ${filters.search}`
                : 'No hay visitas por cerrar'
            }
            data={tableData}
            progressPending={loading}
            columns={[
              {
                name: 'Fecha',
                selector: (row) => row.dateEvent,
                sortable: true
              },
              {
                name: 'Hora',
                selector: (row) => row.startHour,
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
              },
              {
                name: '',
                right: true,
                selector: (row) => (
                  <ActionsTable
                    moreOptions={[
                      {
                        icon: <MoreIcon color="black" />,
                        onClick: (e) => {
                          handleOpen(e)
                          setCurrentVisit(row)
                        }
                      }
                    ]}
                  />
                )
              }
            ]}
            pagination
            highlightOnHover
            pointerOnHover
            onRowClicked={(row) => {
              setCurrentVisit(row)
              toggleOpenVisitClose()
            }}
            paginationServer={true}
            paginationRowsPerPageOptions={[30, 40]}
            paginationPerPage={filters.size}
            onChangeRowsPerPage={(limit) => {
              setFilters({ ...filters, size: limit })
            }}
            onChangePage={(page) => {
              setFilters({ ...filters, page })
            }}
            paginationTotalRows={totalPages}
          />
        </Wrapper>

        {open && currentVisit && (
          <OptionsMenu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            customOptions={[
              {
                icon: CheckIcon,
                label: 'Aprobar cierre',
                onClick: () => {
                  handleClose()
                  toggleOpenVisitClose()
                }
              },
              {
                icon: MoreIcon,
                label: 'Ver detalles de visita',
                onClick: () => {
                  history.push(`/visit/${currentVisit.id}`)
                }
              }
            ]}
          />
        )}
        {openVisitClose && currentVisit && (
          <VisitCloseDialog
            visitId={currentVisit.id}
            open={openVisitClose}
            onClose={toggleOpenVisitClose}
            successFunction={fetchList}
          />
        )}
      </Box>
    </Box>
  )
}

export default List
