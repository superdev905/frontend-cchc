import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiUpload, FiCheck as DoneIcon } from 'react-icons/fi'
import { useSnackbar } from 'notistack'
import { Box, Typography, Grid, InputLabel } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, EmptyState, Select, Button, SubmitButton } from '../UI'
import EmployeeRow from '../Scholarships/Create/EmployeeRow'
import { DataTable, DatePicker, Dialog, FilePicker } from '../Shared'
import commonActions from '../../state/actions/common'
import assistanceActions from '../../state/actions/assistance'
import { formatSearchWithRut } from '../../formatters'
import generateColor from '../../utils/generateColor'
import filesActions from '../../state/actions/files'
import unemployedActions from '../../state/actions/unemployed'
import { useToggle } from '../../hooks'
import AssistanceDialog from '../Assistance/Dialog'

const UnemployedModal = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { regions } = useSelector((state) => state.common)
  const { benefits: initialBenefits } = useSelector((state) => state.unemployed)
  const [searchRut, setSearchRut] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  const [years, setYears] = useState([])
  const [searchList, setSearchList] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [benefits, setBenefits] = useState([])
  const { open: openAttention, toggleOpen: toggleOpenAttention } = useToggle()

  const formik = useFormik({
    initialValues: {
      employeeId: '',
      date: new Date().toISOString(),
      office: '',
      period: '',
      delegation: '',
      dismissalFile: null
    },
    validationSchema: Yup.object({
      office: Yup.string().required('Seleccione La Oficina'),
      period: Yup.string().required('Seleccione El Periodo'),
      dismissalFile: Yup.mixed().required('').nullable()
    }),
    onSubmit: async (formData) => {
      try {
        if (uploadFile) {
          formData.employeeId = selectedEmployee.id
          formData.delegation = formData.office
          const formFile = new FormData()
          formFile.append('file', uploadFile)
          const response = await dispatch(filesActions.uploadFile(formFile))
          formData.dismissalFile.fileName = response.file_name
          formData.dismissalFile.fileKey = response.file_key
          formData.dismissalFile.fileUrl = response.file_url
          formData.dismissalFile.fileSize = response.file_size
          formData.dismissalFile.uploadDate = response.upload_date
          formData.benefits = benefits.map((item) => ({
            date: item.date,
            id: item.id,
            isCompleted: item.isCompleted
          }))
          dispatch(unemployedActions.createUnemployed(formData)).then(() => {
            formik.setSubmitting(false)
            enqueueSnackbar('Cesante Registrado Correctamente', {
              variant: 'success'
            })
            dispatch(unemployedActions.getUnemployed())
          })
        }
      } catch (error) {
        formik.setSubmitting(false)
        enqueueSnackbar(error, {
          variant: 'error'
        })
      }

      onClose()
    }
  })

  const fetchRegions = () => {
    dispatch(commonActions.getRegions())
  }

  const createAttention = (values) =>
    dispatch(
      assistanceActions.createAssistance({
        ...values,
        employee_id: selectedEmployee.id,
        employee_name: selectedEmployee.names,
        employee_lastname: `${selectedEmployee.paternal_surname}`,
        employee_rut: selectedEmployee.run
      })
    )

  const getYears = () => {
    const currentYear = new Date().getFullYear()
    const minYear = currentYear - 6
    const yearsList = []
    for (let i = currentYear; i >= minYear; i -= 1) {
      yearsList.push(i)
    }
    return yearsList
  }
  useEffect(() => {
    setBenefits(
      initialBenefits.map((item) => ({
        ...item,
        date: null,
        isCompleted: false
      }))
    )
  }, [initialBenefits])

  useEffect(() => {
    if (searchRut) {
      dispatch(unemployedActions.getEmployeesNonAddedByRut(searchRut)).then(
        (list) => {
          setSearchList(
            list.map((employee) => ({
              ...employee,
              avatarBg: generateColor()
            }))
          )
        }
      )
    } else {
      setSearchList([])
    }
  }, [searchRut])

  useEffect(() => {
    if (open) {
      formik.resetForm()
      setSearchRut('')
      setSearchList([])
      setUploadFile(null)
      setSelectedEmployee(null)
      setYears(getYears)
      fetchRegions()
      dispatch(unemployedActions.getBenefits())
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Registrar Trabajador Como Cesante
        </Typography>
        {!selectedEmployee ? (
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
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
                        key={item}
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
            <Box textAlign="center" marginTop="10px">
              <Button onClick={onClose}>Cancelar</Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography>Trabajador</Typography>
            <EmployeeRow
              option={selectedEmployee}
              onDelete={() => {
                setSelectedEmployee(null)
              }}
            />
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Select
                    label="Oficina *"
                    name="office"
                    value={formik.values.office}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.office && Boolean(formik.errors.office)
                    }
                    helperText={formik.touched.office && formik.errors.office}
                  >
                    <option value="">-Seleccione-</option>
                    {regions.map((item) => (
                      <option
                        key={`application--region-${item.name}`}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Select
                    label="Periodo *"
                    name="period"
                    value={formik.values.period}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.period && Boolean(formik.errors.period)
                    }
                    helperText={formik.touched.period && formik.errors.period}
                  >
                    <option value="">-Seleccione-</option>
                    {years.map((item) => (
                      <option key={`application--period-${item}`} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <Box>
                    <InputLabel
                      style={{ fontSize: '15px', marginBottom: '10px' }}
                    >
                      Finiquito *
                    </InputLabel>
                    <FilePicker
                      acceptedFiles={['.pdf']}
                      onChange={(e) => {
                        setUploadFile(e)
                        formik.setFieldValue('dismissalFile', e)
                      }}
                      onDelete={() => {
                        setUploadFile(null)
                        formik.setFieldValue('dismissalFile', null)
                      }}
                      icon={<FiUpload fontSize="24px" />}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <DataTable
                    data={benefits}
                    columns={[
                      {
                        name: 'Fecha',
                        selector: (row) => (
                          <Box>
                            {row.name.includes('ATENCIÓN SOCIAL') ? (
                              <>
                                {row.isCompleted ? (
                                  'Completado'
                                ) : (
                                  <Button
                                    onClick={toggleOpenAttention}
                                    size={'small'}
                                  >
                                    Atender
                                  </Button>
                                )}
                              </>
                            ) : (
                              <DatePicker
                                value={row.date}
                                onChange={(e) => {
                                  const updatedList = benefits.map((item) =>
                                    item.id === row.id
                                      ? { ...item, date: e, isCompleted: true }
                                      : item
                                  )
                                  setBenefits(updatedList)
                                }}
                              />
                            )}
                          </Box>
                        )
                      },
                      {
                        name: 'Tipo beneficio',
                        selector: (row) => row.name
                      },
                      {
                        name: '',
                        right: true,
                        maxWidth: '50px',
                        selector: (row) => (
                          <>
                            {row.date && (
                              <DoneIcon fontSize={'24px'} color="green" />
                            )}
                          </>
                        )
                      }
                    ]}
                  />
                </Grid>
              </Grid>

              <Box textAlign="center" marginTop="10px">
                <SubmitButton
                  disabled={!uploadFile || !formik.isValid}
                  loading={formik.isSubmitting}
                  onClick={formik.handleSubmit}
                >
                  Guardar
                </SubmitButton>
              </Box>
              {openAttention && (
                <AssistanceDialog
                  sourceSystem={'CENSANTES'}
                  onClose={toggleOpenAttention}
                  open={openAttention}
                  employee={selectedEmployee}
                  visitShift={''}
                  submitFunction={createAttention}
                  company={{ business_name: '' }}
                  construction={{ name: '' }}
                  successFunction={() => {
                    const list = benefits.map((item) =>
                      item.name.includes('TENCIÓN SOCIAL')
                        ? { ...item, isCompleted: true }
                        : item
                    )
                    setBenefits(list)
                  }}
                  successMessage="Atención creada con éxito"
                />
              )}
            </form>
          </Box>
        )}
      </Box>
    </Dialog>
  )
}

export default UnemployedModal
