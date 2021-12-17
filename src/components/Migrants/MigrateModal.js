import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Typography, Grid, makeStyles } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, EmptyState, Select, Button } from '../UI'
import EmployeeRow from '../Scholarships/Create/EmployeeRow'
import { Dialog, DatePicker } from '../Shared'
import { formatSearchWithRut } from '../../formatters'
import generateColor from '../../utils/generateColor'
import employeesActions from '../../state/actions/employees'
import migrantsActions from '../../state/actions/migrants'
import { PollsModule } from '../Polls'

const useStyles = makeStyles(() => ({
  boxInput: {
    width: '100%'
  },
  boxHorizontal: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px'
  }
}))

const MigrateModal = ({ open, onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { moduleResponse } = useSelector((state) => state.poll)
  const [searchRut, setSearchRut] = useState('')
  const [years, setYears] = useState([])
  const [searchList, setSearchList] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)

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
        formData.pollId = parseInt(pollStatus[0].id, 10)
        formData.responseId = parseInt(pollStatus[0].responseId, 10)
        formData.period = parseInt(formData.period, 10)
        console.log({ formData })
        dispatch(migrantsActions.createMigration(formData))
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

  useEffect(() => {
    if (searchRut) {
      dispatch(
        employeesActions.getEmployees(
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
    if (open) {
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
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Registrar Trabajador Como Migrante
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
              <Box className={classes.boxHorizontal}>
                <Box className={classes.boxInput}>
                  <DatePicker
                    label="Fecha de Ingreso a Chile"
                    required
                    value={formik.values.entryDate}
                    onChange={(selectedDate) => {
                      formik.setFieldValue('entryDate', selectedDate)
                    }}
                    error={
                      formik.touched.entryDate &&
                      Boolean(formik.errors.entryDate)
                    }
                    helperText={
                      formik.touched.entryDate && formik.errors.entryDate
                    }
                  />
                </Box>
                <Box className={classes.boxInput}>
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
                </Box>
              </Box>
              <Box>
                <PollsModule />
              </Box>
              <Box textAlign="center" marginTop="10px">
                <Button
                  disabled={!moduleResponse?.pollStatus[0]?.isAnswered}
                  type="submit"
                >
                  Guardar
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Box>
    </Dialog>
  )
}

export default MigrateModal
