import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Autocomplete } from '@material-ui/lab'
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  FormHelperText
} from '@material-ui/core'
import unemployedActions from '../../../state/actions/unemployed'
import { months } from '../../../config'
import { DataTable, Dialog } from '../../Shared'
import { ActionsTable, Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import { formatDate } from '../../../formatters'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}))

const validationSchema = Yup.object().shape({
  month: Yup.number().required('Seleccione mes'),
  period: Yup.number().required('Seleccione periodo'),
  benefitId: Yup.number().required('Seleccione benefit'),
  list: Yup.array().min(1, 'Seleccione al menos un trabajador')
})

const PaymentDialog = ({ open, onClose, submitFunction, successMessage }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [currentDate] = useState(new Date())
  const { isMobile } = useSelector((state) => state.ui)
  const [benefits, setBenefits] = useState([])
  const [selectedBenefit, setSelectedBenefit] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const [query, setQuery] = useState({ size: 50, page: 1 })
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    validationSchema,
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      period: currentDate.getFullYear(),
      month: '',
      benefitId: '',
      list: []
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            enqueueSnackbar(successMessage, { variant: 'success' })
            onClose()
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  const getBenefitsList = () => {
    dispatch(unemployedActions.getUnemployedBenefits()).then((res) => {
      setBenefits(res)
    })
  }

  const fetchWithoutPayment = () => {
    setLoading(true)
    setEmployees([])
    dispatch(
      unemployedActions.getWIthoutPayments({
        ...query,
        year: formik.values.period,
        month: formik.values.month
      })
    )
      .then((res) => {
        setEmployees(res)
        setLoading(false)
      })
      .catch(() => {
        setEmployees([])
        setLoading(false)
      })
  }

  useEffect(() => {
    formik.setFieldValue(
      'list',
      employees.map((item) => ({ unemployedId: item.id }))
    )
  }, [employees])

  useEffect(() => {
    if (open) {
      getBenefitsList()
    }
  }, [open])

  useEffect(() => {
    if (formik.values.period && formik.values.month) {
      fetchWithoutPayment()
    }
  }, [formik.values.period, formik.values.month, query])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="lg"
      fullWidth
    >
      <Box>
        <Typography className={classes.title} align="center">
          Registrar pago
        </Typography>
        <Box mt={2}>
          <Alert severity="warning">
            Vas a registrar los pagos para estos cesantes.{' '}
            <strong>
              Selecciona el año y el periodo para obtener cesantes sin pagos
            </strong>
          </Alert>
        </Box>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                options={benefits}
                value={selectedBenefit}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                onChange={(__, value) => {
                  setSelectedBenefit(value || null)
                  formik.setFieldValue('benefitId', value?.id || '')
                  setTimeout(() => {
                    formik.setFieldTouched('benefitId')
                  }, 500)
                }}
                renderOption={(option) => (
                  <Box>
                    <Typography>{option.name}</Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona beneficio"
                    placeholder="Beneficio"
                  />
                )}
              />
              {formik.touched.benefitId && Boolean(formik.errors.benefitId) && (
                <FormHelperText error>{formik.errors.benefitId}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <Select
                label={'Mes'}
                name="month"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.month && Boolean(formik.errors.month)}
                helperText={formik.touched.month && formik.errors.month}
              >
                <option value="">SELECCIONE MES</option>
                {months.map((item) => (
                  <option
                    key={`month-option-${item.index}`}
                    value={item.index}
                    disabled={item.index > currentDate.getMonth() + 1}
                  >
                    {item.name.toUpperCase()}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={'Año'}
                value={currentDate.getFullYear()}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <DataTable
                data={employees}
                progressPending={loading}
                columns={[
                  {
                    name: 'Run',
                    selector: (row) => row.employeeRut,
                    sortable: true
                  },
                  {
                    name: 'Nombres y apellidos',
                    selector: (row) => row.employeeNames
                  },
                  {
                    name: 'Oficina',
                    selector: (row) => row.office
                  },
                  {
                    name: 'Fecha de registro',
                    selector: (row) => formatDate(row.date)
                  },
                  {
                    name: '',
                    right: true,
                    selector: (row) => (
                      <ActionsTable
                        onDelete={() => {
                          const list = employees.filter(
                            (item) => item.id !== row.id
                          )
                          setEmployees(list)
                        }}
                      />
                    )
                  }
                ]}
                pagination
                paginationRowsPerPageOptions={[40, 50]}
                paginationServer={true}
                paginationTotalRows={10}
                paginationPerPage={50}
                paginationServer={true}
                onChangeRowsPerPage={(limit) => {
                  setQuery({ ...query, size: limit })
                }}
                onChangePage={(page) => {
                  setQuery({ ...query, page })
                }}
              />
            </Grid>
          </Grid>
          <Box mt={2} textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              loading={formik.isSubmitting}
              disabled={!formik.isValid}
              success={success}
            >
              Guardar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

PaymentDialog.defaultProps = {
  successMessage: 'Pago registrado!'
}

export default PaymentDialog
