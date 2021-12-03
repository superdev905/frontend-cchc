import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Checkbox, Grid, makeStyles, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { FiSave as SaveIcon } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import companiesActions from '../../state/actions/companies'
import { ScheduleContactCard } from '../../components/Schedule'
import {
  CompanyRow,
  DataTable,
  HeadingWithButton
} from '../../components/Shared'
import {
  InputLabel,
  SubmitButton,
  TextArea,
  TextField,
  Wrapper
} from '../../components/UI'
import searchWithRut from '../../formatters/searchWithRut'
import { useSuccess, useToggle } from '../../hooks'
import usersActions from '../../state/actions/users'
import CompanyCard from '../../components/Company/CompanyCard'
import AddEmployeeDialog from './Employees/AddDialog'
import EmployeeList from './Employees/List'
import { HouseAddEmployee } from '../../components/Housing'
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
  businessId: Yup.number().required('Seleccione empresa'),
  businessName: Yup.string().required('Seleccione empresa'),
  interlocutorId: Yup.number().required('Seleccione interlocutor'),
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
  const [searchValue, setSearchValue] = useState('')
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companyDetails, setCompanyDetails] = useState(null)
  const [companies, setCompanies] = useState([])
  const [relatedBusinesses, setRelatedBusinesses] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [professionalList, setProfessionalList] = useState([])
  const [loadingCompanies, setLoadingCompanies] = useState([])
  const { open: openAddEmployee, toggleOpen: toggleOpenAddEmployee } =
    useToggle()

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      businessId: '',
      businessName: '',
      interlocutorId: '',
      observations: ''
    }
  })

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

  const createAgreement = () => {
    setLoading(true)
    const createData = {
      ...formik.values,
      date: new Date().toISOString(),
      employees: employeeList.map((item) => ({
        employee_id: item.id,
        fullName: `${item.names} ${item.paternal_surname} ${
          item.maternal_surname || ''
        }`
      })),
      professionals: professionalList
        .filter((item) => item.isSelected)
        .map((item) => ({
          userId: item.id,
          fullName: `${item.names} ${item.paternal_surname} ${
            item.maternal_surname || ''
          }`
        })),
      related_businesses: relatedBusinesses
        .filter((item) => item.isSelected)
        .map((item) => ({
          businessId: item.id,
          businessName: item.business_name
        }))
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
      dispatch(companiesActions.getRelatedCompanies(selectedCompany.id)).then(
        (list) => {
          setRelatedBusinesses(
            list.map((related) => ({ ...related, isSelected: false }))
          )
        }
      )
      dispatch(usersActions.getFoundationUsers({})).then((result) => {
        setProfessionalList(
          result.map((item) => ({ ...item, isSelected: false }))
        )
      })
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
    }
  }, [selectedCompany])

  useEffect(() => {}, [])

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
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Box my={1}>
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
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
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
            Empresas relaciondas
            <Typography
              style={{ marginLeft: '8px', opacity: 0.7, fontWeight: 'bold' }}
              component="p"
            >{`(${
              relatedBusinesses.filter((item) => item.isSelected).length
            }) seleccionados`}</Typography>
          </Typography>

          <Box>
            <DataTable
              emptyMessage={'Esta empresa no empresas relacionadas'}
              data={relatedBusinesses}
              progressPending={false}
              columns={[
                {
                  name: 'Rut',
                  selector: (row) => row.rut
                },
                {
                  name: 'Nombre',
                  selector: (row) => row.business_name
                },
                {
                  name: 'Dirección',
                  selector: (row) => row.address
                },
                {
                  name: '',
                  right: true,
                  selector: (row) => (
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        value={row.isSelected}
                        color="primary"
                        onChange={(e) => {
                          const updatedList = relatedBusinesses.map((item) =>
                            item.id === row.id
                              ? { ...item, isSelected: e.target.checked }
                              : item
                          )
                          setRelatedBusinesses(updatedList)
                        }}
                        inputProps={{ 'aria-label': 'status checkbox' }}
                      />
                    </Box>
                  )
                }
              ]}
              highlightOnHover
              pointerOnHover
            />
          </Box>
        </Box>
        <Box className={classes.section}>
          <EmployeeList
            employees={employeeList}
            onAdd={toggleOpenAddEmployee}
          />
          {openAddEmployee && (
            <AddEmployeeDialog
              open={openAddEmployee}
              onClose={toggleOpenAddEmployee}
            />
          )}
          {openAddEmployee && (
            <HouseAddEmployee
              open={openAddEmployee}
              onClose={toggleOpenAddEmployee}
              submitFunction={(list) => setEmployeeList(list)}
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
            <DataTable
              emptyMessage={'No se agregaron trabajadores'}
              data={professionalList}
              progressPending={false}
              columns={[
                {
                  name: 'Run',
                  selector: (row) => row.run
                },
                {
                  name: 'Nombre',
                  selector: (row) => row.names
                },
                {
                  name: 'Apellidos',
                  selector: (row) => row.paternal_surname
                },
                {
                  name: 'Correo',
                  selector: (row) => row.email
                }
              ]}
              highlightOnHover
              pointerOnHover
            />
          </Box>
        </Box>
        <Box>
          <TextArea
            name="observations"
            value={formik.values.observations}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.observations && Boolean(formik.errors.observations)
            }
            helperText={
              formik.touched.observations && formik.errors.observations
            }
            label="Observaciones"
            maxLength={800}
          ></TextArea>
        </Box>
        <Box textAlign="right">
          <SubmitButton
            disabled={!formik.isValid || loading}
            startIcon={<SaveIcon />}
            onClick={createAgreement}
            loading={loading}
            success={createSuccess}
          >
            Guardar
          </SubmitButton>
        </Box>
      </Wrapper>
    </Box>
  )
}
export default HousingNew
