import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import companiesActions from '../../state/actions/companies'
import { Dialog } from '../Shared'
import { Select, RutTextField, TextField, SubmitButton, Button } from '../UI'
import { useToggle, useSuccess } from '../../hooks'
import FacturationModal from '../Companies/Create/ParentBusiness'
import { buildTreeData, searchFromTree } from '../../utils/buildTreeData'

const validationSchema = Yup.object({
  boss_id: Yup.number().required('Ingrese nombre de Jefatura'),
  delegation: Yup.string(),
  authorizing_charge_id: Yup.number(),
  authorizing_user: Yup.string().required('Nombre autorizacion de cobro'),
  interlocutor_id: Yup.number(),
  construction_name: Yup.string().required('Ingrese Delegacion'),
  construction_id: Yup.number(),
  business_name: Yup.string().required('Ingrese Empresa'),
  business_id: Yup.number(),
  business_rut: Yup.string(),
  employee_names: Yup.string(),
  employee_id: Yup.number(),
  employee_rut: Yup.string().required('Rut Trabajador')
})

const InclusiveCreate = ({
  open,
  onClose,
  selectClient,
  type,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { idCompany } = useParams()
  const [treeData, setTreeData] = useState([])
  const { isMobile } = useSelector((state) => state.ui)
  const { companies, setCompanies } = useState([])
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companyBill, setCompanyBill] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { open: openFact, toggleOpen: toggleOpenFact } = useToggle()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      bossId: '',
      delegation: '',
      authorizingChargeId: '',
      authorizingUser: '',
      interlocutorId: '',
      constructionName: '',
      constructionId: '',
      businessName: '',
      businessId: '',
      businessRut: '',
      employeeNames: '',
      employeeId: '',
      employeeRut: ''
    },
    onSubmit: (values) => {
      submitFunction({
        ...values,
        date: new Date().toISOString()
      })
        .then((result) => {
          formik.setSubmitting(false)
          changeSuccess(true)
          if (successFunction) {
            successFunction()
          }
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          onClose()
          if (successFunction) {
            successFunction(result)
          }
        })
        .catch((err) => {
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  const updateTreeData = (mainId) => {
    const treeList = treeData.map((item) =>
      searchFromTree(item, item, parseInt(mainId, 10))
    )
    setTreeData(treeList.filter((item) => item))
  }

  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
    formik.setFieldValue('business_selected_id', values ? values.id : '')
    formik.setFieldTouched('business_selected_id')
  }

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
      dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
        (list) => {
          setCompanies(list)
          setTreeData(buildTreeData(list))
        }
      )
    }
  }, [open, type, selectClient])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={'lg'}
      fullScreen={isMobile}
    >
      <Box>
        <Typography
          variant="h6"
          align="center"
          style={{ fontWeight: 'bold', marginBottom: 10 }}
        >
          Nuevo Caso de Ley de Inclusión
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Select label="Jefatura" name="jefatura" required>
                <option value="">Jefatura</option>
              </Select>
            </Grid>
            <Grid item xs={6} md={4}>
              <Select label="Delegacion" name="delegacion" required>
                <option value="">Delegación</option>
              </Select>
            </Grid>
            <Grid item xs={6} md={4}>
              <Select label="Modalidad" name="modalidad" required>
                <option value="">Modalidad</option>
              </Select>
            </Grid>
          </Grid>
          <Typography variant="h7" align="left" style={{ fontWeight: 'bold' }}>
            Detalle del Trabajador
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <RutTextField label="Run" name="run" required />
            </Grid>
          </Grid>
          <Typography variant="h7" align="left" style={{ fontWeight: 'bold' }}>
            Detalle de la Empresa
          </Typography>
          <Grid container spacing={2}>
            {selectClient && (
              <Grid item xs={6} md={4}>
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
                      placeholder="Empresa"
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={6} md={4}>
              <Select label="Obra" name="obra" required>
                <option value="">Obra</option>
              </Select>
            </Grid>
            <Grid item xs={6} md={4}>
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
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Select
                label="Interlocutor de Empresa"
                name="interlocutor de empresa"
                requiered
              >
                <option value="">Interlocutor de Empresa</option>
              </Select>
            </Grid>
            <Grid item xs={6} md={4}>
              <Select
                label="Nombre Autorizacion de Cobro"
                name="nombre autorizacion de cobro"
                required
              >
                <option value="">Nombre autorizacion de Cobro</option>
              </Select>
            </Grid>
            <Grid item xs={6} md={4}>
              <Select
                label="Cargo de autorizacion de Cobro"
                name="cargo de autorizacion de cobro"
                required
              >
                <option value="">Cargo de Autorizacion de Cobro</option>
              </Select>
            </Grid>
          </Grid>
          <Box textAlign="center" marginTop="15px">
            <Button variant="outlined" onClick={onclose}>
              Cancelar
            </Button>
            <SubmitButton
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              onClick={formik.handleSubmit}
              success={success}
            >
              OK
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default InclusiveCreate
