import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import commonActions from '../../state/actions/common'
import companiesActions from '../../state/actions/companies'
import pollActions from '../../state/actions/poll'
import { Button, RutTextField, Select, SubmitButton, TextField } from '../UI'
import { DatePicker, Map, AddressAutoComplete, Dialog } from '../Shared'
import { SantiagoDefaultLocation as location } from '../../config'
import { useSuccess, useToggle } from '../../hooks'
import FacturationModal from '../Companies/Create/ParentBusiness'
import { buildTreeData, searchFromTree } from '../../utils/buildTreeData'
import { PollsModule } from '../Polls'
import { isPollListAnswered } from '../../validations'
import Can from '../Can'

const businessSchema = Yup.object({
  business_selected_id: Yup.number().required('Seleccione empresa')
})

const validationSchema = Yup.object({
  name: Yup.string().required('Ingrese nombre de empresa'),
  address: Yup.string().required('Ingrese dirección'),
  commune_id: Yup.string().required('Seleccione comuna'),
  region_id: Yup.number().required('Seleccione región'),
  status: Yup.string().required('Seleccione estado'),
  typology_id: Yup.number().nullable(),
  economic_sector_id: Yup.number().required('Seleccione sector economico'),
  end_date: Yup.date().nullable(),
  longitude: Yup.string().nullable(),
  latitude: Yup.string().nullable(),
  billing_business_id: Yup.number().required('Seleccione empresa')
})

