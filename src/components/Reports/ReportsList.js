import { useEffect, useState } from 'react'
import { Box, Grid, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Autocomplete } from '@material-ui/lab'
import { Wrapper, SearchInput, Button, TextField } from '../UI'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import modulesReports from '../../resources/modulesReports'
import ReportDialog from './ReportDialog'
import ReportMonthlyDialog from './MonthlyReport'

const ReportsList = () => {
  const { open, toggleOpen } = useToggle()
  const { open: MonthlyReport, toggleOpen: toggleOpenMonthlyReport } =
    useToggle()
  const [type, setType] = useState('')
  const [modules, setModules] = useState([])
  const [listModules, setListModules] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    module: ''
  })

  useEffect(() => {
    const { search, module } = filters

    if (search || module) {
      setListModules(
        modulesReports.filter(
          (item) =>
            item.module.includes(module) &&
            item.name.toUpperCase().includes(search.toUpperCase())
        )
      )
      return
    }
    setListModules(modulesReports)
  }, [])

  useEffect(() => {
    const filtered = []
    if (modulesReports) {
      modulesReports.forEach((item) => {
        if (filtered.indexOf(item.module) < 0) {
          filtered.push(item.module)
        }
      })
      setModules(filtered)
      setListModules(modulesReports)
    }
  }, [])

  return (
    <Wrapper>
      <ReportDialog open={open} onClose={toggleOpen} type={type} />
      <ReportMonthlyDialog
        open={MonthlyReport}
        onClose={toggleOpenMonthlyReport}
        type={type}
      />
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={3}>
            <Autocomplete
              options={modules}
              getOptionSelected={(option, value) => option === value}
              getOptionLabel={(option) => option || ''}
              onChange={(e, value) =>
                setFilters({
                  ...filters,
                  module: !value ? '' : value
                })
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="SELECCIONE MODULO" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchInput
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value
                })
              }
              placeholder="Buscar por Nombre:"
            >
              <IconButton>
                <SearchIcon color="primary" fontSize="large" />
              </IconButton>
            </SearchInput>
          </Grid>
          <Grid item xs={12}>
            <DataTable
              emptyMessage={
                filters.search
                  ? `No se encontrarion resultador para: ${filters.search}`
                  : 'No hay Reportes'
              }
              data={listModules}
              highlightOnhover
              pointerOnHover
              columns={[
                {
                  name: 'Módulo',
                  selector: (row) => row.module
                },
                {
                  name: 'Nombre',
                  selector: (row) => row.name
                },
                {
                  name: 'Informe',
                  right: true,
                  cell: (row) => (
                    <Button
                      onClick={() => {
                        if (row.type !== 'MONTHLY_REPORT') {
                          toggleOpen()
                          setType(row.type)
                        } else {
                          toggleOpenMonthlyReport()
                          setType(row.report)
                        }
                      }}
                      disabled={!row.isActive}
                    >
                      Generar
                    </Button>
                  )
                }
              ]}
              pagination={modulesReports.length}
            />
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default ReportsList
