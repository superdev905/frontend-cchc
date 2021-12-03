import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { FiSave as SaveIcon } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import companiesActions from '../../state/actions/companies'
import {
  ScheduleBenefitDrawer,
  ScheduleContactCard
} from '../../components/Schedule'
import {
  CompanyRow,
  DataTable,
  HeadingWithButton
} from '../../components/Shared'

import {
  Button,
  InputLabel,
  LabeledRow,
  Select,
  SubmitButton,
  TextField,
  Wrapper
} from '../../components/UI'
import searchWithRut from '../../formatters/searchWithRut'
import benefitsActions from '../../state/actions/benefits'
import { useToggle } from '../../hooks'
import users from '../../state/actions/users'
import scheduleActions from '../../state/actions/schedule'

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
  const [searchValue, setSearchValue] = useState('')
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companyDetails, setCompanyDetails] = useState(null)
  const [companies, setCompanies] = useState([])
  const [benefits, setBenefits] = useState([])
  const [loadingCompanies, setLoadingCompanies] = useState([])
  const [currentBenefit, setCurrentBenefit] = useState(null)
  const [bosses, setBosses] = useState([])
  const { open: openBenefit, toggleOpen: toggleOpenBenefit } = useToggle()
  const { open: openBenefitEdit, toggleOpen: toggleOpenBenefitEdit } =
    useToggle()

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      businessId: '',
      businessName: '',
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

  const onCompanySelect = (__, e) => {
    setSelectedCompany(e)
    formik.setFieldValue('businessId', e.id)
    formik.setFieldValue('businessName', e.business_name)
  }
  const searchCompanies = (e) => {
    setSearchValue(searchWithRut(e.target.value))
    setLoadingCompanies(true)
    dispatch(
      companiesActions.getCompanies(
        { state: 'CREATED', search: searchWithRut(e.target.value) },
        false
      )
    ).then((list) => {
      setLoadingCompanies(false)
      setCompanies(list)
    })
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
        enqueueSnackbar('Porgreamación creada', { variant: 'success' })
        setCreating(false)
        history.push(`/schedule/${res.id}`)
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
        setCreating(false)
      })
  }

  const benefitsValidation = () =>
    benefits.filter((item) => !item.startMonth || !item.endMonth).length === 0

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
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {selectedCompany ? (
                <Box>
                  <InputLabel>Empresa </InputLabel>
                  <CompanyRow
                    company={selectedCompany}
                    onDelete={() => {
                      setSelectedCompany(null)
                      setCompanyDetails(null)
                    }}
                  />
                </Box>
              ) : (
                <Autocomplete
                  options={companies}
                  // value={selectedCompany || searchValue}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.rut || ''}
                  onChange={onCompanySelect}
                  renderOption={(option) =>
                    loadingCompanies ? (
                      <Box>loading</Box>
                    ) : (
                      <CompanyRow.Autocomplete company={option} />
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={searchValue}
                      onChange={searchCompanies}
                      label="Selecciona empresa"
                      placeholder="Rut"
                    />
                  )}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
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
            <Grid item xs={12} md={6} lg={3}>
              <Select
                label="Periodo"
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
          </Grid>
        </Box>
        <Box className={classes.section}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.subHeading}>
                Detalles de Empresa
              </Typography>
              <Box>
                <LabeledRow label="Rut: ">{companyDetails?.rut}</LabeledRow>
                <LabeledRow label="Razón social: ">
                  {companyDetails?.business_name}
                </LabeledRow>
                <LabeledRow label="Dirección: ">
                  {companyDetails?.address}
                </LabeledRow>
                <LabeledRow label="Region: ">
                  {companyDetails?.region?.name}
                </LabeledRow>
                <LabeledRow label="Comuna: ">
                  {companyDetails?.commune?.name}
                </LabeledRow>
                <LabeledRow label="Tipo: ">{companyDetails?.type}</LabeledRow>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className={classes.subHeading}>
                Detalles de interlocutor
              </Typography>
              <Box>
                {companyDetails?.interlocutor && (
                  <ScheduleContactCard
                    contact={companyDetails.interlocutor}
                    onEdit={() => {}}
                  />
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
            disabled={!formik.isValid || creating || !benefitsValidation()}
            startIcon={<SaveIcon />}
            onClick={createSchedule}
            loading={creating}
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
      </Wrapper>
    </Box>
  )
}
export default ListPage
