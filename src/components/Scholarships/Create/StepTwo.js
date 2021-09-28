import { useState } from 'react'
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

const StepTwo = ({ type }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { create } = useSelector((state) => state.scholarships)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const [attachments, setAttachments] = useState([
    {
      name: 'CERTIFICADO EGRESO ENSEÑANZA MEDIA',
      isRequired: false,
      key: 'CERTIFICADO_EGRESO_ENSEÑANZA_MEDIA',
      fileUrl: '',
      size: '',
      date: ''
    },
    {
      name: 'LIQUIDACIÓN SUELDO',
      fileName: '',
      isRequired: true,
      key: 'LIQUIDACION_SUELDO',
      fileUrl: '',
      size: '',
      date: ''
    },
    {
      name: 'CERTIFICADO DE NOTAS O NEM',
      isRequired: true,
      key: 'CERTIFICADO_DE_NOTAS_O_NEM',
      fileUrl: '',
      size: '',
      date: ''
    },
    {
      name: 'CERTIFICADO ALUMNO REGULAR',
      isRequired: true,
      key: 'CERTIFICADO_ALUMNO_REGULAR',
      fileUrl: '',
      size: '',
      date: ''
    },
    {
      name: 'CERTIFICADO DE NACIMIENTO PARA ASIGNACION FAMILIAR',
      isRequired: true,
      key: 'CERTIFICADO_DE_NACIMIENTO_PARA _ASIGNACION_FAMILIAR',
      fileUrl: '',
      size: '',
      date: ''
    },
    {
      name: 'CERTIFICADO DE COTIZACIONES HISTORICA TRABAJADOR',
      isRequired: false,
      key: 'CERTIFICADO_DE_COTIZACIONES_HISTORICA_TRABAJADOR',
      fileUrl: '',
      size: '',
      date: ''
    },
    {
      name: 'FICHA DE POSTULACIÓN CON FIRMA Y TIMBRE DE LA EMPRESA',
      isRequired: true,
      key: 'FICHA_DE_POSTULACIÓN_CON_FIRMA_Y_TIMBRE DE_LA_EMPRESA',
      fileUrl: '',
      size: '',
      date: ''
    },
    {
      name: 'COTIZACIÓN DE LA CARRERA',
      isRequired: false,
      key: 'COTIZACIÓN_DE_LA_CARRERA',
      fileUrl: '',
      size: '',
      date: ''
    },
    {
      name: 'CERTIFICADO DE AFILIACION AFP',
      isRequired: false,
      key: 'CERTIFICADO_DE_AFILIACION_AFP',
      fileUrl: '',
      size: '',
      date: ''
    }
  ])

  const onCreate = () => {
    const data = {
      ...create.application,
      attachments,
      date: new Date()
    }

    data.attachments = data.attachments.filter((item) => item.fileUrl !== '')
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
      item.key === key
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
    await dispatch(filesActions.deleteFile(key))
    const newAttachment = attachments.map((item) =>
      item.key === key
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

  return (
    <Box className={classes.form}>
      <Typography className={classes.subtitle} align="center">
        Adjuntar Archivos
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {' '}
          {attachments.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <InputLabel
                required={item.isRequired}
                style={{ fontSize: '15px', marginBottom: '12px' }}
              >
                {item.name}
              </InputLabel>

              <FilePostulation
                onDelete={() => handleDeleteFile(item.key)}
                fileKey={item.fileKey}
                id={`${item.key}-${index}`}
                onChangeImage={(e) => {
                  handleUploadFile(e, item.key)
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
