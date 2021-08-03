import { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginPdfPreview from 'filepond-plugin-pdf-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import Axios from '../../Axios'

registerPlugin(FilePondPluginImagePreview, FilePondPluginPdfPreview)

const FileUploader = ({ onSuccess }) => {
  const [fileS, setFile] = useState(null)
  return (
    <FilePond
      files={fileS}
      onupdatefiles={setFile}
      maxFiles={1}
      labelFileProcessing="Subiendo"
      server={{
        // eslint-disable-next-line
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // set data
          const formData = new FormData()
          formData.append('file', file, file.name)

          Axios({
            method: 'post',
            url: 'http://localhost:8000/api/v1/file',
            data: formData,
            onUploadProgress: (e) => {
              progress(e.lengthComputable, e.loaded, e.total)
            }
          })
            .then((response) => {
              load(response.data.filename)
              onSuccess(response.data.filename)
            })
            .catch((thrown) => {
              if (Axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message)
              } else {
                console.log(thrown)
              }
            })

          return {
            abort: () => {
              // eslint-disable-next-line
              source.cancel('Cancelado')
            }
          }
        }
      }}
      name="files"
      acceptedFileTypes={['.png', '.jpg', '.pdf']}
      labelIdle='Selecciona un <span class="filepond--label-action">archivo</span>'
    />
  )
}

export default FileUploader
