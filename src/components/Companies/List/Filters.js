import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import companiesActions from '../../../state/actions/companies'
import { Button, SearchInput, Wrapper } from '../../UI'

const Filters = () => {
  const dispatch = useDispatch()
  const { showCreateModal } = useSelector((state) => state.companies)
  const addButtonClick = () => {
    dispatch(companiesActions.toggleCreateModal(showCreateModal))
  }
  return (
    <Wrapper>
      <Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <SearchInput />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={addButtonClick}>Nueva empresa</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default Filters
