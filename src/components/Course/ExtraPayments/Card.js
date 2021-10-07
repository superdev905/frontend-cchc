import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { Skeleton } from '@material-ui/lab'
import { ConfirmDelete, FileThumbnail, FileVisor } from '../../Shared'
import { formatDate } from '../../../formatters'
import { EmptyState } from '../../UI'
import { useToggle, useSuccess } from '../../../hooks'
import coursesActions from '../../../state/actions/courses'
import files from '../../../state/actions/files'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    marginBottom: 10
  },
  paper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  date: {
    fontSize: 15,
    marginBottom: 5
  },
  info: {
    fontWeight: 'bold'
  }
}))

const ExtraPaymentsCard = ({ loader }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentExtraPayment, setCurrentExtraPayment] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { extraPaymentsList } = useSelector((state) => state.courses)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchExtraPayments = () => {
    setLoading(true)
    dispatch(coursesActions.getExtraPayments({ courseId: idCourse })).then(
      () => {
        setLoading(false)
      }
    )
  }

  console.log(loading)

  const deleteExtraPayment = (id) => {
    dispatch(
      coursesActions.patchExtraPayment(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchExtraPayments()
        enqueueSnackbar('Pago eliminado exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchExtraPayments()
  }, [])

  return (
    <Box className={classes.root}>
      <Box>
        {loader ? (
          <Box display="flex" marginBottom="10px">
            <Skeleton width="30px"></Skeleton>
            <Skeleton width="40%" style={{ marginLeft: '10px' }}></Skeleton>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {extraPaymentsList.length === 0 ? (
              <EmptyState message="No hay pagos extra registrados" />
            ) : (
              <>
                {extraPaymentsList?.map((item, index) => (
                  <Box
                    mb="15px"
                    key={`card--${index}`}
                    border="1px solid"
                    borderRadius={'8px'}
                    width="100%"
                  >
                    <Box p={2}>
                      <Box>
                        <Typography className={classes.date}>
                          {formatDate(new Date())}
                        </Typography>
                      </Box>
                      <Box
                        p={2}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography className={classes.info}>
                          Item : {item.item}
                        </Typography>
                        <Typography className={classes.info}>
                          {item.amount}
                        </Typography>
                      </Box>
                      <FileThumbnail
                        fileName={item.file.fileName}
                        date={item.file.uploadDate}
                        fileSize={item.file.fileSize}
                        onView={() => {
                          toggleOpenVisor()
                          setCurrentExtraPayment(item)
                        }}
                        onDownload={() => {
                          dispatch(files.downloadFile(item.file.fileUrl))
                        }}
                        onDelete={() => {
                          toggleOpenDelete()
                          setCurrentExtraPayment(item)
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </>
            )}
          </Grid>
        )}
      </Box>
      {openVisor && currentExtraPayment && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          src={currentExtraPayment.file.fileUrl}
          filename={currentExtraPayment.file.fileName}
        />
      )}

      {currentExtraPayment && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteExtraPayment(currentExtraPayment.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar este pago?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}
    </Box>
  )
}

export default ExtraPaymentsCard
