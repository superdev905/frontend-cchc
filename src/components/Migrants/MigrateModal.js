import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Typography, Grid } from '@material-ui/core'
import { FiCheck as DoneIcon } from 'react-icons/fi'
import { Skeleton } from '@material-ui/lab'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, EmptyState, Select, Button } from '../UI'
import EmployeeRow from '../Scholarships/Create/EmployeeRow'
import { Dialog, DatePicker, DataTable } from '../Shared'
import { formatSearchWithRut } from '../../formatters'
import generateColor from '../../utils/generateColor'
import migrantsActions from '../../state/actions/migrants'
import employeesActions from '../../state/actions/employees'
import assistanceActions from '../../state/actions/assistance'
import uiActions from '../../state/actions/ui'
import { PollsModule } from '../Polls'
import { useToggle } from '../../hooks'
import { EmployeeForm } from '../Employees'
import AssistanceDialog from '../Assistance/Dialog'

const MigrateModal = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const { moduleResponse } = useSelector((state) => state.poll)
  const { benefits: benefitsList } = useSelector((state) => state.migrants)
  const [searchRut, setSearchRut] = useState('')
  const [benefits, setBenefits] = useState([])
  const [loading, setLoading] = useState(false)
  const [years, setYears] = useState([])
  const [searchList, setSearchList] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const { open: openEmployeeForm, toggleOpen: toggleOpenJEmployeeForm } =
    useToggle()
  const { open: openAttention, toggleOpen: toggleOpenAttention } = useToggle()

  const onCreateEmployee = (values) =>
    dispatch(
      employeesActions.createEmployee({ ...values, created_by: user.id })
    )

  const formik = useFormik({
    initialValues: {
      entryDate: '',
      period: ''
    },
    validationSchema: Yup.object({
      entryDate: Yup.string().required('Seleccione La Fecha de Ingreso'),
      period: Yup.string().required('Seleccione El Periodo')
    }),
    onSubmit: (formData) => {
      try {
        const { pollStatus } = moduleResponse
        formData.employeeId = parseInt(selectedEmployee.id, 10)
        formData.pollId = pollStatus[0] ? parseInt(pollStatus[0].id, 10) : null
        formData.responseId = pollStatus[0]
          ? parseInt(pollStatus[0].responseId, 10)
          : null
        formData.period = parseInt(formData.period, 10)
        dispatch(
          migrantsActions.createMigration({
            ...formData,
            benefits: benefits.map((item) => ({
              date: item.date,
              benefitId: item.id
            }))
          })
        )
          .then(() => {
            enqueueSnackbar('Registro de Migración Ingresado Exitosamente', {
              variant: 'success'
            })
            dispatch(migrantsActions.getMigrants())
            onClose()
          })
          .catch((err) => {
            enqueueSnackbar(err, {
              variant: 'error'
            })
          })
      } catch (error) {
        console.log(error)
        enqueueSnackbar(error, {
          variant: 'error'
        })
      }
    }
  })

  const getYears = () => {
    const currentYear = new Date().getFullYear()
    const minYear = currentYear - 6
    const yearsList = []
    for (let i = currentYear; i >= minYear; i -= 1) {
      yearsList.push(i)
    }
    return yearsList
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

  useEffect(() => {
    setBenefits(benefitsList.map((item) => ({ ...item, date: null })))
  }, [benefitsList])

  useEffect(() => {
    if (searchRut && formik.values.period) {
      setLoading(true)
      setSelectedEmployee(null)
      setSearchList([])
      dispatch(
        migrantsActions.searchMigrants(
          { rut: searchRut, period: formik.values.period },
          false
        )
      ).then((list) => {
        setLoading(false)
        setSearchList(
          list.map((item) => ({ ...item, avatarBg: generateColor() }))
        )
      })
    } else {
      setSearchList([])
      setSelectedEmployee(null)
    }
  }, [searchRut, formik.values.period])

  useEffect(() => {
    if (open) {
      dispatch(migrantsActions.getBenefits())
      formik.resetForm()
      setSearchRut('')
      setSearchList([])
      setSelectedEmployee(null)
      setYears(getYears)
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
          Registrar trabajador como migrante
        </Typography>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Periodo *"
                name="period"
                value={formik.values.period}
                onChange={formik.handleChange}
                error={formik.touched.period && Boolean(formik.errors.period)}
                helperText={formik.touched.period && formik.errors.period}
              >
                <option value="">-SELECCIONE PERIODO-</option>
                {years.map((item) => (
                  <option key={`application--period-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha de Ingreso a Chile"
                required
                value={formik.values.entryDate}
                onChange={(selectedDate) => {
                  formik.setFieldValue('entryDate', selectedDate)
                }}
                error={
                  formik.touched.entryDate && Boolean(formik.errors.entryDate)
                }
                helperText={formik.touched.entryDate && formik.errors.entryDate}
              />
            </Grid>
            {!selectedEmployee && (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      label="Buscar trabajador"
                      placeholder={'Ingrese rut'}
                      disabled={!formik.values.period}
                      value={searchRut}
                      onChange={(e) => {
                        setSearchRut(formatSearchWithRut(e.target.value))
                      }}
                      error={!formik.values.period}
                      helperText={
                        !formik.values.period && 'Seleccione un período'
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {loading ? (
                      <>
                        <Skeleton height={'80px'}></Skeleton>
                        <Skeleton height={'80px'}></Skeleton>
                      </>
                    ) : (
                      <>
                        {searchList.length === 0 ? (
                          <>
                            <EmptyState
                              message={`${
                                searchRut
                                  ? `No se encontraron resultados para: ${searchRut}`
                                  : 'Ingrese el rut del trabajador'
                              }`}
                              actionMessage="Crear trabajador"
                              event={searchRut && toggleOpenJEmployeeForm}
                            />
                            {openEmployeeForm && (
                              <EmployeeForm
                                open={openEmployeeForm}
                                type={'CREATE'}
                                onClose={toggleOpenJEmployeeForm}
                                submitFunction={onCreateEmployee}
                                successMessage={'Trabajador creado'}
                                successFunction={() => {
                                  dispatch(
                                    uiActions.setCurrentModule('MIGRANTES')
                                  )
                                }}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {searchList.map((item) => (
                              <EmployeeRow
                                key={`employee-${item.id}`}
                                selectable={!item.isAdded}
                                option={item}
                                onClick={() => {
                                  if (!item.isAdded) {
                                    setSelectedEmployee(item)
                                  }
                                }}
                                customComponent={
                                  item.isAdded && (
                                    <Box textAlign={'center'}>
                                      <Box>
                                        <Typography variant="caption1">
                                          Trabajador agregado en este periodo
                                        </Typography>
                                      </Box>
                                    </Box>
                                  )
                                }
                              />
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )}
            {selectedEmployee && (
              <Grid item xs={12}>
                <Typography>Trabajador</Typography>
                <EmployeeRow
                  option={selectedEmployee}
                  onDelete={() => {
                    setSelectedEmployee(null)
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography>Beneficios</Typography>
              <DataTable
                data={benefits}
                columns={[
                  {
                    name: 'Fecha',
                    selector: (row) => (
                      <Box>
                        {row.name.includes('ATENCIÓN SOCIAL') ? (
                          <Button onClick={toggleOpenAttention}>Atender</Button>
                        ) : (
                          <DatePicker
                            value={row.date}
                            onChange={(e) => {
                              const updatedList = benefits.map((item) =>
                                item.id === row.id ? { ...item, date: e } : item
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
              {openAttention && (
                <AssistanceDialog
                  sourceSystem={'MIGRANTES'}
                  onClose={toggleOpenAttention}
                  open={openAttention}
                  employee={selectedEmployee}
                  visitShift={''}
                  submitFunction={createAttention}
                  company={{ business_name: '' }}
                  construction={{ name: '' }}
                  successFunction={() => {
                    const list = benefits.map((item) =>
                      item.name.includes('ATENCIÓN SOCIAL')
                        ? { ...item, date: new Date() }
                        : item
                    )
                    setBenefits(list)
                  }}
                  successMessage="Atención creada con éxito"
                />
              )}
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Box>
            <PollsModule />
          </Box>
          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant={'outlined'}>
              Cancelar
            </Button>
            <Button onClick={formik.handleSubmit} disabled={!formik.isValid}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default MigrateModal
