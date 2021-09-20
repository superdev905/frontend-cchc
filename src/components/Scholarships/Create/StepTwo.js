import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, InputLabel, Typography } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { useToggle } from '../../../hooks'
import { Button, SubmitButton } from '../../UI'
import scholarshipsActions from '../../../state/actions/scholarships'
import useStyles from './styles'
import filesActions from '../../../state/actions/files'

import { FilePicker } from '../../Shared'

const StepTwo = ({ type }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  //  const { enqueueSnackbar } = useSnackbar()
  const { create } = useSelector((state) => state.scholarships)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const [attachments, setAttachments] = useState([
    {
      name: 'CERTIFICADO EGRESO ENSEÑANZA MEDIA',
      isRequired: false,
      key: 'CERTIFICADO_EGRESO_ENSEÑANZA_MEDIA',
      url: '',
      size: '',
      date: ''
    },
    {
      name: 'LIQUIDACIÓN SUELDO',
      isRequired: true,
      key: 'LIQUIDACION_SUELDO',
      url: '',
      size: '',
      date: ''
    },
    {
      name: 'CERTIFICADO DE NOTAS O NEM',
      isRequired: true,
      key: 'CERTIFICADO_DE_NOTAS_O_NEM',
      url: '',
      size: '',
      date: ''
    },
    {
      name: 'CERTIFICADO ALUMNO REGULAR',
      isRequired: true,
      key: 'CERTIFICADO_ALUMNO_REGULAR',
      url: '',
      size: '',
      date: ''
    },
    {
      name: 'CERTIFICADO DE NACIMIENTO PARA ASIGNACION FAMILIAR',
      isRequired: true,
      key: 'CERTIFICADO_DE_NACIMIENTO_PARA _ASIGNACION_FAMILIAR',
      url: '',
      size: '',
      date: ''
    },
    {
      name: 'CERTIFICADO DE COTIZACIONES HISTORICA TRABAJADOR',
      isRequired: false,
      key: 'CERTIFICADO_DE_COTIZACIONES_HISTORICA_TRABAJADOR',
      url: '',
      size: '',
      date: ''
    },
    {
      name: 'FICHA DE POSTULACIÓN CON FIRMA Y TIMBRE DE LA EMPRESA',
      isRequired: true,
      key: 'FICHA_DE_POSTULACIÓN_CON_FIRMA_Y_TIMBRE DE_LA_EMPRESA',
      url: '',
      size: '',
      date: ''
    },
    {
      name: 'COTIZACIÓN DE LA CARRERA',
      isRequired: false,
      key: 'COTIZACIÓN_DE_LA_CARRERA',
      url: '',
      size: '',
      date: ''
    },
    {
      name: 'CERTIFICADO DE AFILIACION AFP',
      isRequired: false,
      key: 'CERTIFICADO_DE_AFILIACION_AFP',
      url: '',
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
    dispatch(scholarshipsActions.createApplications(data)).then(() => {
      dispatch(
        scholarshipsActions.updateCreate({
          ...create,
          step: create.step + 1
        })
      )
    })
  }

  const goBack = () => {
    dispatch(
      scholarshipsActions.updateCreate({ ...create, step: create.step - 1 })
    )
  }

  const handleUploadFile = async (file, key) => {
    console.log(file)
    const formData = new FormData()
    formData.append('file', file)
    const response = await dispatch(filesActions.uploadFile(formData))
    console.log(response, key)
    const temp = [...attachments]
    const newAttachment = temp.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          fileName: response.file_name,
          fileKey: response.file_key,
          fileUrl: response.file_url,
          fileSize: response.file_size,
          uploadDate: response.upload_date
        }
      }
      return item
    })
    setAttachments(newAttachment)
  }

  return (
    <Box className={classes.form}>
      <Typography className={classes.subtitle} align="center">
        Subir Archivos
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {' '}
          {attachments.map((item) => (
            <Grid item xs={12} md={6}>
              <InputLabel style={{ fontSize: '15px', marginBottom: '12px' }}>
                {item.name}
              </InputLabel>
              <>
                <FilePicker
                  onChangeImage={(e) => {
                    handleUploadFile(e, item.key)
                  }}
                />
              </>
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
        <SubmitButton onClick={onCreate}>
          {create.type === 'UPDATE' ? 'Actualizar' : 'Crear'} Postulación
        </SubmitButton>
      </Box>
    </Box>
  )
}

export default StepTwo
