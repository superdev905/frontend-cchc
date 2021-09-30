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
import SalaryLiquidation from '../../components/ApprovedScholarship/SalaryLiquidation'
import { FileThumbnail, FileVisor } from '../../components/Shared'

const ApprovedScholarship = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { idApproved } = useParams()
  const [loading, setLoading] = useState(false)
  const { approvedScholarship, liquidationList } = useSelector(
    (state) => state.scholarships
  )
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()

  const [currentFile, setCurrentFile] = useState(null)

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

  const getAllSalaries = () => {
    setLoading(true)
    dispatch(
      scholarshipsActions.getAllSalaryLiquidations({ approvedId: idApproved })
    )
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const addSalaryLiquidation = (values) => {
    dispatch(
      scholarshipsActions.createSalaryLiquidation({
        ...values
      })
    )
  }

  const updateSalaryLiquidation = (values) => {
    dispatch(
      scholarshipsActions.updateSalaryLiquidation(currentFile.id, {
        ...values,
        approvedScholarshipId: idApproved,
        uploadData: new Date()
      })
    )
  }

  useEffect(() => {
    fetchData()
    getAllSalaries()
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
      <Box p={1}>
        <Box display="flex" justifyContent="space-between">
          <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>
            Liquidación de Sueldo
          </Typography>
          <Button onClick={toggleOpenAdd}>Nueva Liquidación</Button>
        </Box>
        <Wrapper>
          {liquidationList.map((item, index) => (
            <Box>
              <Box mb="15px" key={index}>
                <FileThumbnail
                  fileName={item.fileName}
                  onView={() => {
                    toggleOpenVisor()
                    setCurrentFile(item)
                  }}
                  onEdit={() => {
                    toggleOpenEdit()
                    setCurrentFile(item)
                  }}
                />
              </Box>
            </Box>
          ))}
        </Wrapper>
      </Box>

      {openAdd && (
        <SalaryLiquidation
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={addSalaryLiquidation}
          successMessage={'Liquidación de sueldo agregada'}
        />
      )}

      {openEdit && currentFile && (
        <SalaryLiquidation
          type="UPDATE"
          data={currentFile}
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={updateSalaryLiquidation}
          successMessage={'Liquidación de sueldo actualizada'}
        />
      )}

      {openVisor && currentFile && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          src={currentFile.fileUrl}
          filename={currentFile.fileName}
        />
      )}
    </Wrapper>
  )
}

export default ApprovedScholarship
