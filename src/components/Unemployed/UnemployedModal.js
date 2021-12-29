import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import {
  Box,
  Typography,
  Grid,
  makeStyles,
  InputLabel
} from '@material-ui/core'
import { FiUpload } from 'react-icons/fi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, EmptyState, Select, Button } from '../UI'
import EmployeeRow from '../Scholarships/Create/EmployeeRow'
import { Dialog, FilePicker } from '../Shared'
import { formatSearchWithRut } from '../../formatters'
import generateColor from '../../utils/generateColor'
import commonActions from '../../state/actions/common'
import filesActions from '../../state/actions/files'
import unemployedActions from '../../state/actions/unemployed'

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

const UnemployedModal = ({ open, onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { regions } = useSelector((state) => state.common)
  const [searchRut, setSearchRut] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  const [years, setYears] = useState([])
  const [searchList, setSearchList] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const formik = useFormik({
    initialValues: {
      employeeId: '',
      date: new Date().toISOString(),
      office: '',
      period: '',
      delegation: '',
      dismissalFile: {
        fileName: '',
        fileKey: '',
        fileUrl: '',
        fileSize: '',
        uploadDate: ''
      }
    },
    validationSchema: Yup.object({
      office: Yup.string().required('Seleccione La Oficina'),
      period: Yup.string().required('Seleccione El Periodo')
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
          dispatch(unemployedActions.createUnemployed(formData)).then(() => {
            dispatch(unemployedActions.getUnemployed()).then(() => {
              enqueueSnackbar('Cesante Registrado Correctamente', {
                variant: 'success'
              })
            })
          })
        }
      } catch (error) {
        console.error(error)
        enqueueSnackbar('Error al Registrar Cesante', {
          variant: 'error'
        })
      }

      onClose()
    }
  })

  const fetchRegions = () => {
    dispatch(commonActions.getRegions())
  }

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
      dispatch(unemployedActions.getEmployeesNonAddedByRut(searchRut)).then(
        (list) => {
          setSearchList(
            list
              .filter((item) => item.isAdded === false)
              .map((employee) => ({
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
    }
  }, [open])

  useEffect(() => {
    fetchRegions()
  }, [])

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
              <Box className={classes.boxHorizontal}>
                <Box className={classes.boxInput}>
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
              <br />
              <Box>
                <InputLabel style={{ fontSize: '15px', marginBottom: '10px' }}>
                  Finiquito *
                </InputLabel>
                <FilePicker
                  acceptedFiles={['.pdf']}
                  onChange={(e) => {
                    setUploadFile(e)
                  }}
                  onDelete={() => setUploadFile(null)}
                  icon={<FiUpload fontSize="24px" />}
                />
              </Box>
              <Box textAlign="center" marginTop="10px">
                <Button disabled={!uploadFile} type="submit">
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

export default UnemployedModal
