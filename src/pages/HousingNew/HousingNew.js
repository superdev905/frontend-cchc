import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { FiSave as SaveIcon } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import companiesActions from '../../state/actions/companies'
import { ScheduleContactCard } from '../../components/Schedule'
import { HeadingWithButton } from '../../components/Shared'
import { SubmitButton, TextArea, TextField, Wrapper } from '../../components/UI'
import { useSuccess, useToggle } from '../../hooks'
import usersActions from '../../state/actions/users'
import CompanyCard from '../../components/Company/CompanyCard'
import SearchCompany from '../../components/Companies/SearchCompany'
import EmployeeList from './Employees/List'
import {
  HouseAddEmployee,
  HouseRelatedBusiness
} from '../../components/Housing'
import housingActions from '../../state/actions/housing'

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
  number: Yup.string().required('Seleccione empresa'),
  businessId: Yup.number().required('Seleccione empresa'),
  businessName: Yup.string().required('Seleccione empresa'),
  observations: Yup.string().required('Ingrese observaciones')
})

const HousingNew = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const { sucess: createSuccess, changeSuccess: changeCreateSuccess } =
    useSuccess()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companyDetails, setCompanyDetails] = useState(null)
  const [relatedBusinesses, setRelatedBusinesses] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [professionalList, setProfessionalList] = useState([])
  const [users, setUsers] = useState([])
  const { open: openAddEmployee, toggleOpen: toggleOpenAddEmployee } =
    useToggle()

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      number: '',
      businessId: '',
      businessName: ''
    }
  })

  const createAgreement = () => {
    setLoading(true)
    const createData = {
      ...formik.values,
      date: new Date().toISOString(),
      annexed: {
        observations: formik.values.observations,
        employees: employeeList.map((item) => ({
          employeeId: item.id,
          employeeRut: item.run,
          fullName: `${item.names} ${item.paternal_surname} ${
            item.maternal_surname || ''
          }`
        })),
        professionals: users.map((item) => ({
          userId: item.id,
          fullName: `${item.names} ${item.paternal_surname} ${
            item.maternal_surname || ''
          }`
        })),
        related_businesses: relatedBusinesses.map((item) => ({
          businessId: item.id,
          businessName: item.business_name,
          businessRut: item.rut
        }))
      }
    }
    dispatch(housingActions.createAgreement(createData))
      .then((res) => {
        setLoading(false)
        changeCreateSuccess(true, () => {
          enqueueSnackbar('Convenio creado', { variant: 'success' })
          history.push(`/agreement/${res.id}`)
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
        setLoading(false)
      })
  }

  useEffect(() => {
    if (selectedCompany) {
      dispatch(usersActions.getFoundationUsers({})).then((result) => {
        setProfessionalList(
          result.map((item) => ({ ...item, isSelected: false }))
        )
      })
      dispatch(companiesActions.getCompany(selectedCompany.id, false)).then(
        (res) => {
          setCompanyDetails(res)
        }
      )
    }
  }, [selectedCompany])

  return (
    <Box>
      <Wrapper>
        <Box marginBottom={2}>
          <HeadingWithButton
            title={`Nuevo convenio`}
            goBack={() => {
              history.goBack()
            }}
          />
        </Box>
        <Box px={1}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Box>
                  <SearchCompany
                    onSelected={(value) => {
                      setSelectedCompany(value)
                      formik.setFieldValue('businessId', value.id)
                      formik.setFieldValue('businessName', value.business_name)
                      formik.setFieldValue('number', value.rut)
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
                <CompanyCard company={companyDetails} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography className={classes.subHeading}>
                  Detalles de interlocutor
                </Typography>
                <Box>
                  {companyDetails && (
                    <ScheduleContactCard
                      emptyMessage="Esta empresa no tiene interlocutor"
                      contact={companyDetails?.interlocutor}
                      onEdit={() => {}}
                      businessId={companyDetails?.id}
                      onSuccessFunction={(contact) => {
                        setCompanyDetails({
                          ...companyDetails,
                          interlocutor: contact.is_interlocutor ? contact : null
                        })
                      }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.section}>
            <HouseRelatedBusiness
              list={relatedBusinesses}
              onAdd={(company) => {
                if (selectedCompany.id === company.id) {
                  enqueueSnackbar(
                    'No puedes seleccionar la empresa de convenido como empresa relacionada',
                    {
                      variant: 'error'
                    }
                  )
                } else {
                  const foundCompany = relatedBusinesses.find(
                    (item) => item.id === company.id
                  )
                  if (!foundCompany) {
                    const updatedList = [...relatedBusinesses]
                    updatedList.push(company)
                    setRelatedBusinesses(updatedList)
                  } else {
                    enqueueSnackbar('Esta empresa ya esta agregada', {
                      variant: 'error'
                    })
                  }
                }
              }}
              onDelete={(company) => {
                const updatedList = relatedBusinesses.filter(
                  (item) => item.id !== company.id
                )
                setRelatedBusinesses(updatedList)
              }}
            />
          </Box>
          <Box className={classes.section}>
            <EmployeeList
              employees={employeeList}
              onAdd={toggleOpenAddEmployee}
              onDelete={(employee) => {
                const updatedList = employeeList.filter(
                  (item) => item.id !== employee.id
                )
                setEmployeeList(updatedList)
              }}
            />
            {openAddEmployee && (
              <HouseAddEmployee
                open={openAddEmployee}
                onClose={toggleOpenAddEmployee}
                submitFunction={(list) => setEmployeeList(list)}
                onAdd={(employee) => {
                  const foundEmployee = employeeList.find(
                    (item) => item.id === employee.id
                  )
                  if (!foundEmployee) {
                    const updatedList = [...employeeList]
                    updatedList.push(employee)
                    setEmployeeList(updatedList)
                  } else {
                    enqueueSnackbar('Este trabajador ya fue agregado', {
                      variant: 'error'
                    })
                  }
                }}
              />
            )}
          </Box>
          <Box className={classes.section}>
            <Typography
              component="div"
              style={{ display: 'flex', fontWeight: 'bold' }}
            >
              Profesionales relaciondas
            </Typography>

            <Box>
              <Autocomplete
                multiple
                filterSelectedOptions
                id="professionals"
                options={professionalList}
                value={users}
                onChange={(__, values) => {
                  setUsers(values)
                }}
                getOptionLabel={(option) => option.names || ''}
                renderOption={(values) => (
                  <Box>
                    <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
                      {`Nombre:  ${values.names} ${values.paternal_surname}`.toLocaleUpperCase()}
                    </Typography>
                    <Typography
                      style={{ fontSize: 15, textTransform: 'capitalize' }}
                    >
                      Cargo: {values.charge_name || ''}{' '}
                    </Typography>
                  </Box>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={`${option.names} ${option.paternal_surname}-${
                        option.charge_name || ''
                      }`.toUpperCase()}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Seleccione profesionales"
                  />
                )}
              />
            </Box>
          </Box>
          <Box>
            <TextArea
              required
              name="observations"
              value={formik.values.observations}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.observations)}
              helperText={formik.errors.observations}
              label="Observaciones"
              maxLength={800}
            ></TextArea>
          </Box>
          <Box textAlign="right">
            <SubmitButton
              disabled={!formik.isValid || loading || employeeList.length === 0}
              startIcon={<SaveIcon />}
              onClick={createAgreement}
              loading={loading}
              success={createSuccess}
            >
              Guardar
            </SubmitButton>
          </Box>
        </Box>
      </Wrapper>
    </Box>
  )
}
export default HousingNew
