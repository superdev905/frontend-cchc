import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton, Typography } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import scholarshipsActions from '../../state/actions/scholarships'
import { Button, PageHeading, TimeStamp, Wrapper } from '../../components/UI'
import {
  ApprovedStatistics,
  ApprovedTrackingList,
  BenefitsList
} from '../../components/ApprovedScholarship'
import { useToggle } from '../../hooks'
import SalarySettlement from '../../components/ApprovedScholarship/SalarySettlement'

const ApprovedScholarship = () => {
  const dispatch = useDispatch()
  const { idApproved } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { approvedScholarship } = useSelector((state) => state.scholarships)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

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

  const onCreateSalary = () => {
    console.log('gfgfg')
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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>
          Liquidación de Sueldo
        </Typography>
        <Button onClick={toggleOpenAdd}>Nueva Liquidación</Button>
      </Box>

      {openAdd && (
        <SalarySettlement
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={onCreateSalary}
          // successFunction={}
          successMessage={'Liquidación de sueldo agregada'}
        />
      )}
    </Wrapper>
  )
}

export default ApprovedScholarship