const ConstructionModal = ({
  open,
  selectClient,
  onClose,
  type,
  construction,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { idCompany } = useParams()
  const [treeData, setTreeData] = useState([])
  const [communes, setCommunes] = useState([])
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companyBill, setCompanyBill] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { open: openFact, toggleOpen: toggleOpenFact } = useToggle()
  const { isMobile, module: currentModule } = useSelector((state) => state.ui)
  const { moduleResponse } = useSelector((state) => state.poll)

  const {
    regions,
    constructionTypologies: typologies,
    economicSectors: sectors
  } = useSelector((state) => state.common)

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validateOnBlur: true,
    validationSchema: selectClient
      ? businessSchema.concat(validationSchema)
      : validationSchema,
    initialValues: {
      business_selected_id: '',
      name: type === 'UPDATE' ? construction.name : '',
      address: type === 'UPDATE' ? construction.address : '',
      commune_id: type === 'UPDATE' ? construction.commune_id : '',
      region_id: type === 'UPDATE' ? construction.region_id : '',
      status: type === 'UPDATE' ? construction.status : 'VIGENTE',
      typology_id: type === 'UPDATE' ? construction.typology_id : '',
      economic_sector_id:
        type === 'UPDATE' ? construction.economic_sector_id : '',
      end_date: type === 'UPDATE' ? construction.end_date : null,
      latitude:
        type === 'UPDATE'
          ? parseFloat(construction.latitude)
          : location.latitude,
      longitude:
        type === 'UPDATE'
          ? parseFloat(construction.longitude)
          : location.longitude,
      billing_business_id:
        type === 'UPDATE' ? construction?.billing_business_id : ''
    },
    onSubmit: (values, { resetForm }) => {
      const data = {
        ...values,
        name: values.name.toUpperCase(),
        address: values.address.toUpperCase()
      }
      if (selectClient) {
        data.business_id = parseInt(values.business_selected_id, 10)
      }
      submitFunction(data)
        .then((result) => {
          if (type === 'CREATE' && moduleResponse.pollStatus.length > 0) {
            moduleResponse.pollStatus.forEach((item) => {
              dispatch(
                pollActions.updateResponse(item.responseId, {
                  source_module: currentModule,
                  related_data: `${values.name}`,
                  related_data_id: result.id
                })
              )
            })
          }
          formik.setSubmitting(false)
          changeSuccess(true)
          if (successFunction) {
            successFunction()
          }
          onClose()
          resetForm()
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err.detail, {
            variant: 'error'
          })
        })
    }
  })
  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regions.find((item) => item.id === parseInt(value, 10))
        setCommunes(region?.communes || [])
        formik.setFieldValue('region_id', region?.id || '')
        break
      }
      case 'commune': {
        const commune = communes.find((item) => item.id === parseInt(value, 10))
        formik.setFieldValue('commune_id', commune?.id || '')
        break
      }
      default:
        throw new Error('Error')
    }
  }

  const changeLocation = (targetLocation) => {
    formik.setFieldValue('longitude', targetLocation.lng)
    formik.setFieldValue('latitude', targetLocation.lat)
  }
  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
    formik.setFieldValue('business_selected_id', values ? values.id : '')
    formik.setFieldTouched('business_selected_id')
  }

  const updateTreeData = (mainId) => {
    const treeList = treeData.map((item) =>
      searchFromTree(item, item, parseInt(mainId, 10))
    )
    setTreeData(treeList.filter((item) => item))
  }

  const getPollValidation = () => {
    if (type === 'UPDATE') return false
    return !isPollListAnswered(moduleResponse)
  }

  useEffect(() => {
    formik.setFieldValue(
      'end_date',
      formik.values.status === 'NO_VIGENTE' ? new Date() : null
    )
  }, [formik.values.status])

  useEffect(() => {
    if (formik.values.billing_business_id && companies.length > 0) {
      setCompanyBill(
        companies.find(
          (item) => item.id === parseInt(formik.values.billing_business_id, 10)
        )
      )
    }
  }, [formik.values.billing_business_id, companies])

  useEffect(() => {
    if (idCompany && companies.length > 0) {
      formik.setFieldValue('business_selected_id', idCompany)
      setSelectedCompany(
        companies.find((item) => item.id === parseInt(idCompany, 10))
      )
    }
  }, [idCompany, companies])

  useEffect(() => {
    if (selectedCompany) {
      const mainId =
        type === 'UPDATE'
          ? selectedCompany.id
          : formik.values.business_selected_id
      updateTreeData(mainId)
    }
  }, [formik.values.business_selected_id, type, selectedCompany])

  useEffect(() => {
    if (open) {
      setCompanyBill(null)
      dispatch(commonActions.getRegions())
      dispatch(commonActions.getTypologies())
      dispatch(commonActions.getEconomicSectors())

      dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
        (list) => {
          setCompanies(list)
          if (type !== 'UPDATE') {
            setTreeData(buildTreeData(list))
          } else {
            const treeList = buildTreeData(list).map((item) =>
              searchFromTree(
                item,
                item,
                parseInt(construction?.billing_business_id, 10)
              )
            )
            setTreeData(treeList.filter((item) => item))
          }
        }
      )
    }
  }, [open, type, selectClient])

  useEffect(() => {
    if (regions.length > 0 && type === 'UPDATE') {
      setCommunes(
        regions.find((item) => item.id === construction.region_id).communes
      )
    }
  }, [regions])

  useEffect(() => {
    if (formik.isSubmitting && !formik.isValid) {
      enqueueSnackbar('Completa los campos requeridos', {
        autoHideDuration: 2000,
        variant: 'info'
      })
    }
  }, [!formik.isValid, formik.isSubmitting])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullScreen={isMobile}>
      <Box maxWidth="900px" style={{ margin: '0 auto' }}>
        <Box>
          <Typography
            align="center"
            style={{
              fontSize: '20px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}
          >{`${type === 'CREATE' ? 'Nueva' : 'Editar'} obra`}</Typography>
          <Grid container spacing={2}>
            {selectClient && (
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={companies}
                  value={selectedCompany || ''}
                  getOptionLabel={(option) => option.business_name || ''}
                  onChange={onCompanySelect}
                  renderOption={(option) => (
                    <Box>
                      <Typography>
                        {`Razón social: `}
                        <strong>{option.business_name}</strong>
                      </Typography>
                      <Typography>{`Rut: ${option.rut}`}</Typography>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona empresa"
                      placeholder="Nombre de empresa"
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre"
                required
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                helperText={formik.touched.name && formik.errors.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Tipologia de obra"
                name="typology_id"
                onChange={formik.handleChange}
                value={formik.values.typology_id}
                helperText={
                  formik.touched.typology_id && formik.errors.typology_id
                }
                error={
                  formik.touched.typology_id &&
                  Boolean(formik.errors.typology_id)
                }
              >
                <option value="">SIN TIPOLOGÍA</option>
                {typologies.map((item, index) => (
                  <option key={`region--${index}`} value={`${item.id}`}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Sector económico"
                name="economic_sector_id"
                required
                onChange={formik.handleChange}
                value={formik.values.economic_sector_id}
                helperText={
                  formik.touched.economic_sector_id &&
                  formik.errors.economic_sector_id
                }
                error={
                  formik.touched.economic_sector_id &&
                  Boolean(formik.errors.economic_sector_id)
                }
              >
                <option value="">SELECCIONE SECTOR</option>
                {sectors.map((item, index) => (
                  <option key={`region--${index}`} value={`${item.id}`}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Can
              availableTo={['ADMIN']}
              yes={() => (
                <Grid item xs={12} md={6}>
                  <Select
                    label="Estado"
                    name="status"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.status}
                    helperText={formik.touched.status && formik.errors.status}
                    error={
                      formik.touched.status && Boolean(formik.errors.status)
                    }
                  >
                    <option value="">SELECCIONE ESTADO </option>
                    {[
                      { key: 'VIGENTE', name: 'VIGENTE' },
                      { key: 'NO_VIGENTE', name: 'NO VIGENTE' }
                    ].map((item, index) => (
                      <option key={`region--${index}`} value={`${item.key}`}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Grid>
              )}
              no={() => (
                <Grid item xs={12} md={6}>
                  <Select
                    label="Estado"
                    name="status"
                    disabled
                    onChange={formik.handleChange}
                    value={formik.values.status}
                    helperText={formik.touched.status && formik.errors.status}
                    error={
                      formik.touched.status && Boolean(formik.errors.status)
                    }
                  >
                    <option value="">SELECCIONE ESTADO </option>
                    {[
                      { key: 'VIGENTE', name: 'VIGENTE' },
                      { key: 'NO_VIGENTE', name: 'NO VIGENTE' }
                    ].map((item, index) => (
                      <option key={`region--${index}`} value={`${item.key}`}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Grid>
              )}
            />
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha termino"
                value={formik.values.end_date}
                helperText={formik.touched.end_date && formik.errors.end_date}
                error={
                  formik.touched.end_date && Boolean(formik.errors.end_date)
                }
                onChange={(date) => {
                  formik.setFieldTouched('end_date')
                  formik.setFieldValue('end_date', date)
                }}
                disabled={!(formik.values.status === 'NO_VIGENTE')}
              />
            </Grid>
          </Grid>
          <Box marginTop="15px">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Map
                  latitude={formik.values.latitude}
                  longitude={formik.values.longitude}
                  markers={[
                    {
                      address: formik.values.address,
                      latitude: formik.values.latitude,
                      longitude: formik.values.longitude
                    }
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <AddressAutoComplete
                      search={formik.values.address}
                      required
                      onChange={(value) => {
                        formik.setFieldValue('address', value)
                        formik.setFieldTouched('address')
                      }}
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      onSetLocation={changeLocation}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      label="Región"
                      name="region"
                      onChange={handleSelectChange}
                      value={formik.values.region_id}
                      required
                      helperText={
                        formik.touched.region_id && formik.errors.region_id
                      }
                      error={
                        formik.touched.region_id &&
                        Boolean(formik.errors.region_id)
                      }
                    >
                      <option value={`INVALID`}>Seleccione una región</option>
                      {regions.map((item, index) => (
                        <option key={`region--${index}`} value={`${item.id}`}>
                          {`${item.name}`}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      label="Comuna"
                      name="commune"
                      onChange={handleSelectChange}
                      value={formik.values.commune_id}
                      required
                      helperText={
                        formik.touched.commune_id && formik.errors.commune_id
                      }
                      error={
                        formik.touched.commune_id &&
                        Boolean(formik.errors.commune_id)
                      }
                    >
                      <option value={`INVALID`}>Seleccione una comuna</option>
                      {communes.map((item, index) => (
                        <option key={`region--${index}`} value={`${item.id}`}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ marginBottom: '10px' }}>
                  Facturación
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <RutTextField
                      onClick={toggleOpenFact}
                      label="Empresa facturadora"
                      disabled
                      value={companyBill?.business_name || ''}
                    />
                    <FacturationModal
                      type="FACTURATION"
                      open={openFact}
                      onClose={toggleOpenFact}
                      data={treeData}
                      selectedId={formik.values.billing_business_id}
                      onChange={(id) => {
                        formik.setFieldValue('billing_business_id', id)
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {type === 'CREATE' && <PollsModule />}

            <Box textAlign="center" marginTop="15px">
              <Button variant="outlined" onClick={onClose}>
                Cancelar
              </Button>
              <SubmitButton
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting || getPollValidation()}
                onClick={formik.handleSubmit}
                success={success}
              >
                {`${type === 'CREATE' ? 'Crear' : 'Actualizar'} obra`}
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
ConstructionModal.defaultProps = {
  type: 'CREATE',
  selectClient: false,
  successMessage: 'Obra creada exitosamente'
}

export default ConstructionModal
