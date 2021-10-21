import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Avatar, Box, Grid, makeStyles } from '@material-ui/core'
import {
  FaUserGraduate,
  FaAward,
  FaHome,
  FaCity,
  FaClipboardList
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Button, SubmitButton, Text } from '../../UI'
import { useSuccess, useToggle } from '../../../hooks'
import generateColor from '../../../utils/generateColor'
import General from './General'
import Scholarship from './Scholarship'
import Course from './Course'
import Company from './Company'
import benefitsActions from '../../../state/actions/benefits'

const useStyles = makeStyles(() => ({
  Box: {
    cursor: 'pointer',
    border: '2px solid grey',
    borderRadius: 7,
    padding: '7px',
    '&:hover': {
      backgroundColor: 'rgba(114, 115, 130, 0.11)'
    }
  }
}))

const Restrictions = ({
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { create } = useSelector((state) => state.benefits)
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

  const handleBack = () => {
    dispatch(benefitsActions.updateCreate({ ...create, step: create.step - 1 }))
  }

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
                className={classes.Box}
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
                className={classes.Box}
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
                className={classes.Box}
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
                className={classes.Box}
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
              <Box display="flex" alignItems="center" className={classes.Box}>
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
            <Button onClick={handleBack} variant="outlined">
              Volver
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
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
