import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, IconButton, Typography } from '@material-ui/core'
import { Image as ImageIcon, Close as CloseIcon } from '@material-ui/icons'
import useStyles from './styles'
import pdfIcon from '../FileThumbnail/pdf.png'

const FilePicker = ({ id, onChange, acceptedFiles, onDelete, icon }) => {
  const classes = useStyles()
  const [uploadImg, setUploadImg] = useState(null)
  const [preview, setPreview] = useState(null)

  const getPreview = (currentFile) => {
    if (!currentFile) return <></>
    if (!currentFile.file) return <></>
    if (currentFile.type.includes('image')) {
      return (
        <Box
          className={classes.imgPreview}
          style={{ backgroundImage: `url(${currentFile.file})` }}
        />
      )
    }
    if (currentFile.type === 'application/pdf') {
      return (
        <Box p={2} className={classes.pdfPreview}>
          <img src={pdfIcon} className={classes.pdfIcon} />
          {currentFile.filename}
        </Box>
      )
    }
    return <></>
  }

  const onChangeFile = (e) => {
    e.preventDefault()
    if (e.target?.files.length === 1) {
      const file = e.target.files[0]
      setUploadImg(file)
    }
  }
  const onRemove = () => {
    setUploadImg(null)
    setPreview(null)
    onDelete()
  }

  const dataPreview = (currentFile) => {
    if (!currentFile) return null
    if (!currentFile.file) setPreview({ filename: '' })
    if (currentFile.type.includes('application/pdf')) {
      setPreview({
        filename: currentFile.name,
        file: 'PDF',
        type: currentFile.type
      })
    }
    if (currentFile.type.includes('image/')) {
      const fileReader = new window.FileReader()

      fileReader.readAsDataURL(currentFile)
      fileReader.onload = () => {
        setPreview({ file: fileReader.result, type: currentFile.type })
      }
    }
    return null
  }

  useEffect(() => {
    if (uploadImg) {
      onChange(uploadImg)
    }
    dataPreview(uploadImg)
  }, [uploadImg])
  return (
    <Box>
      {preview ? (
        <Box
          position="relative"
          display="flex"
          className={classes.previewWrapper}
        >
          <IconButton className={classes.deleteImgIcon} onClick={onRemove}>
            <CloseIcon />
          </IconButton>

          {getPreview(preview)}
        </Box>
      ) : (
        <Box className={classes.uploadRoot}>
          <input
            className={classes.input}
            type="file"
            id={id}
            accept={acceptedFiles}
            onChange={onChangeFile}
          ></input>
          <label className={classes.label} htmlFor={id}>
            <Box p={2} className={classes.labelWrapper}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box>{icon}</Box>
                <IconButton onClick={onRemove}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography>
                <strong>Selecciona un archivo</strong>
              </Typography>
              <Typography variant="subtitle2">Tamaño máximo 25mb</Typography>
            </Box>
          </label>
        </Box>
      )}
    </Box>
  )
}

FilePicker.defaultProps = {
  acceptedFiles: ['image/*', '.pdf'],
  id: 'file-picker',
  icon: <ImageIcon fontSize="large" color="primary" />
}
FilePicker.propTypes = {
  onChange: PropTypes.func,
  acceptedFiles: PropTypes.array
}

export default FilePicker
