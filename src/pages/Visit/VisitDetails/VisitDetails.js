import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import assistanceActions from '../../../state/actions/assistance'
import { PageHeading } from '../../../components/UI'
import AttentionView from '../../../components/Visit/AttentionView'

const Visit = () => {
  const dispatch = useDispatch()
  const { idVisit } = useParams()
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  useEffect(() => {
    dispatch(assistanceActions.getEventDetails(idVisit)).then(() => {})
  }, [idVisit])
  return (
    <Box>
      <Box marginBottom="10px" display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <BackIcon />
        </IconButton>
        <PageHeading>Detalles de la Atención {idVisit}</PageHeading>
      </Box>
      <AttentionView />
    </Box>
  )
}
export default Visit
