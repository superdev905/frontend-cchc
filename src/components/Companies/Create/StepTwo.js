import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { useToggle, useSuccess } from '../../../hooks'
import companiesActions from '../../../state/actions/companies'
import pollActions from '../../../state/actions/poll'
import { Button, Select, SubmitButton, TextArea, TextField } from '../../UI'
import { isPollListAnswered } from '../../../validations'
import { businessTypes, decisionList } from '../../../config'
import ParentBusiness from './ParentBusiness'
import { buildTreeData } from '../../../utils/buildTreeData'
import { PollsModule } from '../../Polls'
import useStyles from './styles'
import Can from '../../Can'

const parentValidation = Yup.object({
  parent_business_id: Yup.number()
    .required('Selecciona empresa relacionada')
    .nullable()
})

const validationSchema = Yup.object({
  type: Yup.string().required('Seleccione tipo'),
  is_partner: Yup.string().required('Seleccione empresa socia'),
  social_service: Yup.string().required('Seleccione opción'),
  benefit_pyme: Yup.string(),
  parent_business_id: Yup.number().nullable()
})

const StepOne = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { moduleResponse } = useSelector((state) => state.poll)
  const { module: currentModule } = useSelector((state) => state.ui)
  const [needParent, setNeedParent] = useState(false)
  const [errorParent, setErrorParent] = useState(false)
  const { create } = useSelector((state) => state.companies)
  const [mainCompanies, setMainCompanies] = useState([])
  const [listCompanies, setListCompanies] = useState([])
  const [parentCompany, setParentCompany] = useState(null)
  const { open, toggleOpen } = useToggle()

  const formik = useFormik({
    validationSchema: needParent
      ? validationSchema.concat(parentValidation)
      : validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      type: create?.company?.type || '',
      is_partner: create?.company?.is_partner || '',
      benefit_pyme: create?.company?.benefit_pyme || '',
      social_service: create?.company?.social_service || '',
      social: '',
      comments: create?.company?.comments || '',
      parent_business_id: create?.company?.parent_business_id || null
    },
    onSubmit: (values) => {
      const {
        rut,
        name,
        region,
        commune,
        email,
        address,
        latitude,
        longitude
      } = create.company
      const data = {
        rut,
        name,
        email,
        business_name: create.company.business_name,
        address,
        latitude,
        longitude,
        type: values.type,
        region_id: region,
        commune_id: commune,

        ...values
      }
      if (create.type === 'CREATE') {
        dispatch(companiesActions.createCompany(data))
          .then((result) => {
            moduleResponse.pollStatus.forEach((item) => {
              dispatch(
                pollActions.updateResponse(item.responseId, {
                  source_module: currentModule,
                  related_data: `${values.business_name}`,
                  related_data_id: result.id
                })
              )
            })
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

  const getPollValidation = () => {
    if (create.type === 'UPDATE') return false
    return !isPollListAnswered(moduleResponse)
  }

  useEffect(() => {
    setNeedParent(formik.values.type === 'EMPRESA RELACIONADA')
    if (formik.values.type !== 'EMPRESA RELACIONADA') {
      setErrorParent(false)
      setParentCompany(null)
      formik.setFieldValue('parent_business_id', '')
    } else {
      setErrorParent(!formik.values.parent_business_id)
    }
  }, [formik.values.type])

  useEffect(() => {
    setErrorParent(!formik.values.parent_business_id)
    if (formik.values.parent_business_id && listCompanies.length > 0) {
      setParentCompany(
        listCompanies.find(
          (item) => item.id === formik.values.parent_business_id
        )
      )
    }
  }, [listCompanies, formik.values.parent_business_id])

  useEffect(() => {
    dispatch(companiesActions.getAvailableCompanies()).then((list) => {
      setListCompanies(list)
      setMainCompanies(buildTreeData(list))
    })
  }, [])

  const goBack = () => {
    dispatch(
      companiesActions.updateCreate({ ...create, step: create.step - 1 })
    )
  }

  useEffect(() => {
    if (formik.isSubmitting && !formik.isValid) {
      enqueueSnackbar('Completa los campos requeridos', {
        autoHideDuration: 2000,
        variant: 'info'
      })
    }
  }, [!formik.isValid, formik.isSubmitting])

  return (
    <Box className={classes.form}>
      <Typography className={classes.subtitle} align="center">
        Otros datos
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Select
              label="Tipo de empresa"
              name="type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
              required
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            >
              <option value="">SELECCIONE TIPO</option>
              {businessTypes.map((item, i) => (
                <option key={`business-type-${i}`} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Empresa madre"
              name="parent_business_id"
              value={
                parentCompany?.business_name || formik.values.parent_business_id
              }
              onChange={formik.handleChange}
              onClick={() => {
                if (
                  formik.values.type &&
                  formik.values.type !== 'EMPRESA PRINCIPAL'
                ) {
                  toggleOpen()
                }
              }}
              disabled
              placeholder="Sin empresa madre"
              error={errorParent}
              helperText={errorParent && 'Seleccione empresa madre'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Asociada"
              name="is_partner"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.is_partner}
              required
              error={
                formik.touched.is_partner && Boolean(formik.errors.is_partner)
              }
              helperText={formik.touched.is_partner && formik.errors.is_partner}
            >
              <option value="">SELECCIONE TIPO </option>
              {decisionList.map((item, i) => (
                <option key={`option-${i}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Beneficio Pyme"
              name="benefit_pyme"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.benefit_pyme}
            >
              <option value="">SELECCIONE UNA OPCIÓN</option>
              {decisionList.map((item, i) => (
                <option key={`pyme-option-${i}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Servicio Social"
              name="social_service"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.social_service}
              required
              error={
                formik.touched.social_service &&
                Boolean(formik.errors.social_service)
              }
              helperText={
                formik.touched.social_service && formik.errors.social_service
              }
            >
              <option value="">SELECCIONE UNA OPCIÓN</option>
              {decisionList.map((item, i) => (
                <option key={`social-option-${i}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>

          <Can
            availableTo={['SOCIAL_ASSISTANCE', 'ADMIN']}
            yes={() => (
              <Grid item xs={12}>
                <TextArea
                  name="comments"
                  label="Comentarios"
                  value={formik.values.comments}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.comments && Boolean(formik.errors.comments)
                  }
                  helperText={formik.touched.comments && formik.errors.comments}
                  maxLength={800}
                />
              </Grid>
            )}
            no={() => (
              <Grid item xs={12}>
                <TextArea
                  name="comments"
                  label="Comentarios"
                  value={formik.values.comments}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.comments && Boolean(formik.errors.comments)
                  }
                  helperText={formik.touched.comments && formik.errors.comments}
                  maxLength={800}
                  disabled={create.type === 'UPDATE'}
                />
              </Grid>
            )}
          />

          <ParentBusiness
            open={open}
            onClose={toggleOpen}
            data={mainCompanies}
            selectedId={formik.values.parent_business_id}
            onChange={(id) => {
              formik.setFieldValue('parent_business_id', id)
            }}
          />
        </Grid>
      </Box>
      {create.type === 'CREATE' && <PollsModule />}
      <Box className={classes.actions}>
        <Button startIcon={<BackIcon />} variant="outlined" onClick={goBack}>
          Anterior
        </Button>
        <SubmitButton
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
          success={success}
          disabled={!formik.isValid || getPollValidation()}
        >
          {create.type === 'UPDATE' ? 'Actualizar' : 'Crear'} empresa
        </SubmitButton>
      </Box>
    </Box>
  )
}

export default StepOne
