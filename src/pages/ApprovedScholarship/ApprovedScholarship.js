import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton, Typography } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import scholarshipsActions from '../../state/actions/scholarships'
import {
  Button,
  EmptyState,
  LabeledRow,
  PageHeading,
  Text,
  TimeStamp,
  Wrapper
} from '../../components/UI'
import {
  ApprovedStatistics,
  ApprovedTrackingList,
  BenefitsList
} from '../../components/ApprovedScholarship'
import { useToggle, useSuccess } from '../../hooks'
import SalaryLiquidation from '../../components/ApprovedScholarship/SalaryLiquidation'
import {
  ConfirmDelete,
  FileThumbnail,
  FileVisor
} from '../../components/Shared'

const ApprovedScholarship = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { idApproved } = useParams()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { success, changeSuccess } = useSuccess()
  const { approvedScholarship, liquidationList } = useSelector(
    (state) => state.scholarships
  )
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

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
    setLoading(true)
    dispatch(
      scholarshipsActions.createSalaryLiquidation({
        ...values
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true, () => {
          getAllSalaries()
          enqueueSnackbar('Liquidación de sueldo agregada', {
            variant: 'success'
          })
        })
        toggleOpenAdd()
      })
      .catch((err) => {
        changeSuccess(false)
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const updateSalaryLiquidation = (values) => {
    dispatch(
      scholarshipsActions.updateSalaryLiquidation(currentFile.id, {
        ...values,
        approvedScholarshipId: idApproved,
        uploadData: new Date(),
        currentFile
      })
    )
      .then(() => {
        changeSuccess(true, () => {
          getAllSalaries()
          enqueueSnackbar('Liquidación de sueldo actualizada', {
            variant: 'success'
          })
        })
        toggleOpenEdit()
      })
      .catch((err) => {
        changeSuccess(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onDeleteSalaryLiquidation = (id) => {
    setDeleting(true)
    dispatch(
      scholarshipsActions.patchSalaryLiquidation(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        toggleOpenDelete()
        changeSuccess(true, () => {
          getAllSalaries()
          enqueueSnackbar('Liquidación de sueldo eliminda', {
            variant: 'success'
          })
        })
      })
      .catch((err) => {
        changeSuccess(false)
        setDeleting(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
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
              {approvedScholarship &&
                `Beca aprobada ${approvedScholarship.id}: ${approvedScholarship.postulation.beneficiaryNames}`}
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
            Ver detalles
          </Button>
        </Box>
      </Box>
      <ApprovedStatistics />
      <Box p={1}>
        <Box display="flex" justifyContent="space-between">
          <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>
            Liquidaciónes de Sueldo
          </Typography>
          <Button onClick={toggleOpenAdd}>Registar nuevo</Button>
        </Box>
        <Box>
          {liquidationList.length === 0 ? (
            <EmptyState message="No tiene liquidaciones de suelo registradas" />
          ) : (
            <>
              {liquidationList.map((item, index) => (
                <Box
                  mb="15px"
                  key={`card--${index}`}
                  border="1px solid"
                  borderRadius={'8px'}
                >
                  <Box p={2}>
                    <FileThumbnail
                      fileName={item.fileName}
                      date={item.uploadDate}
                      fileSize={item.fileSize}
                      onView={() => {
                        toggleOpenVisor()
                        setCurrentFile(item)
                      }}
                      onEdit={() => {
                        toggleOpenEdit()
                        setCurrentFile(item)
                      }}
                      onDelete={() => {
                        toggleOpenDelete()
                        setCurrentFile(item)
                      }}
                    />
                    <LabeledRow label="Comentarios:">
                      <Text> {item.comments}</Text>
                    </LabeledRow>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
      <ApprovedTrackingList />
      <BenefitsList />

      {openAdd && (
        <SalaryLiquidation
          open={openAdd}
          onClose={toggleOpenAdd}
          successFunction={getAllSalaries}
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
          successFunction={getAllSalaries}
          submitFunction={updateSalaryLiquidation}
          successMessage={'Liquidación de sueldo actualizada'}
        />
      )}

      {openDelete && currentFile && (
        <ConfirmDelete
          open={openDelete}
          onConfirm={() => onDeleteSalaryLiquidation(currentFile.id)}
          loading={deleting}
          success={success}
          message={
            <Typography variant="h6" align="center">
              ¿Estas seguro de eliminar este archivo:{' '}
              <strong>{currentFile.name}</strong>?
            </Typography>
          }
          onClose={toggleOpenDelete}
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
