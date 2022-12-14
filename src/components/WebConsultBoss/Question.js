import { Box, Chip, Grid } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { SearchInput, Button } from '../UI'
import { useMenu, useToggle } from '../../hooks'
import questionActions from '../../state/actions/questions'
import QuestionAssign from './QuestionAssign'
import { formatSearchWithRut } from '../../formatters'
import FiltersMenu from './FiltersMenu'
import Can from '../Can'

const Question = () => {
  const dispatch = useDispatch()
  const { open: openAssign, toggleOpen: toggleOpenAssign } = useToggle()
  const { user } = useSelector((state) => state.auth)
  const { query, uiFilters, selectedList } = useSelector(
    (state) => state.questions
  )
  const { open, anchorEl, handleClose, handleOpen } = useMenu()

  const AssignQuestion = (values) => {
    const data = {
      ...values,
      bossId: user.id
    }
    return dispatch(questionActions.questionAssign(data))
  }

  const handleUpdateQuery = (values) => {
    dispatch(questionActions.updateQuery(values))
  }

  const getQuestions = () => {
    dispatch(questionActions.updateSelectedList([]))
    const formattedQuery = { ...query, professionalId: user.id }
    if (user.role.key === 'ADMIN' || user.role.key === 'JEFATURA') {
      delete formattedQuery.professionalId
    }
    dispatch(questionActions.getQuestions(formattedQuery))
  }

  const handleDelete = (key) => {
    const updatedUiFilters = {
      ...uiFilters
    }
    const updatedQuery = { ...query }
    delete updatedUiFilters[key]
    if (updatedQuery[key]) {
      delete updatedQuery[key]
    }

    dispatch(questionActions.updateQuery(updatedQuery))
    dispatch(questionActions.updateUIFilters(updatedUiFilters))
  }

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={12} md={6} lg={5}>
          <SearchInput
            placeholder="Buscar por: RUT, Nombre de trabajador"
            value={query.search || ''}
            onChange={(e) => {
              handleUpdateQuery({
                ...query,
                search: formatSearchWithRut(e.target.value)
              })
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Box textAlign="right">
            <Button onClick={handleOpen}>Filtros</Button>
            <Can
              availableTo={['ADMIN', 'JEFATURA']}
              yes={() => (
                <Button
                  onClick={toggleOpenAssign}
                  disabled={selectedList.length === 0}
                >
                  Asignar
                </Button>
              )}
              no={() => null}
            />
          </Box>
        </Grid>
      </Grid>
      <Box mt={2}>
        {Object.keys(uiFilters).map(
          (key) =>
            uiFilters[key].data && (
              <Chip
                style={{ marginRight: 10 }}
                color="primary"
                key={`filter-${key}`}
                label={`${uiFilters[key].label}: ${uiFilters[key].data}`}
                deleteIcon={<HighlightOff />}
                onDelete={() => handleDelete(key)}
              />
            )
        )}
      </Box>
      {open && (
        <FiltersMenu open={open} anchorEl={anchorEl} onClose={handleClose} />
      )}
      {openAssign && (
        <QuestionAssign
          open={openAssign}
          onClose={toggleOpenAssign}
          submitFunction={AssignQuestion}
          successMessage="Pregunta Asignada Correctamente"
          successFunction={getQuestions}
        />
      )}
    </Box>
  )
}
export default Question
