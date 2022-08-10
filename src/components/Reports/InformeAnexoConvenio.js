import { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { Dialog } from '../Shared'
import { Button, SubmitButton, TextField } from '../UI'
import housingActions from '../../state/actions/housing'
import informeConvenioActions from '../../state/actions/informe_convenio'

const ReportDialog = ({ open, onClose }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const { agreementList } = useSelector((state) => state.housing)
  const [loading, setLoading] = useState(false)
  const [param, setParam] = useState({ convenio: '' })
  const [query, setQuery] = useState({ page: 1, size: 10, search: '' })
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (apiData, fileName, mssg) => {
    const ws = XLSX.utils.json_to_sheet(apiData)
    const wb = {
      Sheets: { informe_anexo_convenio: ws },
      SheetNames: ['informe_anexo_convenio']
    }
    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array'
    })
    const informe_anexo_convenio = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(informe_anexo_convenio, fileName + fileExtension)
    setLoading(false)
    onClose()
    enqueueSnackbar(mssg, {
      variant: 'success'
    })
  }

  const getDocument = () => {
    setLoading(true)
    dispatch(informeConvenioActions.getInformeAnexoConvenio(param)).then(
      (data) => {
        if (data.message === 'No se encontraron registros.') {
          enqueueSnackbar(data.message, {
            variant: 'error'
          })
          setLoading(false)
        } else {
          exportToCSV(data.rows, `Informe Anexos por convenio`, data.message)
        }
      }
    )
  }

  const handleSearch = (e) => {
    setQuery({ ...query, search: e.target.value })
  }

  const fetchAgreements = () => {
    setLoading(true)
    dispatch(
      housingActions.getAgreements({ ...query, search: query.search.trim() })
    ).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (open) {
      fetchAgreements()
    }
  }, [open, query])

  useEffect(() => {
    setParam({ convenio: '' })
  }, [])

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Generar Reporte
        </Typography>
        <Box p={2}>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Autocomplete
                  options={agreementList}
                  getOptionLabel={(option) => `${option.businessName}`}
                  onChange={(_, m) => setParam({ convenio: m.businessName })}
                  renderOption={(option) => (
                    <Box>
                      <Typography>
                        <strong>{option.businessName.toUpperCase()}</strong>
                      </Typography>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona Convenio"
                      placeholder="Convenio"
                      onChange={handleSearch}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box textAlign="center" marginTop="10px">
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton
                disabled={!param.convenio}
                onClick={getDocument}
                loading={loading}
              >
                Generar
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ReportDialog
