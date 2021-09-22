import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import scholarshipsActions from '../../state/actions/scholarships'
import { Button, PageHeading, TimeStamp, Wrapper } from '../../components/UI'
import {
  ApprovedStatistics,
  ApprovedTrackingList,
  BenefitsList
} from '../../components/ApprovedScholarship'

const ApprovedScholarship = () => {
  const dispatch = useDispatch()
  const { idApproved } = useParams()
  const { approvedScholarship } = useSelector((state) => state.scholarships)

  const fetchData = () => {
    dispatch(scholarshipsActions.getApprovedScholarship(idApproved))
  }

  useEffect(() => {
    fetchData()
  }, [idApproved])

  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Box>
            <IconButton>
              <BackIcon />
            </IconButton>
          </Box>
          <Box>
            <PageHeading>
              Beca aprobada {approvedScholarship && approvedScholarship.id}
            </PageHeading>
            <TimeStamp loading={false} text={'Hace 3 días'} />
          </Box>
        </Box>
        <Box>
          <Button>Ver detalles</Button>
        </Box>
      </Box>
      <ApprovedStatistics />
      <ApprovedTrackingList />
      <BenefitsList />
    </Wrapper>
  )
}

export default ApprovedScholarship
