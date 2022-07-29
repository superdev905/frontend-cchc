import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import {
  Box,
  FormHelperText,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core'
import { FiSave as SaveIcon } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
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
import uiActions from '../../state/actions/ui'
import { useSuccess, useToggle } from '../../hooks'
import users from '../../state/actions/users'
import scheduleActions from '../../state/actions/schedule'
import SearchCompany from '../../components/Companies/SearchCompany'
import CompanyCard from '../../components/Company/CompanyCard'
import { formatDate } from '../../formatters'
import CreateDialog from '../../components/Benefits/Create/CreateDialog'
import { PollsModule } from '../../components/Polls'

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
  interlocutorId: Yup.number().required('Datos de interlocutor vacios'),
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
  const [uncreatedBenefit, setUncreatedBenefit] = useState(null)
  const [bosses, setBosses] = useState([])
  const { open: openInvalid, toggleOpen: toggleOpenInvalid } = useToggle()
  const { open: openBenefit, toggleOpen: toggleOpenBenefit } = useToggle()
  const { open: openBenefitEdit, toggleOpen: toggleOpenBenefitEdit } =
    useToggle()

  const { success, changeSuccess } = useSuccess()

  const { showCreateModal } = useSelector((state) => state.benefits)

  const toggleCreateModal = () => {
    dispatch(benefitsActions.toggleCreateModal(showCreateModal))
  }

  const [listOne, setListOne] = useState([
    {
      area: 'Area caracterización de empresa',
      index: 1,
      name: 'Presentación propuesta de trabajo',
      isCompleted: false,
      startMonth: '',
      endMonth: ''
    },
    {
      area: 'Area caracterización de empresa',
      name: 'Recolección de información pertinente para confeccionar plan',
      index: 2,
      isCompleted: false,
      startMonth: '',
      endMonth: ''
    },
    {
      area: 'Area caracterización de empresa',
      name: 'Reunión de evaluación mensual',
      index: 3,
      isCompleted: false,
      startMonth: '',
      endMonth: ''
    },
    {
      area: 'Area de caracterización y atención social',
      name: 'Atención social de trabajadores en terreno',
      index: 4,
      isCompleted: false,
      startMonth: '',
      endMonth: ''
    },
    {
      area: 'Area de caracterización y atención social',
      name: 'Charlas de servicio social',
      index: 5,
      isCompleted: false,
      startMonth: '',
      endMonth: ''
    },
    {
      area: 'Area de caracterización y atención social',
      name: 'Charla se seguro de cesantía',
      index: 6,
      isCompleted: false,
      startMonth: '',
      endMonth: ''
    }
  ])

  const [columns] = useState([
    {
      name: 'Código',
      selector: (row) => row.code,
      width: '150px'
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
  ])

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

  const validInitialBenefits = () =>
    listOne.filter((item) => !item.isCompleted).length > 0

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
      formik.setFieldValue('interlocutorId', contact.id)
      formik.setFieldValue(
        'interlocutorName',
        `${contact.full_name} ${contact.paternal_surname}`
      )
    }
    setCompanyDetails({
      ...companyDetails,
      interlocutor: contact.is_interlocutor ? contact : null
    })
  }

  const getBenefits = () => {
    dispatch(benefitsActions.getBenefitsForBusiness(selectedCompany.id)).then(
      (res) => {
        setBenefits(
          res.items.map((item) => ({ ...item, startMonth: '', endMonth: '' }))
        )
        res.items.forEach((item) => {
          const initialBenefit = listOne.find(
            (benefit) => benefit.name.toUpperCase() === item.name.toUpperCase()
          )
          if (initialBenefit) {
            setListOne(
              listOne.map((benefit) =>
                benefit.name === item.name
                  ? { ...benefit, isCompleted: true }
                  : benefit
              )
            )
          }
        })
      }
    )
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
      getBenefits()
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
    dispatch(uiActions.setCurrentModule('PROGRAMACIÓN'))
  }, [])

  return (
    <Box>
      <Wrapper>
        <Box marginBottom={2}>
          <HeadingWithButton title="Nueva programación" />
        </Box>
        <Box px={1}>
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
                      {formik.errors.interlocutorId && (
                        <FormHelperText error>
                          {formik.errors.interlocutorId}
                        </FormHelperText>
                      )}
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.section}>
            <Box py={1}>
              <Typography>Beneficios iniciales</Typography>
              <DataTable
                emptyMessage={'Esta empresa no tiene beneficios'}
                data={listOne}
                columns={[
                  {
                    name: 'Área',
                    selector: (row) => row.area
                  },
                  {
                    name: 'Nombre',
                    selector: (row) => row.name
                  },
                  {
                    right: true,
                    selector: (row) => (
                      <Button
                        disabled={row.isCompleted}
                        size="small"
                        onClick={() => {
                          setUncreatedBenefit(row)
                          toggleCreateModal()
                        }}
                      >
                        Crear beneficio
                      </Button>
                    )
                  }
                ]}
                pagination
                highlightOnHover
                pointerOnHover
              />
            </Box>
            <Box>
              <Typography
                component="div"
                style={{ display: 'flex', fontWeight: 'bold' }}
              >
                Lista de beneficios{' '}
                <Typography
                  style={{
                    marginLeft: '8px',
                    opacity: 0.7,
                    fontWeight: 'bold'
                  }}
                  component="p"
                >{`(${benefits.length}) beneficios`}</Typography>
              </Typography>
              <DataTable
                emptyMessage={'Esta empresa no tiene beneficios'}
                data={benefits}
                progressPending={false}
                columns={columns}
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
            <PollsModule />
            <SubmitButton
              disabled={
                !formik.isValid ||
                creating ||
                !benefitsValidation() ||
                periodValidation.error ||
                validInitialBenefits()
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
        </Box>
        {uncreatedBenefit && (
          <CreateDialog
            benefitName={uncreatedBenefit.name}
            open={showCreateModal}
            onClose={toggleCreateModal}
            successFunction={() => {
              const updatedList = listOne.map((item) =>
                item.index === uncreatedBenefit.index
                  ? { ...item, isCompleted: true }
                  : item
              )
              setListOne(updatedList)
              setUncreatedBenefit(null)
              getBenefits()
            }}
          />
        )}
      </Wrapper>
    </Box>
  )
}
export default ListPage
