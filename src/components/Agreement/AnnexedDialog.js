import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { Box, Chip, makeStyles, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { FiSave as SaveIcon } from 'react-icons/fi'
import usersActions from '../../state/actions/users'
import { Dialog } from '../Shared'
import { HouseAddEmployee, HouseRelatedBusiness } from '../Housing'
import EmployeeList from '../../pages/HousingNew/Employees/List'
import { Button, SubmitButton, TextArea, TextField } from '../UI'
import { useToggle } from '../../hooks'
import housingActions from '../../state/actions/housing'

const useStyles = makeStyles(() => ({
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  section: {
    marginBottom: 15
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5
  }
}))

const validationSchema = Yup.object().shape({
  observations: Yup.string().required('Ingrese observaciones')
})

const AnnexedDialog = ({ open, onClose, selectedCompany, successFunction }) => {
  const dispatch = useDispatch()
  const { agreementId } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
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
      observations: ''
    }
  })

  const createAnnexed = () => {
    setLoading(true)
    const createData = {
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
      })),
      date: new Date(),
      agreementId
    }
    dispatch(housingActions.createAnnexed(createData))
      .then(() => {
        setLoading(false)
        onClose()
        if (successFunction) {
          successFunction()
        }
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
        setLoading(false)
      })
  }

  useEffect(() => {
    if (open) {
      dispatch(usersActions.getFoundationUsers({})).then((result) => {
        setProfessionalList(
          result.map((item) => ({ ...item, isSelected: false }))
        )
      })
    }
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <Box>
        <Typography className={classes.title} align="center">
          Nuevo anexo
        </Typography>
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
        <EmployeeList employees={employeeList} onAdd={toggleOpenAddEmployee} />
        {openAddEmployee && (
          <HouseAddEmployee
            open={openAddEmployee}
            onClose={toggleOpenAddEmployee}
            submitFunction={(list) => setEmployeeList(list)}
            onAdd={(employee) => {
              const updatedList = [...employeeList]
              updatedList.push(employee)
              setEmployeeList(updatedList)
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
                  {' '}
                  {`Nombre:  ${values.names} ${values.paternal_surname}`}
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
                  label={`${option.names} ${option.paternal_surname}-${option.charge_name}`}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Seleccione profesionales" />
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
      <Box textAlign="center">
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <SubmitButton
          loading={loading}
          onClick={createAnnexed}
          startIcon={<SaveIcon />}
        >
          Guardar
        </SubmitButton>
      </Box>
    </Dialog>
  )
}

export default AnnexedDialog
