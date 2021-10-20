import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Avatar, Box, Grid } from '@material-ui/core'
import {
  FaUserGraduate,
  FaAward,
  FaHome,
  FaCity,
  FaClipboardList
} from 'react-icons/fa'
import { Button, SubmitButton, Text } from '../../UI'
import { useSuccess, useToggle } from '../../../hooks'
import generateColor from '../../../utils/generateColor'
import General from '../Restrictions/General'
import Scholarship from '../Restrictions/Scholarship'
import Course from '../Restrictions/Course'
import Company from '../Restrictions/Company'

const Restrictions = ({
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { open: openAddGeneral, toggleOpen: toggleOpenAddGeneral } = useToggle()
  const { open: openAddScholarship, toggleOpen: toggleOpenAddScholarship } =
    useToggle()
  const { open: openAddCouse, toggleOpen: toggleOpenAddCourse } = useToggle()
  const { open: openAddCompany, toggleOpen: toggleOpenAddCompany } = useToggle()

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      code: type === 'UPDATE' ? data.code : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        createDate: new Date().toISOString()
      })
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar(successMessage, {
              variant: 'success'
            })
            resetForm()
            if (successFunction) {
              successFunction()
            }
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  return (
    <Box>
      <Box>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                onClick={toggleOpenAddGeneral}
                display="flex"
                alignItems="center"
              >
                <Avatar
                  style={{
                    backgroundColor: generateColor(),
                    marginRight: '8px'
                  }}
                >
                  <FaClipboardList />
                </Avatar>
                <Text>General</Text>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                alignItems="center"
                onClick={toggleOpenAddCompany}
              >
                <Avatar
                  style={{
                    backgroundColor: generateColor(),
                    marginRight: '8px'
                  }}
                >
                  <FaCity />
                </Avatar>
                <Text>Empresas</Text>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                alignItems="center"
                onClick={toggleOpenAddScholarship}
              >
                <Avatar
                  style={{
                    backgroundColor: generateColor(),
                    marginRight: '8px'
                  }}
                >
                  <FaAward />
                </Avatar>
                <Text>Becas</Text>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                alignItems="center"
                onClick={toggleOpenAddCourse}
              >
                <Avatar
                  style={{
                    backgroundColor: generateColor(),
                    marginRight: '8px'
                  }}
                >
                  <FaUserGraduate />
                </Avatar>
                <Text>Curso</Text>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <Avatar
                  style={{
                    backgroundColor: generateColor(),
                    marginRight: '8px'
                  }}
                >
                  <FaHome />
                </Avatar>
                <Text>Vivienda</Text>
              </Box>
            </Grid>
          </Grid>

          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              success={success}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} restricción`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
      <General open={openAddGeneral} onClose={toggleOpenAddGeneral} />
      <Scholarship
        open={openAddScholarship}
        onClose={toggleOpenAddScholarship}
      />
      <Course open={openAddCouse} onClose={toggleOpenAddCourse} />
      <Company open={openAddCompany} onClose={toggleOpenAddCompany} />
    </Box>
  )
}

Restrictions.defaultProps = {
  type: 'CREATE'
}

export default Restrictions
