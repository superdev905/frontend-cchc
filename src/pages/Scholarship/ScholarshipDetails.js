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
import ApproveDialog from '../../components/Scholarships/Approve/ApproveDialog'

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
    dispatch(scholarshipsActions.deletePostulation(id, { state: 'DELETED' }))
      .then(() => {
        changeSuccess(true, () => {
          toggleOpenDelete()
          enqueueSnackbar('Postulación eliminada', { variant: 'success' })
          history.push('/scholarships')
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
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
                `Postulacion ${application?.scholarshipType.name}`
              )}{' '}
            </PageHeading>
            <Typography className={classes.createdTime}>
              <CalendarIcon className={classes.icon} />
              {!loading && `Creado ${application?.createdTimeStamp}`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button danger onClick={toggleOpenDelete}>
            Eliminar
          </Button>

          <Button onClick={toggleOpenEdit}>Editar</Button>
          <Button onClick={approveDialog}>Aprobar</Button>
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
          message={<span>¿Estás seguro de eliminar esta postulación: </span>}
          onConfirm={() => onDelete(application.id)}
        />
      )}

      <ApproveDialog open={showCreateModal} onClose={toggleCreateModal} />
    </Wrapper>
  )
}
export default ScholarshipDetails
