import { useEffect, useState } from 'react'
import { FiArrowLeft as ArrowBack } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Skeleton } from '@material-ui/lab'
import {
  Box,
  Chip,
  Drawer,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useSuccess, useToggle } from '../../hooks'
import { formatDate } from '../../formatters'
import protocolsActions from '../../state/actions/protocols'
import { Button, LabeledRow, StatusChip, Text } from '../UI'
import ProtocolDialog from './Dialog'
import { ConfirmDelete, FileThumbnail, FileVisor } from '../Shared'
import { UserCard } from '../Users'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 800
    }
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  moduleChip: {
    marginRight: 8
  }
}))

const DetailsDraw = ({ open, onClose, protocolId }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { protocol } = useSelector((state) => state.protocols)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const updateProtocol = (values) =>
    dispatch(protocolsActions.updateProtocol(protocolId, values))

  const deleteProtocol = (id) => {
    setDeleting(true)
    dispatch(protocolsActions.deleteProtocol(id))
      .then(() => {
        setDeleting(false)
        enqueueSnackbar('Protocolo eliminado', { variant: 'success' })
        changeSuccess(true, () => {
          onClose()
        })
      })
      .catch((err) => {
        setDeleting(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const fetchProtocol = () => {
    setLoading(true)
    dispatch(protocolsActions.getProtocolDetails(protocolId))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (open) {
      fetchProtocol()
    }
  }, [open])

  return (
    <Drawer
      classes={{ paper: classes.root }}
      anchor="right"
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
    >
      <Box px={3} py={4}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={'space-between'}
        >
          <Box display="flex" alignItems="center">
            <IconButton onClick={onClose}>
              <ArrowBack />
            </IconButton>
            <Text loading={loading} className={classes.title}>
              {`${protocol?.title}`}
            </Text>
          </Box>
          <Box>
            <Button onClick={toggleOpenEdit}>Editar</Button>
            <Button danger onClick={toggleOpenDelete}>
              Eliminar
            </Button>
          </Box>
        </Box>
        <Box my={2}>
          <LabeledRow label={'Clasificación'}>
            <Text loading={loading} loaderWidth={'60%'}>
              {protocol?.classification}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Fecha de Inicio'}>
            <Text loading={loading} loaderWidth="45%">
              {formatDate(protocol?.startDate)}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Fecha de Fin'}>
            <Text loading={loading} loaderWidth="45%">
              {formatDate(protocol?.endDate)}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Estado'}>
            <Text loading={loading} loaderWidth="75%">
              <StatusChip
                label={protocol?.isValid ? 'Vigente' : 'No vigente'}
                success={protocol?.isValid}
                error={!protocol?.isValid}
              />
            </Text>
          </LabeledRow>
          <LabeledRow loaderWidth="100%" label={'Módulos'}>
            {loading ? (
              <Skeleton width={'100%'}></Skeleton>
            ) : (
              <>
                {protocol?.modules.map((item) => (
                  <Chip
                    className={classes.moduleChip}
                    label={item.module.name}
                    color="primary"
                  />
                ))}
              </>
            )}
          </LabeledRow>
          <Box mt={2}>
            <Typography className={classes.heading}>Archivo</Typography>
            {loading ? (
              <Skeleton width="100%" height={'30px'}></Skeleton>
            ) : (
              <>
                {protocol?.file && (
                  <FileThumbnail
                    fileName={protocol?.file?.fileName}
                    fileSize={protocol?.file?.fileSize}
                    date={protocol?.file?.uploadDate}
                    onView={toggleOpenVisor}
                  />
                )}
              </>
            )}
          </Box>
          <Box mt={2}>
            <Typography className={classes.heading}>Creado por:</Typography>
            {loading ? (
              <Skeleton width="100%" height={'70px'}></Skeleton>
            ) : (
              <>{protocol?.author && <UserCard user={protocol?.author} />}</>
            )}
          </Box>
        </Box>
        {openDelete && (
          <ConfirmDelete
            loading={deleting}
            message={
              <Box>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  ¿Estás seguro de eliminar este protocolo?
                </Typography>
              </Box>
            }
            open={openDelete}
            success={success}
            onClose={toggleOpenDelete}
            onConfirm={() => deleteProtocol(protocol.id)}
          />
        )}
        {openVisor && protocol && (
          <FileVisor
            open={openVisor}
            onClose={toggleOpenVisor}
            src={protocol.file.fileUrl}
            filename={protocol.file.fileUrl}
          />
        )}
        {openEdit && (
          <ProtocolDialog
            type="UPDATE"
            open={openEdit}
            onClose={toggleOpenEdit}
            data={protocol}
            submitFunction={updateProtocol}
            successMessage={'Protocolo actualizado!'}
            successFunction={fetchProtocol}
          />
        )}
      </Box>
    </Drawer>
  )
}

export default DetailsDraw
