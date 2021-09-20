import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, InputLabel, Typography } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { useToggle, useSuccess } from '../../../hooks'
import { Button, SubmitButton } from '../../UI'
import scholarshipsActions from '../../../state/actions/scholarships'
import useStyles from './styles'

import { FilePicker, FileThumbnail } from '../../Shared'

const validationSchema = Yup.object({
  attachments: Yup.string().required('Seleccione archivo')
})

const StepTwo = ({ type }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()

  const { create } = useSelector((state) => state.companies)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const [uploadFile, setUploadFile] = useState(null)

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    initialValues: {
      attachments: create?.application?.attachments || ''
    },
    onSubmit: (values) => {
      const {
        scholarship,
        employeeName,
        employeeRut,
        businessName,
        businessRut,
        businessRelatedName,
        businessRelatedRut,
        scholarsName,
        scholarsRut,
        career,
        institution,
        region,
        ptu
      } = create.application
      const data = {
        scholarship,
        employeeName,
        employeeRut,
        businessName,
        businessRut,
        businessRelatedName,
        businessRelatedRut,
        scholarsName,
        scholarsRut,
        career,
        institution,
        region_id: region,
        ptu,

        ...values
      }

      if (create.type === 'CREATE') {
        dispatch(scholarshipsActions.createApplications(data))
          .then(() => {
            formik.setSubmitting(false)
            changeSuccess(true)
            dispatch(
              scholarshipsActions.updateCreate({
                ...create,
                step: create.step + 1
              })
            )
            enqueueSnackbar('Postulación fue creada exitosamente', {
              autoHideDuration: 1500,
              variant: 'success'
            })
          })
          .catch((err) => {
            enqueueSnackbar(err.detail, {
              autoHideDuration: 1500,
              variant: 'error'
            })
            formik.setSubmitting(false)
          })
      } else {
        dispatch(
          scholarshipsActions.updateApplications(create.application.id, data)
        )
          .then(() => {
            formik.setSubmitting(false)
            changeSuccess(true)
            enqueueSnackbar('Postulación fue actualizada exitosamente', {
              autoHideDuration: 1500,
              variant: 'success'
            })
            dispatch(
              scholarshipsActions.updateCreate({
                ...create,
                step: create.step + 1
              })
            )
          })
          .catch((err) => {
            enqueueSnackbar(err.detail, {
              autoHideDuration: 1500,
              variant: 'error'
            })
            formik.setSubmitting(false)
          })
      }
    }
  })
  console.log(uploadFile)

  const goBack = () => {
    dispatch(
      scholarshipsActions.updateCreate({ ...create, step: create.step - 1 })
    )
  }
  return (
    <Box className={classes.form}>
      <Typography className={classes.subtitle} align="center">
        Otros datos
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InputLabel style={{ fontSize: '15px', marginBottom: '12px' }}>
              CERTIFICADO EGRESO ENSEÑANZA MEDIA
            </InputLabel>
            {formik.values.certification_url && type === 'UPDATE' ? (
              <Box>
                <FileThumbnail
                  fileName={formik.values.certification_url}
                  onView={() => {
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    formik.setFieldValue('certification_url', '')
                  }}
                />
              </Box>
            ) : (
              <>
                <FilePicker
                  onChangeImage={(e) => {
                    setUploadFile(e)
                  }}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel style={{ fontSize: '15px', marginBottom: '12px' }}>
              LIQUIDACIÓN DE SUELDO
            </InputLabel>
            {formik.values.certification_url && type === 'UPDATE' ? (
              <Box>
                <FileThumbnail
                  fileName={formik.values.certification_url}
                  onView={() => {
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    formik.setFieldValue('certification_url', '')
                  }}
                />
              </Box>
            ) : (
              <>
                <FilePicker
                  onChangeImage={(e) => {
                    setUploadFile(e)
                  }}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel style={{ fontSize: '15px', marginBottom: '12px' }}>
              CERTIFICADO DE NOTAS O NEM
            </InputLabel>
            {formik.values.certification_url && type === 'UPDATE' ? (
              <Box>
                <FileThumbnail
                  fileName={formik.values.certification_url}
                  onView={() => {
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    formik.setFieldValue('certification_url', '')
                  }}
                />
              </Box>
            ) : (
              <>
                <FilePicker
                  onChangeImage={(e) => {
                    setUploadFile(e)
                  }}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel style={{ fontSize: '15px', marginBottom: '12px' }}>
              CERTIFICADO ALUMNO REGULAR
            </InputLabel>
            {formik.values.certification_url && type === 'UPDATE' ? (
              <Box>
                <FileThumbnail
                  fileName={formik.values.certification_url}
                  onView={() => {
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    formik.setFieldValue('certification_url', '')
                  }}
                />
              </Box>
            ) : (
              <>
                <FilePicker
                  onChangeImage={(e) => {
                    setUploadFile(e)
                  }}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel style={{ fontSize: '15px', marginBottom: '12px' }}>
              CERTIFICADO DE NACIMIENTO PARA ASIGNACION FAMILIAR
            </InputLabel>
            {formik.values.certification_url && type === 'UPDATE' ? (
              <Box>
                <FileThumbnail
                  fileName={formik.values.certification_url}
                  onView={() => {
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    formik.setFieldValue('certification_url', '')
                  }}
                />
              </Box>
            ) : (
              <>
                <FilePicker
                  onChangeImage={(e) => {
                    setUploadFile(e)
                  }}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel style={{ fontSize: '15px', marginBottom: '12px' }}>
              CERTIFICADO DE COTIZACIONES HISTÓRICAS DEL TRABAJADOR
            </InputLabel>
            {formik.values.certification_url && type === 'UPDATE' ? (
              <Box>
                <FileThumbnail
                  fileName={formik.values.certification_url}
                  onView={() => {
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    formik.setFieldValue('certification_url', '')
                  }}
                />
              </Box>
            ) : (
              <>
                <FilePicker
                  onChangeImage={(e) => {
                    setUploadFile(e)
                  }}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel style={{ fontSize: '15px', marginBottom: '12px' }}>
              FICHA DE POSTULACIÓN CON FIRMA Y TIMBRE DE LA EMPRESA{' '}
            </InputLabel>
            {formik.values.certification_url && type === 'UPDATE' ? (
              <Box>
                <FileThumbnail
                  fileName={formik.values.certification_url}
                  onView={() => {
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    formik.setFieldValue('certification_url', '')
                  }}
                />
              </Box>
            ) : (
              <>
                <FilePicker
                  onChangeImage={(e) => {
                    setUploadFile(e)
                  }}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel style={{ fontSize: '15px', marginBottom: '12px' }}>
              COTIZACIÓN DE LA CARRERA
            </InputLabel>
            {formik.values.certification_url && type === 'UPDATE' ? (
              <Box>
                <FileThumbnail
                  fileName={formik.values.certification_url}
                  onView={() => {
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    formik.setFieldValue('certification_url', '')
                  }}
                />
              </Box>
            ) : (
              <>
                <FilePicker
                  onChangeImage={(e) => {
                    setUploadFile(e)
                  }}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel style={{ fontSize: '15px', marginBottom: '12px' }}>
              CERTIFICADO DE AFILIACION AFP
            </InputLabel>
            {formik.values.certification_url && type === 'UPDATE' ? (
              <Box>
                <FileThumbnail
                  fileName={formik.values.certification_url}
                  onView={() => {
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    formik.setFieldValue('certification_url', '')
                  }}
                />
              </Box>
            ) : (
              <>
                <FilePicker
                  onChangeImage={(e) => {
                    setUploadFile(e)
                  }}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.actions}>
        <Button startIcon={<BackIcon />} variant="outlined" onClick={goBack}>
          Anterior
        </Button>
        {type === 'UPDATE' && formik.values.certification_url && openVisor && (
          <FileVisor
            open={openVisor}
            onClose={toggleOpenVisor}
            src={formik.values.certification_url}
          />
        )}
        <SubmitButton
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
          success={success}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {create.type === 'UPDATE' ? 'Actualizar' : 'Crear'} Postulación
        </SubmitButton>
      </Box>
    </Box>
  )
}

export default StepTwo
