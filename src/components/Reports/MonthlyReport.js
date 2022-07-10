import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import { Button, SubmitButton, TextField } from '../UI'
import AutocompleteVariable from './AutocompleteVariable'

const ReportDialog = ({
  onClose,
  type,
  loading,
  formData,
  setFormData,
  onSelectAutocomplete,
  areaTerreno,
  nextStepper,
  month,
  years
}) => {
  const { constructionByCompany } = useSelector((state) => state.constructions)

  return (
    <Box>
      <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
        Generar Reporte
      </Typography>
      <Box p={2}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={month}
                getOptionLabel={(option) => `${option.name}`}
                onChange={(_, m) =>
                  setFormData({ ...formData, month: !m ? '' : m.value })
                }
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>{option.name.toUpperCase()}</strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona Mes"
                    placeholder="Mes"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={years}
                getOptionLabel={(option) => `${option.value}`}
                onChange={(_, y) =>
                  setFormData({ ...formData, year: !y ? '' : y.value })
                }
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>{option.value}</strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona Año"
                    placeholder="Año"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <AutocompleteVariable type={type} onChange={onSelectAutocomplete} />
          </Grid>
          {formData.id && (
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={constructionByCompany}
                getOptionLabel={(option) => `${option.name}`}
                onChange={(_, y) => setFormData({ ...formData, obras: y })}
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>{option.name}</strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona Obras"
                    placeholder="Obras"
                  />
                )}
              />
            </Grid>
          )}
          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={nextStepper}
              disabled={loading || areaTerreno.length === 0}
            >
              siguiente
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ReportDialog
