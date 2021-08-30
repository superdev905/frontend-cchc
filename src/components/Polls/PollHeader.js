import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Select,
  SearchInput,
  Wrapper,
  Pagination,
  EmptyState
} from '../UI'
import { useToggle } from '../../hooks'
import pollActions from '../../state/actions/poll'
import PollCreate from './PollCreate'
import PollCard from './Card'
import { statusList } from '../../config'
import { PollAnswerRow } from '../Poll'

const PollHeader = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((state) => state.auth)
  const { pollList, total } = useSelector((state) => state.poll)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    size: 30,
    page: 1,
    search: '',
    status: ''
  })
  const { open, toggleOpen } = useToggle()

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }
  const createPoll = (values) => {
    const data = { ...values, state: 'ACTIVE', created_by: user.id }
    return dispatch(pollActions.createPoll(data))
  }

  const fetchPolls = () => {
    setLoading(true)
    dispatch(
      pollActions.getPolls({ ...filters, search: filters.search.trim() })
    ).then(() => {
      setLoading(false)
    })
  }

  const redirectToPoll = (poll) => {
    history.push(`/polls/${poll.id}`)
  }

  useEffect(() => {
    fetchPolls()
  }, [filters])
  return (
    <Wrapper>
      <Box p={2}>
        <Box marginBottom="10px">
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
              <Select
                name="status"
                onChange={(e) => {
                  setFilters({ ...filters, status: e.target.value })
                }}
              >
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
                value={filters.search}
                placeholder="Buscar encuesta por título"
                onChange={searchChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={toggleOpen}>Nueva Encuesta</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          {loading ? (
            <>
              <PollCard loader />
              <PollCard loader />
              <PollCard loader />
            </>
          ) : (
            <>
              {pollList.length > 0 ? (
                pollList.map((item) => (
                  <PollCard key={`poll-card-${item.id}`} poll={item} />
                ))
              ) : (
                <EmptyState
                  message={
                    filters.search
                      ? `No se encontraron resultados para: ${filters.search}`
                      : 'No se crearon encuestas'
                  }
                />
              )}
            </>
          )}
          <PollAnswerRow />

          <Pagination
            page={filters.page}
            totalCount={Math.fround(total / filters.size)}
            onPageChange={(__, value) => {
              setFilters({ ...filters, page: value })
            }}
          />
        </Box>

        <PollCreate
          open={open}
          onClose={toggleOpen}
          submitFunction={createPoll}
          successMessage="Encuesta creada correctamente"
          successFunction={redirectToPoll}
        />
      </Box>
    </Wrapper>
  )
}

export default PollHeader
