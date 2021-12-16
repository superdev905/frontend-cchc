import { Box, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SearchInput, Button } from '../UI'
import { useToggle } from '../../hooks'
import questionActions from '../../state/actions/questions'
import QuestionAssign from './QuestionAssign'

const Question = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { open: openAssign, toggleOpen: toggleOpenAssign } = useToggle()

  const AssignQuestion = (values) => {
    const data = {
      ...values,
      date: new Date().toISOString()
    }
    return dispatch(questionActions.AssignQuestion(data))
  }

  const redirectToQuestion = (id) => {
    history.push(`/question/${id}`)
  }

  return (
    <Box display="flex">
      <Grid container alignItems="center">
        <Grid item xs={12} md={6} lg={5}>
          <SearchInput placeholder="Buscar por:" />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Box textAlign="right">
            <Button>Filtros</Button>
            <Button onClick={toggleOpenAssign}>Asignar</Button>
          </Box>
        </Grid>
      </Grid>
      {openAssign && (
        <QuestionAssign
          open={openAssign}
          onClose={toggleOpenAssign}
          submitFunction={AssignQuestion}
          successMessage="Pregunta Asignada Correctamente"
          successFunction={redirectToQuestion}
        />
      )}
    </Box>
  )
}
export default Question
