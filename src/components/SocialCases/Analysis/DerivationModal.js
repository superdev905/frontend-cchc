import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Box, Typography, Grid, Chip } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Select, Button, TextField, TextArea } from '../../UI'
import { Dialog } from '../../Shared'
import usersActions from '../../../state/actions/users'
import socialCaseActions from '../../../state/actions/socialCase'

const useStyles = makeStyles(() => ({
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

const DerivationModal = ({ open, onClose, assistanceID }) => {
  const classes = useStyles()
  const { socialCaseId } = useParams()
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { enqueueSnackbar } = useSnackbar()
  const [assistanceList, setAssistanceList] = useState([])
  const [state] = useState('ASIGNADO')
  const [value, setValue] = useState([])

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
      try {
        formData.date = new Date().toISOString()
        formData.assistanceTitularId = assistanceID
        formData.state = state
        formData.professionals = [...value]

        dispatch(
          socialCaseActions.createDerivation(socialCaseId, formData)
        ).then(() => {
          enqueueSnackbar('Delegación Ingresada Exitosamente', {
            variant: 'success'
          })
          dispatch(socialCaseActions.getSocialCaseById(socialCaseId))
        })
      } catch (error) {
        enqueueSnackbar(error, {
          variant: 'error'
        })
      }
    }
  })

  useEffect(() => {
    if (open) {
      formik.resetForm()
      setValue([])
    }
  }, [open])

  useEffect(() => {
    dispatch(usersActions.getSocialAssistanceList()).then((item) => {
      const list = []
      item.forEach((assistance) => {
        list.push({
          userId: assistance.id,
          fullName: `${assistance.names} ${assistance.paternal_surname} ${assistance.maternal_surname}`
        })
      })
      setAssistanceList(list)
    })
  }, [])
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Typography variant="h6" align="center" className={classes.title}>
          Crear Derivación
        </Typography>

        <Grid container>
          <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Box className={classes.BoxForm}>
                <Box className={classes.boxHorizontal}>
                  <Box className={classes.boxInput}>
                    <TextField
                      label="Estado *"
                      name="state"
                      value={state}
                      disabled
                      fullWidth
                    />
                  </Box>

                  <Box className={classes.boxInput}>
                    <Select
                      label="Prioridad *"
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
                    <TextArea
                      label="Observaciones"
                      name="observations"
                      multiline
                      rows={8}
                      variant="outlined"
                      fullWidth
                      required
                      value={formik.values.observations}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
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
                    <Typography>Agregar nuevos Encargados *</Typography>
                    <Autocomplete
                      multiple
                      value={value}
                      onChange={(event, newValue) => {
                        setValue([...newValue])
                      }}
                      options={assistanceList}
                      getOptionLabel={(option) => option.fullName}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            label={option.fullName}
                            {...getTagProps({ index })}
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
