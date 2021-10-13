import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Drawer, Grid, IconButton, Typography } from '@material-ui/core'
import { FiArrowLeft as BackIcon } from 'react-icons/fi'
import { formatDate } from '../../../../formatters'
import { Button, LabeledRow, Text } from '../../../UI'
import useStyles from './styles'
import PaymentCard from '../../ExtraPayments/Card'
import ScoreCard from '../ScoreCard'
import courses from '../../../../state/actions/courses'

const EmployeeDialog = ({ open, onClose, idEmployee }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [student, setStudent] = useState(null)
  const { isMobile } = useSelector((state) => state.ui)

  const fetchDetails = () => {
    setLoading(true)
    dispatch(courses.getStudentDetails(idCourse, idEmployee))
      .then((result) => {
        setLoading(false)
        setStudent(result)
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false)
          onClose()
          enqueueSnackbar('Error al obtener datos del estudiante', {
            variant: 'error'
          })
        }, 500)
      })
  }

  useEffect(() => {
    if (open) {
      fetchDetails()
    }
  }, [open])
  return (
    <Drawer
      classes={{ paper: classes.root }}
      anchor="right"
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
    >
      <Box p={2}>
        <Box display={'flex'} alignItems={'center'} paddingTop={'20px'}>
          <IconButton onClick={onClose}>
            <BackIcon />
          </IconButton>
          <Text loading={loading} className={classes.userTitle}>
            {student &&
              `${student.student.names} ${student.student.paternalSurname} ${student.student.maternalSurname}`}
          </Text>
        </Box>
        <Box>
          <LabeledRow label={'Rut:'}>
            <Text loaderWidth={'20%'} loading={loading}>
              {student && `${student.student.run}`}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Fecha de inscripción:'}>
            <Text loading={loading}>
              {student &&
                formatDate(student.enrollDate, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Inscrito por:'}>
            <Text loaderWidth={'30%'} loading={loading}>
              {student &&
                `${student.createdBy.names} ${student.createdBy.paternalSurname} ${student.createdBy.maternalSurname}`}
            </Text>
          </LabeledRow>
        </Box>
        <Box>
          <Box className={classes.centeredSpaced}>
            <Typography>Pagos</Typography>
            <Button size="small">Agregar</Button>
          </Box>
          <Box>
            <PaymentCard.Container>
              <PaymentCard.Loader size={12} />
              <PaymentCard.Loader size={12} />
            </PaymentCard.Container>
          </Box>
        </Box>
        <Box>
          <Box className={classes.centeredSpaced}>
            <Typography>Notas</Typography>
            <Button size="small">Agregar</Button>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <ScoreCard score={10} avg={12} />
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box className={classes.centeredSpaced}>
            <Typography>Estado de curso</Typography>
            <Button size="small">Agregar</Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

EmployeeDialog.propTypes = {}

export default EmployeeDialog
