import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { FiSave as SaveIcon } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import companiesActions from '../../state/actions/companies'
import {
  ScheduleBenefitDrawer,
  ScheduleContactCard
} from '../../components/Schedule'
import {
  ConfirmDelete,
  DataTable,
  HeadingWithButton
} from '../../components/Shared'
import {
  Button,
  Select,
  SubmitButton,
  TextField,
  Wrapper
} from '../../components/UI'
import benefitsActions from '../../state/actions/benefits'
import { useSuccess, useToggle } from '../../hooks'
import users from '../../state/actions/users'
import scheduleActions from '../../state/actions/schedule'
import SearchCompany from '../../components/Companies/SearchCompany'
import CompanyCard from '../../components/Company/CompanyCard'
import { formatDate } from '../../formatters'

const useStyles = makeStyles(() => ({
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  section: {
    marginBottom: 15
  }
}))

const validationSchema = Yup.object().shape({
  businessId: Yup.number().required('Seleccione empresa'),
  businessName: Yup.string().required('Seleccione empresa'),
  businessRut: Yup.string().required('Seleccione empresa'),
  bossId: Yup.string().required('Seleccione jefatura'),
  interlocutorId: Yup.number().required('Seleccione interlocutor'),
  period: Yup.string().required('Seleccione periodo')
})

const ListPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const [currentDate] = useState(new Date())
  const [periods, setPeriods] = useState([])
  const [creating, setCreating] = useState(false)
  const [periodValidation, setPeriodValidation] = useState({
    error: false,
    message: ''
  })
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companyDetails, setCompanyDetails] = useState(null)
  const [benefits, setBenefits] = useState([])
  const [currentBenefit, setCurrentBenefit] = useState(null)
  const [bosses, setBosses] = useState([])
  const { open: openInvalid, toggleOpen: toggleOpenInvalid } = useToggle()
  const { open: openBenefit, toggleOpen: toggleOpenBenefit } = useToggle()
  const { open: openBenefitEdit, toggleOpen: toggleOpenBenefitEdit } =
    useToggle()

  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      businessId: '',
      businessName: '',
      businessRut: '',
      interlocutorId: '',
      period: '',
      bossId: ''
    }
  })

  const generateNextPeriods = (years = 5) => {
    const defaultPeriods = [...Array(years).keys()].map(
      (__, index) => currentDate.getFullYear() + (index + 1)
    )
    setPeriods(defaultPeriods)
  }

  const setSchedule = (idBenefit, values) => {
    const updateList = benefits.map((item) =>
      item.id === idBenefit ? { ...item, ...values } : item
    )
    setBenefits(updateList)
  }

  const createSchedule = () => {
    const createData = {
      ...formik.values,
      date: new Date().toISOString(),
      schedule: benefits.map((item) => ({
        benefitName: item.name,
        benefitId: item.id,
        startMonth: item.startMonth,
        endMonth: item.endMonth
      }))
    }
    setCreating(true)
    dispatch(scheduleActions.createSchedule(createData))
      .then((res) => {
        enqueueSnackbar('Porgramación creada', { variant: 'success' })
        setCreating(false)
        changeSuccess(true, () => {
          history.push(`/schedule/${res.id}`)
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
        setCreating(false)
      })
  }

  const benefitsValidation = () =>
    benefits.filter((item) => !item.startMonth || !item.endMonth).length === 0

  const handleContactChange = (contact) => {
    if (contact.is_interlocutor) {
      formik.setFieldValue('interlocutorId', contact.interlocutor.id)
      formik.setFieldValue(
        'interlocutorName',
        `${contact.interlocutor.names} ${contact.interlocutor.paternal_surname}`
      )
    }
    setCompanyDetails({
      ...companyDetails,
      interlocutor: contact.is_interlocutor ? contact : null
    })
  }

  useEffect(() => {
    if (selectedCompany) {
      dispatch(companiesActions.getCompany(selectedCompany.id, false)).then(
        (res) => {
          if (res.interlocutor) {
            formik.setFieldValue('interlocutorId', res.interlocutor.id)
            formik.setFieldValue(
              'interlocutorName',
              `${res.interlocutor.names} ${res.interlocutor.paternal_surname}`
            )
          }
          setCompanyDetails(res)
        }
      )
      dispatch(benefitsActions.getBenefitsForBusiness(selectedCompany.id)).then(
        (res) => {
          setBenefits(
            res.items.map((item) => ({ ...item, startMonth: '', endMonth: '' }))
          )
        }
      )
    }
  }, [selectedCompany])

  useEffect(() => {
    if (formik.values.period && selectedCompany) {
      dispatch(
        scheduleActions.getValidSchedule({
          period: formik.values.period,
          businessId: selectedCompany.id
        })
      )
        .then(() => {
          setPeriodValidation({ error: false, message: '' })
        })
        .catch((err) => {
          toggleOpenInvalid()
          setPeriodValidation({ error: true, message: err })
        })
    }
  }, [formik.values.period, selectedCompany])

  useEffect(() => {
    generateNextPeriods()
    dispatch(users.getBosses()).then((result) => {
      setBosses(result)
    })
  }, [])

  return (
    <Box>
      <Wrapper>
        <Box marginBottom={2}>
          <HeadingWithButton title="Nueva programación" />
        </Box>
        <Box mb={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="Fecha"
                value={formatDate(new Date())}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Jefatura"
                name="bossId"
                onChange={formik.handleChange}
                value={formik.values.bossId}
                onBlur={formik.handleBlur}
                error={formik.touched.bossId && Boolean(formik.errors.bossId)}
                helperText={formik.touched.bossId && formik.errors.bossId}
              >
                <option value="">SELECCIONE JEFATURA</option>
                {bosses.map((item) => (
                  <option value={item.id} key={`boss-option-${item.id}`}>
                    {`${item.names} ${item.paternal_surname}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Periodo"
                required
                name="period"
                onChange={formik.handleChange}
                value={formik.values.period}
                onBlur={formik.handleBlur}
                error={formik.touched.period && Boolean(formik.errors.period)}
                helperText={formik.touched.period && formik.errors.period}
              >
                <option value="">SELECCIONE PERIODO</option>
                {periods.map((item) => (
                  <option value={item} key={`period-option-${item}`}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <SearchCompany
                  onSelected={(value) => {
                    setSelectedCompany(value)
                    formik.setFieldValue('businessId', value.id)
                    formik.setFieldValue('businessName', value.business_name)
                    formik.setFieldValue('businessRut', value.rut)
                  }}
                  onDelete={() => {
                    setSelectedCompany(null)
                    setCompanyDetails(null)
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.section}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.subHeading}>
                Detalles de Empresa
              </Typography>
              {companyDetails && <CompanyCard company={companyDetails} />}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className={classes.subHeading}>
                Detalles de interlocutor
              </Typography>
              <Box>
                {companyDetails && (
                  <Box>
                    <ScheduleContactCard
                      emptyMessage="Esta empresa no tiene interlocutor"
                      contact={companyDetails.interlocutor}
                      onEdit={() => {}}
                      businessId={companyDetails?.id}
                      onSuccessFunction={handleContactChange}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.section}>
          <Typography
            component="div"
            style={{ display: 'flex', fontWeight: 'bold' }}
          >
            Lista de beneficios{' '}
            <Typography
              style={{ marginLeft: '8px', opacity: 0.7, fontWeight: 'bold' }}
              component="p"
            >{`(${benefits.length}) beneficios`}</Typography>
          </Typography>
          <Box>
            <DataTable
              emptyMessage={'Esta empresa no tiene beneficios'}
              data={benefits}
              progressPending={false}
              columns={[
                {
                  name: 'Código',
                  selector: (row) => row.code
                },
                {
                  name: 'Nombre',
                  selector: (row) => row.name
                },
                {
                  name: 'Mes de inicio - Mes de fin',
                  selector: (row) => `${row.startMonth}-${row.endMonth}`
                },
                {
                  name: '',
                  right: true,
                  selector: (row) => (
                    <Box display="flex" alignItems="center">
                      {row.startMonth && row.endMonth ? (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            toggleOpenBenefitEdit()
                            setCurrentBenefit(row)
                          }}
                        >
                          Editar
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            toggleOpenBenefit()
                            setCurrentBenefit(row)
                          }}
                        >
                          Programar
                        </Button>
                      )}
                    </Box>
                  )
                }
              ]}
              pagination
              highlightOnHover
              pointerOnHover
              paginationServer={true}
              paginationRowsPerPageOptions={[30, 40]}
              paginationPerPage={30}
              paginationTotalRows={0}
            />
          </Box>
        </Box>
        <Box textAlign="right">
          <SubmitButton
            disabled={
              !formik.isValid ||
              creating ||
              !benefitsValidation() ||
              periodValidation.error
            }
            startIcon={<SaveIcon />}
            onClick={createSchedule}
            loading={creating}
            success={success}
          >
            Guardar
          </SubmitButton>
        </Box>
        {openBenefit && currentBenefit && (
          <ScheduleBenefitDrawer
            benefit={currentBenefit}
            open={openBenefit}
            onClose={toggleOpenBenefit}
            onSubmit={setSchedule}
          />
        )}
        {openBenefitEdit && currentBenefit && (
          <ScheduleBenefitDrawer
            type="UPDATE"
            data={{
              startMonth: currentBenefit.startMonth,
              endMonth: currentBenefit.endMonth
            }}
            benefit={currentBenefit}
            open={openBenefitEdit}
            onClose={toggleOpenBenefitEdit}
            onSubmit={setSchedule}
          />
        )}
        {periodValidation.error && (
          <ConfirmDelete
            open={openInvalid}
            onClose={toggleOpenInvalid}
            confirmText="Aceptar"
            onConfirm={() => {
              formik.setFieldValue('period', '')
              toggleOpenInvalid()
            }}
            message={
              <Box>Esta empresa ya tiene programacion para este periodo</Box>
            }
          />
        )}
      </Wrapper>
    </Box>
  )
}
export default ListPage
