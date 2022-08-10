import { useEffect, useState } from 'react'
import { Box, Grid, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Autocomplete } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { Wrapper, SearchInput, SubmitButton, TextField } from '../UI'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import modulesReports from '../../resources/modulesReports'
import ReportDialog from './ReportDialog'
import ReportMonthlyDialog from './ReportStepper'
import InformeCsocial from './CsocialReport'
import informeConvenioActions from '../../state/actions/informe_convenio'
import InformeAnexosPorConvenio from './InformeAnexoConvenio'

const ReportsList = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { open, toggleOpen } = useToggle()
  const { open: MonthlyReport, toggleOpen: toggleOpenMonthlyReport } =
    useToggle()
  const { open: CsocialReport, toggleOpen: toggleOpenCsocialReport } =
    useToggle()
  const { open: AnexoConvenio, toggleOpen: toggleOpenAnexoConvenio } =
    useToggle()
  const [type, setType] = useState('')
  const [modules, setModules] = useState([])
  const [listModules, setListModules] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    module: ''
  })
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (apiData, fileName, mssg) => {
    const ws = XLSX.utils.json_to_sheet(apiData)
    const wb = {
      Sheets: { informe_convenio: ws },
      SheetNames: ['informe_convenio']
    }
    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array'
    })
    const informe_convenio = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(informe_convenio, fileName + fileExtension)
    setLoading(false)
    enqueueSnackbar(mssg, {
      variant: 'success'
    })
  }

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

  const generateInformeConvenio = () => {
    setLoading(true)
    dispatch(informeConvenioActions.getInformeConvenio()).then((data) => {
      if (data.message === 'No se encontraron registros.') {
        enqueueSnackbar(data.message, {
          variant: 'error'
        })
        setLoading(false)
      } else {
        exportToCSV(data.rows, `Informe Convenio`, data.message)
      }
    })
  }

  return (
    <Wrapper>
      <ReportDialog open={open} onClose={toggleOpen} type={type} />
      <ReportMonthlyDialog
        open={MonthlyReport}
        onClose={toggleOpenMonthlyReport}
        type={type}
      />
      <InformeCsocial open={CsocialReport} onClose={toggleOpenCsocialReport} />
      <InformeAnexosPorConvenio
        open={AnexoConvenio}
        onClose={toggleOpenAnexoConvenio}
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
                    <SubmitButton
                      onClick={() => {
                        if (row.type === 'MONTHLY_REPORT') {
                          toggleOpenMonthlyReport()
                          setType(row.report)
                        }
                        if (row.type === 'INFORME_CSOCIAL') {
                          toggleOpenCsocialReport()
                        }
                        if (
                          row.type !== 'MONTHLY_REPORT' &&
                          row.type !== 'INFORME_CSOCIAL' &&
                          row.type !== 'INFORME_CONVENIO' &&
                          row.type !== 'INFORME_ANEXO_CONVENIO'
                        ) {
                          toggleOpen()
                          setType(row.type)
                        }
                        if (row.type === 'INFORME_CONVENIO') {
                          generateInformeConvenio()
                        }
                        if (row.type === 'INFORME_ANEXO_CONVENIO') {
                          toggleOpenAnexoConvenio()
                        }
                      }}
                      disabled={!row.isActive}
                      loading={loading && row.type === 'INFORME_CONVENIO'}
                    >
                      Generar
                    </SubmitButton>
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
