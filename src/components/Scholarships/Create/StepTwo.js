import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { Box, Grid, InputLabel, Typography } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { useToggle } from '../../../hooks'
import { Button, SubmitButton } from '../../UI'
import scholarshipsActions from '../../../state/actions/scholarships'
import useStyles from './styles'
import filesActions from '../../../state/actions/files'
import { FilePostulation } from '../../Shared'
import { scholarshipConfig } from '../../../config'

const StepTwo = ({ type }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { create } = useSelector((state) => state.scholarships)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const [attachments, setAttachments] = useState([])

  const onCreate = () => {
    const data = {
      ...create.application,
      attachments,
      date: new Date()
    }
    data.attachments = data.attachments.filter((item) => item.fileUrl !== '')
    console.log(data)
    if (!data.businessRelatedId) {
      delete data.businessRelatedId
    }
    if (!data.businessRelatedName) {
      delete data.businessRelatedName
    }
    if (!data.businessRelatedRut) {
      delete data.businessRelatedRut
    }

    if (create.type === 'CREATE') {
      dispatch(scholarshipsActions.createApplications(data)).then(() => {
        dispatch(
          scholarshipsActions.updateCreate({
            ...create,
            step: create.step + 1
          })
        )
      })
      history.push('/scholarships')
      enqueueSnackbar('Postulación creada exitosamente', {
        autoHideDuration: 1500,
        variant: 'success'
      })
    } else {
      dispatch(
        scholarshipsActions.updatePostulation(create.application.id, data)
      ).then(() => {
        enqueueSnackbar('Postulación actualizada exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
        dispatch(
          scholarshipsActions.updateCreate({
            ...create,
            step: create.step + 1
          })
        )
      })
    }
  }

  const goBack = () => {
    dispatch(
      scholarshipsActions.updateCreate({ ...create, step: create.step - 1 })
    )
  }

  const handleUploadFile = async (file, key) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await dispatch(filesActions.uploadFile(formData))
    const newAttachment = attachments.map((item) =>
      item.name === key
        ? {
            ...item,
            fileName: response.file_name,
            fileKey: response.file_key,
            fileUrl: response.file_url,
            fileSize: response.file_size,
            uploadDate: response.upload_date
          }
        : item
    )

    setAttachments(newAttachment)
  }

  const handleDeleteFile = async (key) => {
    await dispatch(filesActions.deleteFile())
    const newAttachment = attachments.map((item) =>
      item.name === key
        ? {
            ...item,
            fileName: '',
            fileKey: '',
            fileUrl: '',
            fileSize: '',
            uploadDate: ''
          }
        : item
    )
    setAttachments(newAttachment)
  }

  const getIsRequired = () => {
    const newFilter = attachments
      .filter((item) => item.isRequired === true)
      .filter((item) => item.fileUrl === '')

    return newFilter.length > 0
  }

  useEffect(() => {
    if (create.type === 'UPDATE') {
      setAttachments(create.application.attachments)
    } else {
      setAttachments(
        scholarshipConfig.postulationAttachments.map((item) => ({
          ...item,
          fileName: '',
          fileKey: '',
          fileUrl: '',
          fileSize: '',
          uploadDate: ''
        }))
      )
    }
  }, [create])

  return (
    <Box className={classes.form}>
      <Typography className={classes.subtitle} align="center">
        Adjuntar Archivos
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {attachments.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <InputLabel
                required={item.isRequired}
                style={{ fontSize: '15px', marginBottom: '12px' }}
              >
                {item.displayName}
              </InputLabel>
              <FilePostulation
                onDelete={() => handleDeleteFile(item.name)}
                fileKey={item.fileKey}
                id={`${item.key}-${index}`}
                onChangeImage={(e) => {
                  handleUploadFile(e, item.name)
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box className={classes.actions}>
        <Button startIcon={<BackIcon />} variant="outlined" onClick={goBack}>
          Anterior
        </Button>
        {type === 'UPDATE' && openVisor && (
          <FileVisor open={openVisor} onClose={toggleOpenVisor} />
        )}
        <SubmitButton disabled={getIsRequired()} onClick={onCreate}>
          {create.type === 'UPDATE' ? 'Actualizar' : 'Crear'} Postulación
        </SubmitButton>
      </Box>
    </Box>
  )
}

export default StepTwo
