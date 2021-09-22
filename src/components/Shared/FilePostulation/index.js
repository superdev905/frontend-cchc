import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import {
  //  Image as ImageIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@material-ui/icons'
import { FiUpload } from 'react-icons/fi'
import { useToggle } from '../../../hooks'
import useStyles from './styles'
import pdfIcon from '../FileThumbnail/pdf.png'
import { FileVisor } from '..'

const FilePostulation = ({ onChangeImage, onView, id, onDelete, fileKey }) => {
  const classes = useStyles()
  const [uploadImg, setUploadImg] = useState(null)
  const [preview, setPreview] = useState(null)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  const getPreview = (currentFile) => {
    if (!currentFile) return <></>
    if (!currentFile.file) return <></>
    if (currentFile.type.includes('image')) {
      return (
        <img
          alt="upload preview"
          className={classes.imgPreview}
          src={currentFile.file}
        />
      )
    }
    if (currentFile.type === 'application/pdf') {
      return (
        <Box>
          <Box p={2} className={classes.pdfPreview}>
            <img src={pdfIcon} className={classes.pdfIcon} />
            <Grid xs={12} md={12} lg={12}>
              {currentFile.filename}
            </Grid>
          </Box>
          <Grid xs={6} md={6} lg={6} className={classes.filesize}>
            {currentFile.filesize}
          </Grid>
        </Box>
      )
    }
    return <></>
  }

  const onChange = (e) => {
    e.preventDefault()
    if (e.target?.files.length === 1) {
      const file = e.target.files[0]
      setUploadImg(file)
    }
  }
  const onRemove = () => {
    setUploadImg(null)
    setPreview(null)
    onDelete(fileKey)
  }

  const dataPreview = (currentFile) => {
    if (!currentFile) return null
    if (!currentFile.file) setPreview({ filename: '', filesize: '' })
    if (currentFile.type.includes('application/pdf')) {
      setPreview({
        filename: currentFile.name,
        filesize: `${currentFile.size} KB`,
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
    onChangeImage(uploadImg)
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
          <IconButton className={classes.viewImgIcon} onClick={onView}>
            <ViewIcon />
          </IconButton>

          <IconButton className={classes.deleteImgIcon} onClick={onRemove}>
            <DeleteIcon />
          </IconButton>

          {getPreview(preview)}
        </Box>
      ) : (
        <Box className={classes.uploadRoot}>
          <input
            className={classes.input}
            type="file"
            id={id}
            accept={['image/*', '.pdf']}
            onChange={onChange}
          ></input>
          <label className={classes.label} htmlFor={id}>
            <Box p={2} className={classes.labelWrapper}>
              <FiUpload fontSize="large" color="primary" />
              <Typography>
                <strong>Selecciona un archivo</strong>
              </Typography>
            </Box>
          </label>
        </Box>
      )}
      {openVisor && <FileVisor open={openVisor} onClose={toggleOpenVisor} />}
    </Box>
  )
}

FilePostulation.propTypes = {
  onChange: PropTypes.func
}

FilePostulation.defaultProps = {
  id: 'file--picker'
}

export default FilePostulation
