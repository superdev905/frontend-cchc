import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import { Box, Typography, Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Select, Button, TextField, TextArea } from '../../UI'
import { Dialog } from '../../Shared'
import states from '../../../resources/statesData'
import socialCaseActions from '../../../state/actions/socialCase'

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

const ClosingModal = ({ open, onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { socialCaseId } = useParams()
  const { isMobile } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const [profesional] = useState({
    id: user.id,
    fullName: `${user.names} ${user.paternal_surname} ${user.maternal_surname}`
  })

  const formik = useFormik({
    initialValues: {
      state: '',
      observations: ''
    },
    validationSchema: Yup.object({
      state: Yup.string(),
      observations: Yup.string().required('El campo Observaciones es requerido')
    }),
    onSubmit: (formData) => {
      try {
        formData.date = new Date().toISOString()
        formData.professionalId = profesional.id
        formData.professionalNames = profesional.fullName
        dispatch(socialCaseActions.createClosing(socialCaseId, formData)).then(
          () => {
            enqueueSnackbar('Caso Cerrado Exitosamente', {
              variant: 'success'
            })
            dispatch(socialCaseActions.getSocialCaseById(socialCaseId))
          }
        )
      } catch (error) {
        enqueueSnackbar('Error Al Cerrar Caso', { variant: 'error' })
      }
    }
  })

  useEffect(() => {
    if (open) {
      formik.resetForm()
      formik.setFieldValue('state', 'CERRADO')
    }
  }, [open])

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
          Cierre De Caso
        </Typography>

        <Grid container>
          <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Box className={classes.BoxForm}>
                <Box className={classes.boxHorizontal}>
                  <Box className={classes.boxInput}>
                    <TextField
                      label="Profesional"
                      name="profesional"
                      value={profesional.fullName}
                      disabled
                      fullWidth
                    />
                  </Box>

                  <Box className={classes.boxInput}>
                    <Select
                      label="Estado de cierre *"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.state && Boolean(formik.errors.state)
                      }
                      helperText={formik.touched.state && formik.errors.state}
                    >
                      {states.map((item) => (
                        <option key={`state-${item}`} value={item}>
                          {item}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </Box>
                <Box className={classes.boxHorizontal}>
                  <Box className={classes.boxInput}>
                    <TextArea
                      label="Observaciones *"
                      name="observations"
                      value={formik.values.observations}
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
                  <Button type="submit" disabled={!formik.isValid}>
                    Guardar
                  </Button>
                </Box>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

export default ClosingModal
