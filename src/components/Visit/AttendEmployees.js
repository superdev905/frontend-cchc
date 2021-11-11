import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FiDownload as ExportIcon } from 'react-icons/fi'
import { Box, Typography } from '@material-ui/core'
import { DataTable } from '../Shared'
import { SubmitButton, Wrapper } from '../UI'
import assistanceActions from '../../state/actions/assistance'

const ContactList = () => {
  const dispatch = useDispatch()
  const [exporting, setExporting] = useState(false)
  const { idVisit } = useParams()

  const handleExportEmployees = () => {
    setExporting(true)
    dispatch(assistanceActions.exportEmployeesToAttend(idVisit)).then(() => {
      setExporting(false)
    })
  }
  return (
    <Wrapper>
      <Box
        p={1}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Trabajadores por atender
        </Typography>
        <SubmitButton
          loading={exporting}
          onClick={handleExportEmployees}
          startIcon={<ExportIcon />}
        >
          Exportar a excel
        </SubmitButton>
      </Box>
      <DataTable
        background
        emptyMessage="No hay trabajadores por atender"
        columns={[
          {
            name: 'Run',
            selector: (row) => row.full_name,
            sortable: true
          },
          {
            name: 'Nombres',
            selector: (row) => row.full_name,
            sortable: true
          },
          {
            name: 'Apellidos',
            selector: (row) => row.charge
          },
          {
            name: 'Nacionalidad',
            selector: (row) => row.email
          },
          {
            name: 'Sexo',
            selector: (row) => row.email
          },
          {
            name: 'Cargo de obra',
            selector: (row) => row.email
          }
        ]}
        data={[]}
      />
    </Wrapper>
  )
}

export default ContactList
