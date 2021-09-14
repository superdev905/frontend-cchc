import Lightbox from 'react-awesome-lightbox'
import 'react-awesome-lightbox/build/style.css'
import guessFileType from '../../../utils/guessFileType'
import PDFViewer from './PDFViewer'

const FileVisor = ({ open, onClose, src, filename }) => {
  const drawComponent = (type) => {
    if (type === 'pdf')
      return (
        <PDFViewer
          open={open}
          onClose={onClose}
          url={src}
          filename={filename}
        />
      )
    return <Lightbox onClose={onClose} image={src} title={filename} />
  }
  return <>{drawComponent(guessFileType(src))}</>
}

export default FileVisor
