import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import {
  CalendarToday as CalendarIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { useSnackbar } from 'notistack'
import { PageHeading, Button, Wrapper } from '../../components/UI'
import { useToggle, useSuccess } from '../../hooks'
import scholarshipsActions from '../../state/actions/scholarships'
import PostulationDetails from '../../components/Scholarships/PostulationDetails'
import CreateDialog from '../../components/Scholarships/Create/CreateDialog'
import { ConfirmDelete } from '../../components/Shared'
import ApproveDialog from '../../components/Scholarships/Approve'
import Can from '../../components/Can'

const useStyles = makeStyles((theme) => ({
  head: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  title: {
    color: theme.palette.common.black
  },
  createdTime: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: theme.palette.gray.gray600,
    marginRight: 5
  }
}))

const ScholarshipDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { idPostulation } = useParams()
  const { application, showCreateModal } = useSelector(
    (state) => state.scholarships
  )

  const { success, changeSuccess } = useSuccess()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const goBack = () => {
    history.goBack()
  }

  const fetchPostulationDetails = () => {
    setLoading(true)
    dispatch(scholarshipsActions.getPostulationDetails(idPostulation)).then(
      () => {
        setLoading(false)
      }
    )
  }

  const updatePostulation = (values) =>
    dispatch(
      scholarshipsActions.updatePostulation(idPostulation, {
        state: application.state,
        created_by: application.createdBy,
        ...values
      })
    )

  const onDelete = (id) => {
    if (application.state === 'DELETED') {
      toggleOpenDelete()
      enqueueSnackbar('Esta postulaci??n ya fue eliminada', {
        variant: 'success',
        autoHideDuration: 1500
      })
    } else {
      dispatch(scholarshipsActions.deletePostulation(id, { state: 'DELETED' }))
        .then(() => {
          changeSuccess(true, () => {
            toggleOpenDelete()
            enqueueSnackbar('Postulaci??n eliminada', { variant: 'success' })
            history.push('/scholarships')
          })
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  }

  const approveDialog = (id) => {
    dispatch(scholarshipsActions.toggleCreateModal(showCreateModal, id))
  }

  const toggleCreateModal = () => {
    dispatch(scholarshipsActions.toggleCreateModal(showCreateModal))
  }

  useEffect(() => {
    fetchPostulationDetails()
  }, [])

  return (
    <Wrapper p={1}>
      <Box className={classes.head}>
        <Box display="flex">
          <Box>
            <IconButton onClick={goBack}>
              <BackIcon />
            </IconButton>
          </Box>
          <Box>
            <PageHeading className={classes.title}>
              {loading ? (
                <Skeleton width="80%" />
              ) : (
                `Postulaci??n ${application?.id}: ${application?.beneficiaryNames}`
              )}{' '}
            </PageHeading>
            <Typography className={classes.createdTime}>
              <CalendarIcon className={classes.icon} />
              {!loading && `Creado ${application?.createdTimeStamp}`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Can
            availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
            yes={() => (
              <>
                <Button
                  danger
                  disabled={application?.state === 'DELETED'}
                  onClick={toggleOpenDelete}
                >
                  Eliminar
                </Button>

                <Button
                  disabled={application?.state === 'DELETED'}
                  onClick={toggleOpenEdit}
                >
                  Editar
                </Button>
              </>
            )}
            no={() => null}
          />
          <Can
            availableTo={['PROJECTS', 'ADMIN']}
            yes={() => (
              <Button
                disabled={application?.state === 'DELETED'}
                onClick={approveDialog}
              >
                Revisar
              </Button>
            )}
            no={() => null}
          />
        </Box>
      </Box>
      <PostulationDetails loading={loading} />

      {application && openEdit && (
        <CreateDialog
          type="UPDATE"
          open={openEdit}
          onClose={toggleOpenEdit}
          data={application}
          submitFunction={updatePostulation}
          successFunction={fetchPostulationDetails}
        />
      )}

      {application && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          success={success}
          message={<span>??Est??s seguro de eliminar esta postulaci??n: </span>}
          onConfirm={() => onDelete(application.id)}
        />
      )}

      {showCreateModal && (
        <ApproveDialog
          open={showCreateModal}
          onClose={toggleCreateModal}
          successFunction={fetchPostulationDetails}
        />
      )}
    </Wrapper>
  )
}
export default ScholarshipDetails
