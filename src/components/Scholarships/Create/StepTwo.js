import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, InputLabel, Typography } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { useToggle, useSuccess } from '../../../hooks'
import companiesActions from '../../../state/actions/companies'
import { Button, SubmitButton } from '../../UI'
import useStyles from './styles'

import { FilePicker, FileThumbnail } from '../../Shared'

const validationSchema = Yup.object({
  type: Yup.string().required('Seleccione tipo'),
  is_partner: Yup.string().required('Seleccione empresa socia'),
  social_service: Yup.string().required('Seleccione opción'),
  benefit_pyme: Yup.string(),
  parent_business_id: Yup.number().nullable()
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
      type: create?.company?.type || '',
      is_partner: create?.company?.is_partner || '',
      benefit_pyme: create?.company?.benefit_pyme || '',
      social_service: create?.company?.social_service || '',
      social: '',
      parent_business_id: create?.company?.parent_business_id || null
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
      } = create.company
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
        dispatch(companiesActions.createCompany(data))
          .then(() => {
            formik.setSubmitting(false)
            changeSuccess(true)
            dispatch(
              companiesActions.updateCreate({
                ...create,
                step: create.step + 1
              })
            )
            enqueueSnackbar('Cliente fue creado exitosamente', {
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
        dispatch(companiesActions.updateCompany(create.company.id, data))
          .then(() => {
            formik.setSubmitting(false)
            changeSuccess(true)
            enqueueSnackbar('Cliente fue actualizado exitosamente', {
              autoHideDuration: 1500,
              variant: 'success'
            })
            dispatch(
              companiesActions.updateCreate({
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
      companiesActions.updateCreate({ ...create, step: create.step - 1 })
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
