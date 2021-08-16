import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import assistanceActions from '../../state/actions/assistance'
import { PageHeading } from '../../components/UI'
import {
  VisitDetails,
  ContactList,
  AttendedEmployees,
  AttendEmployees
} from '../../components/Visit'

const Visit = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { idVisit } = useParams()
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  useEffect(() => {
    setLoading(true)
    dispatch(assistanceActions.getEventDetails(idVisit)).then(() => {
      setLoading(false)
    })
  }, [idVisit])
  return (
    <Box>
      <Box marginBottom="10px" display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <BackIcon />
        </IconButton>
        <PageHeading>Visita {idVisit}</PageHeading>
      </Box>
      <VisitDetails fetching={loading} />
      <ContactList />
      <AttendedEmployees />
      <AttendEmployees />
    </Box>
  )
}
export default Visit
