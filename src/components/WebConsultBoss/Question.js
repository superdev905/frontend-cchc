import { Box, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SearchInput, Wrapper, Button } from '../UI'
import { useToggle } from '../../hooks'
import questionActions from '../../state/actions/questions'
import QuestionAssign from './QuestionAssign'

const Questions = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { open: openAssign, toggleOpen: toogleOpenAssign } = useToggle()
  const AssignQuestion = (values) => {
    const data = {
      ...values,
      state: 'ACTIVE',
      created_by: user.id,
      author: `${user.names} ${user.paternal_surname} ${user?.maternal_surname}`
    }
    return dispatch(questionActions.AssignQuestion(data))
  }

  const redirectToQuestion = (id) => {
    history.pushState(`/webconsult/${id}`)
  }

  return (
    <Wrapper>
      <Box display="flex">
        <Grid container alugnItems="center">
          <Grid item xs={12} md={6} lg={5}>
            <SearchInput placeholder="Buscar por:" />
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Box textAlign="right">
              <Button>Filtros</Button>
              <Button onClick={toogleOpenAssign}>Asignar</Button>
            </Box>
          </Grid>
        </Grid>
        <QuestionAssign
          open={openAssign}
          onclose={toogleOpenAssign}
          submitFunction={AssignQuestion}
          successMessage="Pregunta Asignada Correctamente"
          successFunction={redirectToQuestion}
        />
      </Box>
    </Wrapper>
  )
}
export default Questions
