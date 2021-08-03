import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Document, Page, pdfjs } from 'react-pdf'
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import fileActions from '../../state/actions/files'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    backgroundColor: 'transparent'
  },
  bar: {
    minHeight: '65px',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeIcon: {
    fill: theme.palette.common.white
  },
  image: {
    width: '50%',
    height: '50%'
  },
  fileWrapper: {
    '& canvas': {
      margin: '0 auto'
    }
  }
}))

const FileVisor = ({ open, onClose, fileName }) => {
  const dispatch = useDispatch()
  const [fileData, setFileData] = useState(null)
  const [fileType, setFileType] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imgData, setImgData] = useState(null)
  const [pageNumber] = useState(1)

  const classes = useStyles()

  const getFileData = (key) => {
    setLoading(true)
    dispatch(fileActions.getFile(key)).then((file) => {
      setFileData(file.blob)
      setFileType(file.type)
      setLoading(false)
    })
  }
  useEffect(() => {
    if (fileData) {
      const reader = new FileReader()
      reader.readAsDataURL(fileData)
      reader.onloadend = function () {
        const base64data = reader.result
        setImgData(base64data)
      }
    }
  }, [fileData])

  useEffect(() => {
    if (open) {
      getFileData(fileName)
    }
  }, [open, fileName])
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={true}
      classes={{ paper: classes.modalRoot }}
    >
      <Box p={2} className={classes.bar}>
        <Typography>{fileName}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      </Box>

      <DialogContent>
        {loading ? (
          <>
            <CircularProgress size={40} thickness={5} color={'primary'} />
          </>
        ) : (
          <Box>
            {fileType === 'pdf' ? (
              <Box textAlign="center" className={classes.fileWrapper}>
                <Document file={imgData}>
                  <Page pageNumber={pageNumber} />
                </Document>
              </Box>
            ) : (
              <Box textAlign="center" className={classes.fileWrapper}>
                {imgData && <img className={classes.image} src={imgData} />}
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

FileVisor.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  fileName: PropTypes.string
}

export default FileVisor
