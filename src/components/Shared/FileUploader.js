import { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginPdfPreview from 'filepond-plugin-pdf-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import Axios from '../../Axios'
import { employeeEndpoint } from '../../state/actions/employees'

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginPdfPreview,
  FilePondPluginFileValidateType
)

const FileUploader = ({ onSuccess, onStart }) => {
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
            url: `${employeeEndpoint}/file`,
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
                // eslint-disable-next-line
                console.log('Request canceled', thrown.message)
              } else {
                // eslint-disable-next-line
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
      onaddfilestart={() => {
        onStart()
      }}
      name="files"
      acceptedFileTypes={['application/pdf', 'image/*']}
      labelIdle='Selecciona un <span class="filepond--label-action">archivo</span>'
    />
  )
}

export default FileUploader
