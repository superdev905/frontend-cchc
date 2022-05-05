import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import assistanceActions from '../../state/actions/assistance'
import commonActions from '../../state/actions/common'
import { PageHeading } from '../../components/UI'
import {
  VisitDetails,
  ContactList,
  AttendedEmployees,
  AttendEmployees,
  VisitStatistics
} from '../../components/Visit'
import ConstructionAttend from '../../components/Visit/ConstructionAttend/ConstructionAttend'
import { VisitDotacion } from '../../components/Assistance'

const Visit = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { idVisit } = useParams()
  const history = useHistory()
  const { visit } = useSelector((state) => state.assistance)

  const goBack = () => {
    history.goBack()
  }

  const getDetails = () => {
    setLoading(true)
    dispatch(assistanceActions.getEventDetails(idVisit)).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getDetails()
  }, [idVisit])

  useEffect(() => {
    dispatch(commonActions.getAssistanceTypes())
  }, [])

  return (
    <Box>
      <Box marginBottom="10px" display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <BackIcon />
        </IconButton>
        <PageHeading>{`Visita ${idVisit}`}</PageHeading>
      </Box>
      <VisitDetails fetching={loading} fetchDetails={getDetails} />

      <ContactList />
      <AttendedEmployees
        isDisabled={
          visit?.status === 'CANCELADA' ||
          visit?.status === 'TERMINADA' ||
          visit?.is_close_pending ||
          visit?.is_close ||
          visit?.is_close_pending
        }
      />
      <AttendEmployees />
      <VisitDotacion fetchDetails={getDetails} />
      <ConstructionAttend />
      <VisitStatistics />
    </Box>
  )
}
export default Visit
