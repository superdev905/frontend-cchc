import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Select, SearchInput, Wrapper } from '../UI'
import { useToggle } from '../../hooks'
import pollActions from '../../state/actions/poll'
import PollCreate from './PollCreate'
import PollCard from './Card'
import { statusList } from '../../config'

const PollHeader = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { pollList } = useSelector((state) => state.poll)
  const [loading, setLoading] = useState(false)
  const { open, toggleOpen } = useToggle()

  const createPoll = (values) => {
    const data = { ...values, state: 'ACTIVE', created_by: user.id }
    return dispatch(pollActions.createPoll(data))
  }

  const fetchPolls = () => {
    setLoading(true)
    dispatch(pollActions.getPolls()).then(() => {
      setLoading(false)
    })
  }

  const redirectToPoll = (poll) => {}

  useEffect(() => {
    fetchPolls()
  }, [])
  return (
    <Wrapper>
      <Box p={2}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={2}>
            <Select name="status">
              <option value="">Todos</option>
              {statusList.map((item) => (
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

        <Box>
          <PollCard loader />
          {loading ? (
            <PollCard loader />
          ) : (
            pollList.map((item) => (
              <PollCard key={`poll-card-${item.id}`} poll={item} />
            ))
          )}
        </Box>

        <PollCreate
          open={open}
          onClose={toggleOpen}
          submitFunction={createPoll}
          successMessage="Encuesta creada correctamente"
          //  successFunction={afterCreateEmployee}
        />
      </Box>
    </Wrapper>
  )
}

export default PollHeader
