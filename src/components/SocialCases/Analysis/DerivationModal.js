import React, { useEffect, useState } from 'react'
import { useDispatch /* , useSelector */ } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import {
  Box,
  Dialog,
  Typography,
  Grid,
  TextField,
  Chip
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Select, Button } from '../../UI'
import assistanceActions from '../../../state/actions/assistance'

const useStyles = makeStyles(() => ({
  main: {},
  title: {
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  BoxForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center'
  },
  boxInput: {
    width: '100%'
  },
  boxHorizontal: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px'
  }
}))

const DerivationModal = ({ open, onClose, assistance }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [assistanceList, setAssistanceList] = useState([])
  const currentAssistance = [...assistance]
  const [value, setValue] = useState([...currentAssistance])

  const priority = ['BAJA', 'MEDIA', 'ALTA']

  const formik = useFormik({
    initialValues: {
      priority: '',
      observations: ''
    },
    validationSchema: Yup.object({
      priority: Yup.string().required('Seleccione la prioridad'),
      observations: Yup.string().required('El campo Observaciones es requerido')
    }),
    onSubmit: (formData) => {
      console.log(formData)
    }
  })

  useEffect(() => {
    dispatch(assistanceActions.getAttention()).then((item) => {
      setAssistanceList(item)
    })
  }, [])
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Box padding="30px">
        <Typography variant="h6" align="center" className={classes.title}>
          Crear Derivación
        </Typography>

        <Grid container>
          <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Box className={classes.BoxForm}>
                <Box className={classes.boxHorizontal}>
                  <Box className={classes.boxInput}>
                    <Typography>Estado *</Typography>
                    <TextField
                      name="businessName"
                      value="ASIGNADO"
                      disabled
                      fullWidth
                    />
                  </Box>

                  <Box className={classes.boxInput}>
                    <Typography>Prioridad *</Typography>
                    <Select
                      name="priority"
                      value={formik.values.priority}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.priority &&
                        Boolean(formik.errors.priority)
                      }
                      helperText={
                        formik.touched.priority && formik.errors.priority
                      }
                    >
                      <option value="">-Seleccione-</option>
                      {priority.map((item) => (
                        <option key={`priority-${item}`} value={item}>
                          {item}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </Box>
                <Box className={classes.boxHorizontal}>
                  <Box className={classes.boxInput}>
                    <Typography>Observaciones *</Typography>
                    <TextField
                      name="observations"
                      multiline
                      rows={8}
                      variant="outlined"
                      fullWidth
                      onChange={formik.handleChange}
                      error={
                        formik.touched.observations &&
                        Boolean(formik.errors.observations)
                      }
                      helperText={
                        formik.touched.observations &&
                        formik.errors.observations
                      }
                    />
                  </Box>
                </Box>
                <Box className={classes.boxHorizontal}>
                  <Box className={classes.boxInput}>
                    <Typography>Encargados *</Typography>
                    <Autocomplete
                      multiple
                      id="fixed-tags-demo"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue([
                          ...assistance,
                          ...newValue.filter(
                            (option) => assistance.indexOf(option) === -1
                          )
                        ])
                      }}
                      options={assistanceList}
                      getOptionLabel={(option) => option.employee_name}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            label={option.employee_name}
                            {...getTagProps({ index })}
                            disabled={assistance.indexOf(option) !== -1}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Selecciona los Encargados"
                        />
                      )}
                    />
                  </Box>
                </Box>
                <Box className={classes.boxHorizontal}>
                  <Button type="submit">Guardar</Button>
                </Box>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

export default DerivationModal
