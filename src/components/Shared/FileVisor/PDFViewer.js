import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Box, CircularProgress, IconButton } from '@material-ui/core'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import ResetIcon from '@material-ui/icons/ZoomOutMap'
import { usePdf } from '@mikecousins/react-pdf'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import ViewerDialog from './Dialog'
import files from '../../../state/actions/files'
import useStyles from './styles'

const PDFViewer = ({ url, filename, open, onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [page] = useState(1)
  const [scale, setScale] = useState(1)
  const canvasRef = useRef(null)

  const { pdfDocument } = usePdf({
    file: url,
    page,
    canvasRef,
    withCredentials: false,
    scale: 1.5
  })

  const downloadFile = () => {
    dispatch(files.downloadFile(url))
  }

  return (
    <ViewerDialog
      open={open}
      onClose={onClose}
      onDownload={downloadFile}
      fileName={filename}
    >
      <Box className={classes.pdfWrapper}>
        <TransformWrapper
          wheel={{ disabled: true }}
          initialScale={scale}
          doubleClick={{ disabled: true }}
          panning={{ disabled: scale === 1 }}
          maxScale={2}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent>
                {!pdfDocument ? (
                  <Box width="100%" height="100%" textAlign="center">
                    <CircularProgress
                      size={45}
                      thickness={5}
                      className={classes.loader}
                    />
                  </Box>
                ) : (
                  <canvas ref={canvasRef} />
                )}
              </TransformComponent>

              {Boolean(pdfDocument && pdfDocument.numPages) && (
                <Box className={classes.controls}>
                  <Box>
                    <IconButton
                      onClick={() => {
                        setScale(1.05)
                        zoomIn()
                      }}
                      className={classes.controlIcon}
                    >
                      <ZoomInIcon className={classes.icon} />
                    </IconButton>
                    <IconButton
                      onClick={() => zoomOut()}
                      className={classes.controlIcon}
                    >
                      <ZoomOutIcon className={classes.icon} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        resetTransform()
                        setScale(1)
                      }}
                      className={classes.controlIcon}
                    >
                      <ResetIcon className={classes.icon} />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </>
          )}
        </TransformWrapper>
      </Box>
    </ViewerDialog>
  )
}

export default PDFViewer
