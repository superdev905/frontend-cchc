import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
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
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { approvedScholarship } = useSelector((state) => state.scholarships)

  const redirectToApplication = (idApplication) => {
    history.push(`/postulations/${idApplication}`)
  }

  const goBack = () => {
    history.goBack()
  }

  const fetchData = () => {
    setLoading(true)
    dispatch(scholarshipsActions.getApprovedScholarship(idApproved))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [idApproved])

  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Box>
            <IconButton onClick={goBack}>
              <BackIcon />
            </IconButton>
          </Box>
          <Box>
            <PageHeading>
              Beca aprobada {approvedScholarship && approvedScholarship.id}
            </PageHeading>
            <TimeStamp
              loading={loading}
              text={
                approvedScholarship &&
                approvedScholarship.createdTimeStamp.toLowerCase()
              }
            />
          </Box>
        </Box>
        <Box>
          <Button
            onClick={() =>
              redirectToApplication(approvedScholarship.postulation.id)
            }
          >
            Ver postulación
          </Button>
        </Box>
      </Box>
      <ApprovedStatistics />
      <ApprovedTrackingList />
      <BenefitsList />
    </Wrapper>
  )
}

export default ApprovedScholarship
