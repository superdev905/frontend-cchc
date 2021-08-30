import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Paper,
  makeStyles
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useSelector, useDispatch } from 'react-redux'
import { useToggle } from '../../hooks'
import { LabeledRow, StatusChip, Text, Button, Wrapper } from '../UI'
import { formatDate } from '../../formatters'
import usersActions from '../../state/actions/users'
import pollActions from '../../state/actions/poll'
import QuestionCreate from './QuestionCreate'

const useStyles = makeStyles(() => ({
  iconAdd: {
    fontSize: 50
  },
  footer: {
    textAlign: 'center'
  }
}))

const PollDetails = ({ fetching }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { poll } = useSelector((state) => state.poll)
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const { open: openQuestion, toggleOpen: toggleOpenQuestion } = useToggle()
  // const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  // const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  useEffect(() => {
    if (poll) {
      setLoading(true)
      dispatch(usersActions.getUserDetails(poll.created_by)).then((result) => {
        setLoading(false)
        setUserDetails(result)
      })
    }
  }, [poll])

  const createQuestion = (values) => {
    dispatch(pollActions.createQuestion(values))
  }

  return (
    <div>
      <Wrapper>
        <Box p={1} display="flex" justifyContent="flex-end">
          <Button
          // onClick={toggleOpenEdit}
          >
            Editar
          </Button>
          <Button
          // onClick={toggleOpenDelete}
          >
            Eliminar
          </Button>
        </Box>
        <Box p={1}>
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}
          >
            Detalles de encuesta
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LabeledRow label="Título:">
                <Text loading={fetching}>{poll?.name}</Text>
              </LabeledRow>
              <LabeledRow label="Inicio:">
                <Text loading={fetching}>
                  {poll ? formatDate(poll.start_date) : ''}
                </Text>
              </LabeledRow>
              <LabeledRow label="Fin:">
                <Text loading={fetching}>
                  {poll ? formatDate(poll.end_date) : ''}
                </Text>
              </LabeledRow>{' '}
              <LabeledRow label="Estado:">
                <Text loaderWidth="80%" loading={fetching}>
                  {poll ? <StatusChip success label={poll.status} /> : ''}
                </Text>
              </LabeledRow>
              <LabeledRow label="Modulos:">
                <Text loaderWidth="80%" loading={fetching}>
                  {poll?.business_name}
                </Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={6}>
              <LabeledRow label="Creado por:">
                <Text loading={loading || fetching}>
                  {userDetails
                    ? `${userDetails?.names} ${userDetails?.paternal_surname} ${userDetails?.maternal_surname}`
                    : ''}
                </Text>
              </LabeledRow>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
      <Paper elevation={0} className={classes.footer}>
        <Box p={2}>
          <IconButton onClick={toggleOpenQuestion}>
            <AddCircleIcon color="primary" className={classes.iconAdd} />
          </IconButton>
          <Typography>Nueva Pregunta</Typography>
        </Box>

        <QuestionCreate
          open={openQuestion}
          onClose={toggleOpenQuestion}
          submitFunction={createQuestion}
          // successFunction={redirectToPoll}
        />
      </Paper>
    </div>
  )
}

export default PollDetails
