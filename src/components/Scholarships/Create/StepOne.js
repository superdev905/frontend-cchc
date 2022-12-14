import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import commonActions from '../../../state/actions/common'
import companiesActions from '../../../state/actions/companies'
import employeeActions from '../../../state/actions/employees'
import { EmptyState, Select, TextField } from '../../UI'
import useStyles from './styles'
import Actions from '../../Companies/Create/Actions'
import scholarshipsActions from '../../../state/actions/scholarships'
import generateColor from '../../../utils/generateColor'
import EmployeeRow from './EmployeeRow'
import RowAutocomplete from './RowAutocomplete'
import { formatSearchWithRut } from '../../../formatters'
import { CompanyRow, CurrencyTextField, DatePicker } from '../../Shared'
import validationSchema from './schemas'
import constructionActions from '../../../state/actions/constructions'

const StepOne = ({ onClose, data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { regions } = useSelector((state) => state.common)
  const { create, scholarshipType, careers } = useSelector(
    (state) => state.scholarships
  )
  const [communes, setCommunes] = useState([])
  const [companies, setCompanies] = useState([])
  const [searchRut, setSearchRut] = useState('')
  const [searchCompany, setSearchCompany] = useState('')
  const [searchList, setSearchList] = useState([])
  const [beneficiaryList, setBeneficiaryList] = useState([])
  const [relatedList, setRelatedList] = useState([])
  const [selectedCompany, setSelectedCompany] = useState(
    create?.company || null
  )
  const [selectedRelated, setSelectedRelated] = useState(
    create?.relatedCompany || null
  )
  const [selectedEmployee, setSelectedEmployee] = useState(
    create?.employee || null
  )
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(
    create?.beneficiary || null
  )
  const [selectedConstruction, setSelectedConstruction] = useState(
    create?.construction || null
  )

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      scholarshipId: create?.application?.scholarshipId || '',
      startDate: create?.benefit?.startDate || '',
      endDate: create?.benefit?.endDate || '',
      date: create?.application?.date || '',
      employeeNames: create?.application?.employeeNames || '',
      employeeRut: create?.application?.employeeRut || '',
      employeeId: create?.application?.employeeId || '',
      businessName: create?.application?.businessName || '',
      businessRut: create?.application?.businessRut || '',
      businessId: create?.application?.businessId || '',
      constructionId: create?.application?.constructionId || '',
      constructionName: create?.application?.constructionName || '',
      businessRelatedName: create?.application?.businessRelatedName || '',
      businessRelatedRut: create?.application?.businessRelatedRut || '',
      businessRelatedId: create?.application?.businessRelatedId || '',
      beneficiaryNames: create?.application?.beneficiaryNames || '',
      beneficiaryRut: create?.application?.beneficiaryRut || '',
      beneficiaryId: create?.application?.beneficiaryId || '',
      beneficiaryIsRelative: create?.application?.beneficiaryIsRelative || '',
      careerId: create?.application?.careerId || '',
      schoolName: create?.application?.schoolName || '',
      schoolRegion: create?.application?.schoolRegion || '',
      schoolCommune: create?.application?.schoolCommune || '',
      psuScore: create?.application?.psuScore || '',
      nemScore: create?.application?.nemScore || '',
      employeeSalary: create?.application?.salary || '',
      employeeSeniority: create?.application?.employeeSeniority || '',
      careerDuration: create?.application?.careerDuration || ''
    },

    onSubmit: (values) => {
      dispatch(
        scholarshipsActions.updateCreate({
          ...create,
          company: selectedCompany,
          employee: selectedEmployee,
          beneficiary: selectedBeneficiary,
          relatedCompany: selectedRelated,
          construction: selectedConstruction,
          application: { ...create.application, ...values },
          step: create.step + 1
        })
      )
    }
  })

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'schoolRegion': {
        const schoolRegion = regions.find(
          (item) => item.id === parseInt(value, 10)
        )
        setCommunes(schoolRegion.communes)
        formik.setFieldValue('schoolRegion', schoolRegion.id)
        break
      }
      case 'schoolCommune': {
        const schoolCommune = communes.find(
          (item) => item.id === parseInt(value, 10)
        )
        formik.setFieldValue('schoolCommune', schoolCommune.id)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  useEffect(() => {
    if (formik.values.schoolRegion && regions.length > 0) {
      handleSelectChange({
        target: { name: 'schoolRegion', value: formik.values.schoolRegion }
      })
    }
  }, [formik.values.schoolRegion, regions])

  useEffect(() => {
    if (create.type !== 'CREATE' && companies.length > 0) {
      const targetCompany = companies.find(
        (item) => item.rut === formik.values.businessRut
      )
      setSelectedCompany(targetCompany)
    }
  }, [create.type, formik.values.businessRut, companies])

  useEffect(() => {
    if (data) {
      dispatch(
        scholarshipsActions.updateCreate({
          ...create,
          ...data
        })
      )
    }
  }, [data])

  const fetchBeneficiaryList = () => {
    dispatch(
      employeeActions.getEmployeeRelatives({
        employee_run: selectedEmployee.run,
        state: 'CREATED'
      })
    ).then((result) => {
      setBeneficiaryList(
        [{ ...selectedEmployee, isRelative: false }]
          .concat(result.map((item) => ({ ...item, isRelative: true })))
          .map((item) => ({
            ...item,
            avatarBg: generateColor()
          }))
      )
    })
  }

  const fetchCompanies = () => {
    dispatch(
      companiesActions.getCompanies(
        { state: 'CREATED', search: searchCompany },
        false
      )
    ).then((list) => {
      setCompanies(list)
    })
  }
  const fetchRelatedCompanies = () => {
    dispatch(companiesActions.getRelatedCompanies(selectedCompany.id)).then(
      (list) => {
        setRelatedList(list)
      }
    )
  }

  const changeCompany = (value) => {
    setSelectedCompany(value)
    setSelectedRelated(null)
  }

  useEffect(() => {
    if (create.type === 'UPDATE') {
      dispatch(
        constructionActions.getConstruction(
          create.application.constructionId,
          false
        )
      ).then((res) => {
        setSelectedConstruction(res)
      })
      dispatch(
        employeeActions.getEmployeeDetails(create.application.employeeId, false)
      ).then((res) => {
        setSelectedEmployee(res)
      })
      dispatch(
        companiesActions.getCompany(create.application.businessId, false)
      ).then((res) => {
        setSelectedCompany(res)
      })
      if (create.application.businessRelatedId) {
        dispatch(
          companiesActions.getCompany(create.application.businessId, false)
        ).then((res) => {
          setSelectedRelated(res)
        })
      }
      if (create.application.beneficiaryIsRelative) {
        dispatch(
          employeeActions.getEmployeeRelative(create.application.beneficiaryId)
        ).then((res) => {
          setSelectedBeneficiary({ ...res, isRelative: true })
        })
      } else {
        dispatch(
          employeeActions.getEmployeeDetails(
            create.application.employeeId,
            false
          )
        ).then((res) => {
          setSelectedBeneficiary({ ...res, isRelative: false })
        })
      }
    }
  }, [create.type])

  useEffect(() => {
    if (selectedEmployee) {
      formik.setFieldValue(
        'employeeNames',
        `${selectedEmployee.names} ${selectedEmployee.paternal_surname} ${selectedEmployee?.maternal_surname}`
      )
      formik.setFieldValue('employeeRut', selectedEmployee.run)
      formik.setFieldValue('employeeId', selectedEmployee.id)
      fetchBeneficiaryList()
    }
  }, [selectedEmployee])

  useEffect(() => {
    if (selectedRelated) {
      formik.setFieldValue('businessRelatedName', selectedRelated.business_name)
      formik.setFieldValue('businessRelatedRut', selectedRelated.rut)
      formik.setFieldValue('businessRelatedId', selectedRelated.id)
    }
  }, [selectedRelated])

  useEffect(() => {
    if (searchCompany) {
      fetchCompanies()
    } else {
      setCompanies([])
    }
  }, [searchCompany])

  useEffect(() => {
    if (selectedConstruction) {
      formik.setFieldValue('constructionName', selectedConstruction?.name)
      formik.setFieldValue('constructionId', selectedConstruction?.id)
      fetchRelatedCompanies()
    } else {
      setRelatedList([])
      formik.setFieldValue('constructionName', '')
      formik.setFieldValue('constructionId', '')
    }
  }, [selectedConstruction])

  useEffect(() => {
    if (selectedCompany) {
      formik.setFieldValue('businessName', selectedCompany?.business_name)
      formik.setFieldValue('businessRut', selectedCompany?.rut)
      formik.setFieldValue('businessId', selectedCompany?.id)
      fetchRelatedCompanies()
    } else {
      setRelatedList([])
      formik.setFieldValue('businessName', '')
      formik.setFieldValue('businessRut', '')
      formik.setFieldValue('businessId', '')
    }
  }, [selectedCompany])

  useEffect(() => {
    if (selectedBeneficiary) {
      formik.setFieldValue(
        'beneficiaryNames',
        `${selectedBeneficiary.names} ${selectedBeneficiary.paternal_surname} ${selectedBeneficiary?.maternal_surname}`
      )
      formik.setFieldValue('beneficiaryRut', selectedBeneficiary.run)
      formik.setFieldValue('beneficiaryId', selectedBeneficiary.id)
      formik.setFieldValue(
        'beneficiaryIsRelative',
        selectedBeneficiary.isRelative
      )
    }
  }, [selectedBeneficiary])

  useEffect(() => {
    if (searchRut) {
      dispatch(
        employeeActions.getEmployees(
          { state: 'CREATED', search: searchRut },
          false
        )
      ).then((list) => {
        setSearchList(
          list.map((item) => ({ ...item, avatarBg: generateColor() }))
        )
      })
    } else {
      setSearchList([])
    }
  }, [searchRut])

  useEffect(() => {
    dispatch(commonActions.getRegions())
    dispatch(scholarshipsActions.getScholarshipTypes())
    dispatch(scholarshipsActions.getCareers())
  }, [])

  return (
    <Box className={classes.form}>
      <Box>
        <Typography align="center" className={classes.subtitle}>
          Postulaci??n a beca
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              label="Beca"
              name="scholarshipId"
              value={formik.values.scholarshipId}
              required
              onChange={formik.handleChange}
            >
              <option value="">SELECCIONE BECA</option>
              {scholarshipType.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              required
              label="Fecha de inicio"
              disabledFuture={false}
              value={formik.values.startDate}
              helperText={formik.touched.startDate && formik.errors.startDate}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              onChange={(date) => {
                formik.setFieldTouched('startDate')
                formik.setFieldValue('startDate', date)
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              required
              label="Fecha de termino"
              minDate={formik.values.startDate}
              disabledPast
              disabledFuture={false}
              value={formik.values.endDate}
              helperText={formik.touched.endDate && formik.errors.endDate}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              onChange={(date) => {
                formik.setFieldTouched('endDate')
                formik.setFieldValue('endDate', date)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 10 }}
            >
              Detalles de empresa
            </Typography>
            <Box>
              {selectedCompany ? (
                <Box>
                  <Typography>Empresa</Typography>
                  <CompanyRow
                    company={selectedCompany}
                    onDelete={() => changeCompany(null)}
                  />
                </Box>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Rut de empresa"
                      value={searchCompany}
                      onChange={(e) => {
                        setSearchCompany(formatSearchWithRut(e.target.value))
                        formik.setFieldValue('businessRut', e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Select
                      label="Selecciona Empresa"
                      name="businessName"
                      value={formik.values.businessName}
                      onChange={formik.handleChange}
                      error={Boolean(formik.errors.businessName)}
                      helperText={formik.errors.businessName}
                    >
                      <option value="">Seleccione Empresa</option>
                      {companies.map((item) => (
                        <option
                          key={`business-name-${item.id}`}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    {companies.length === 0 ? (
                      <>
                        {searchCompany ? (
                          <TextField
                            label="Nombre empresa"
                            value={formik.values.businessName}
                            onChange={(e) => {
                              formik.setFieldValue(
                                'businessName',
                                e.target.value
                              )
                              formik.setFieldValue('businessId', 0)
                              formik.setFieldValue(
                                'constructionName',
                                'Empresa no registrada'
                              )
                              formik.setFieldValue('constructionId', 0)
                            }}
                          />
                        ) : (
                          <EmptyState
                            message={'Ingrese el rut de la empresa'}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {companies.map((item) => (
                          <CompanyRow
                            selectable
                            company={item}
                            key={`company-card-${item.id}`}
                            onSelect={() => changeCompany(item)}
                          />
                        ))}
                      </>
                    )}
                  </Grid>
                </Grid>
              )}
            </Box>
            <Box>
              <Box>
                <Typography>Empresa relacionada</Typography>
                {selectedRelated ? (
                  <CompanyRow
                    company={selectedRelated}
                    onDelete={() => setSelectedRelated(null)}
                    iconColor="#BD52F2"
                  />
                ) : (
                  <>
                    <Autocomplete
                      required
                      options={relatedList}
                      value={''}
                      getOptionLabel={(option) => option.business_name || ''}
                      onChange={(__, option) => {
                        setSelectedRelated(option)
                      }}
                      renderOption={(option) => (
                        <CompanyRow.Autocomplete
                          company={option}
                          iconColor="#BD52F2"
                        />
                      )}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </>
                )}
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography>Obra</Typography>
                {selectedConstruction ? (
                  <CompanyRow
                    type={'CONSTRUCTION'}
                    company={selectedConstruction}
                    onDelete={() => setSelectedConstruction(null)}
                    iconColor="#BD52F2"
                  />
                ) : (
                  <>
                    <Autocomplete
                      options={selectedCompany?.constructions || []}
                      value={''}
                      getOptionLabel={(option) => option.name || ''}
                      onChange={(__, option) => {
                        setSelectedConstruction(option)
                      }}
                      renderOption={(option) => (
                        <CompanyRow.Autocomplete
                          type="CONSTRUCTION"
                          company={option}
                          iconColor="#BD52F2"
                        />
                      )}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 10 }}
            >
              Detalles de trabajador y beneficiario
            </Typography>
            <Box>
              {selectedEmployee ? (
                <Box>
                  <Typography>Trabajador</Typography>
                  <EmployeeRow
                    option={selectedEmployee}
                    onDelete={() => {
                      setSelectedEmployee(null)
                      setSelectedBeneficiary(null)
                    }}
                  />
                </Box>
              ) : (
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Rut de trabajador"
                      value={searchRut}
                      onChange={(e) => {
                        setSearchRut(formatSearchWithRut(e.target.value))
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {searchList.length === 0 ? (
                      <>
                        <EmptyState
                          message={`${
                            searchRut
                              ? `No se encontraron resultados para: ${searchRut}`
                              : 'Ingrese el rut del trabajador'
                          }`}
                        />
                      </>
                    ) : (
                      <>
                        {searchList.map((item) => (
                          <EmployeeRow
                            selectable
                            option={item}
                            onClick={() => {
                              setSelectedEmployee(item)
                            }}
                          />
                        ))}
                      </>
                    )}
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography>Beneficario</Typography>
              {selectedBeneficiary ? (
                <EmployeeRow
                  option={selectedBeneficiary}
                  onDelete={() => setSelectedBeneficiary(null)}
                />
              ) : (
                <Autocomplete
                  required
                  options={beneficiaryList}
                  value={''}
                  getOptionLabel={(option) => option.names || ''}
                  onChange={(__, option) => {
                    setSelectedBeneficiary(option)
                  }}
                  required
                  renderOption={(option) => <RowAutocomplete option={option} />}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <CurrencyTextField
              label="Renta del trabajador"
              name="employeeSalary"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.employeeSalary}
              helperText={
                formik.touched.employeeSalary && formik.errors.employeeSalary
              }
              error={
                formik.touched.employeeSalary &&
                Boolean(formik.errors.employeeSalary)
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Antiguedad del trabajador (en a??os)"
              placeholder={'Ejemplo: 1 '}
              name="employeeSeniority"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.employeeSeniority}
              helperText={
                formik.touched.employeeSeniority &&
                formik.errors.employeeSeniority
              }
              error={
                formik.touched.employeeSeniority &&
                Boolean(formik.errors.employeeSeniority)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 10 }}
            >
              Detalles Acad??micos
            </Typography>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Select
                    label="Carrera"
                    name="careerId"
                    value={formik.values.careerId}
                    required
                    onChange={formik.handleChange}
                  >
                    <option value="">SELECCIONE CARRERA</option>
                    {careers.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    label="Nombre de instituci??n o colegio"
                    name="schoolName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.schoolName}
                    helperText={
                      formik.touched.schoolName && formik.errors.schoolName
                    }
                    error={
                      formik.touched.schoolName &&
                      Boolean(formik.errors.schoolName)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="A??os de Carrera"
                    name="careerDuration"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.careerDuration}
                    helperText={
                      formik.touched.careerDuration &&
                      formik.errors.careerDuration
                    }
                    error={
                      formik.touched.careerDuration &&
                      Boolean(formik.errors.careerDuration)
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Select
                    label="Regi??n"
                    name="schoolRegion"
                    value={formik.values.schoolRegion}
                    required
                    onChange={handleSelectChange}
                  >
                    <option value={`INVALID`}>
                      Seleccione regi??n de instituci??n
                    </option>
                    {regions.map((item, index) => (
                      <option
                        key={`schoolRegion--${index}`}
                        value={`${item.id}`}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Select
                    label="Comuna"
                    name="schoolCommune"
                    value={formik.values.schoolCommune}
                    required
                    onChange={handleSelectChange}
                  >
                    <option value={`INVALID`}>Seleccione una comuna</option>
                    {communes?.map((item, index) => (
                      <option
                        key={`schoolRegion--${index}`}
                        value={`${item.id}`}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    label="Puntaje PTU"
                    name="psuScore"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.psuScore}
                    helperText={
                      formik.touched.psuScore && formik.errors.psuScore
                    }
                    error={
                      formik.touched.psuScore && Boolean(formik.errors.psuScore)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="NEM"
                    name="nemScore"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nemScore}
                    helperText={
                      formik.touched.nemScore && formik.errors.nemScore
                    }
                    error={
                      formik.touched.nemScore && Boolean(formik.errors.nemScore)
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Actions
        showBackIcon={false}
        handleBack={onClose}
        backText="Cancelar"
        disabledNext={formik.isValid}
        handleNext={formik.handleSubmit}
      />
    </Box>
  )
}

export default StepOne
