import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Document, Page, pdfjs } from 'react-pdf'
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import CloseIcon from '@material-ui/icons/Close'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import Lightbox from 'react-awesome-lightbox'
import 'react-awesome-lightbox/build/style.css'
import PropTypes from 'prop-types'
import fileActions from '../../state/actions/files'
import validURL from '../../validations/url'

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
  Icon: {
    fill: theme.palette.common.white
  },
  ZoomInIcon: {
    fill: theme.palette.common.white
  },
  image: {
    width: '70%',
    height: 'auto'
  },
  fileWrapper: {
    '& canvas': {
      margin: '0 auto',
      width: '100%'
    },
    width: '100%'
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
      reader.onloadend = () => {
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
        <Grid>
          <IconButton className={classes.ZoomInIcon}>
            <ZoomInIcon className={classes.ZoomInIcon} />
          </IconButton>
          <IconButton>
            <ZoomOutIcon className={classes.Icon} />
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon className={classes.Icon} />
          </IconButton>
        </Grid>
      </Box>

      <DialogContent className={classes.content}>
        {loading ? (
          <>
            <CircularProgress size={40} thickness={5} />
          </>
        ) : (
          <Box className={classes.box}>
            {fileType === 'application/pdf' ? (
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

const VisorWrapper = ({ open, onClose, fileName }) => (
  <>
    {validURL(fileName) ? (
      <>
        <Lightbox onClose={onClose} image={fileName} title={fileName} />
      </>
    ) : (
      <FileVisor open={open} onClose={onClose} fileName={fileName} />
    )}
  </>
)

export default VisorWrapper
