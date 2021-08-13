import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { PageHeading } from '../../components/UI'
import { ContactList } from '../../components/Visit'

const Visit = () => {
  const { idVisit } = useParams()
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }
  return (
    <Box>
      <Box marginBottom="10px" display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <BackIcon />
        </IconButton>
        <PageHeading>Visita {idVisit}</PageHeading>
      </Box>
      <ContactList />
    </Box>
  )
}
export default Visit
