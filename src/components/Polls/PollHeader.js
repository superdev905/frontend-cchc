import { Box, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Button, Select, SearchInput, Wrapper } from '../UI'
import { useToggle } from '../../hooks'
import pollActions from '../../state/actions/poll'
import PollCreate from './PollCreate'

const PollHeader = () => {
  const dispatch = useDispatch()
  const { open, toggleOpen } = useToggle()

  const createPoll = (values) => dispatch(pollActions.createPoll(values))
  return (
    <Box>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid item xs={12} md={2}>
            <Select name="status">
              <option value="">Todos</option>
              {[
                { key: 'VIGENTE', name: 'Vigente' },
                { key: 'NO_VIGENTE', name: 'No vigente' }
              ].map((item) => (
                <option key={`poll--filters-${item.key}`} value={item.key}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchInput
              // value={filters.search}
              placeholder="Buscar encuesta"
              // onChange={searchChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={toggleOpen}>Nueva Encuesta</Button>
            </Box>
          </Grid>
        </Grid>

        <PollCreate
          open={open}
          onClose={toggleOpen}
          submitFunction={createPoll}
          successMessage="Encuesta creada correctamente"
          //  successFunction={afterCreateEmployee}
        />
      </Wrapper>
    </Box>
  )
}

export default PollHeader
