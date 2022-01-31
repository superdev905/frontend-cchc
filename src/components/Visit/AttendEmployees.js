import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FiDownload as ExportIcon } from 'react-icons/fi'
import { Box, Typography } from '@material-ui/core'
import { DataTable } from '../Shared'
import { SubmitButton, Wrapper } from '../UI'
import assistanceActions from '../../state/actions/assistance'

const List = () => {
  const dispatch = useDispatch()

  const [exporting, setExporting] = useState(false)
  const { employeesToAttend } = useSelector((state) => state.assistance)
  const { visit } = useSelector((state) => state.assistance)

  const { idVisit } = useParams()

  const handleExportEmployees = () => {
    setExporting(true)
    dispatch(assistanceActions.exportEmployeesToAttend(idVisit)).then(() => {
      setExporting(false)
    })
  }

  const fetchEmployeesToAttend = () => {
    dispatch(
      assistanceActions.getEmployeesToAttend({
        page: 1,
        size: 1,
        businessId: visit?.business_id
      })
    )
  }

  useEffect(() => {
    if (visit) {
      fetchEmployeesToAttend()
    }
  }, [visit])

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
            selector: (row) => row.employeeRut,
            sortable: true
          },
          {
            name: 'Nombres',
            selector: (row) => row.employee.names,
            sortable: true
          },
          {
            name: 'Apellidos',
            selector: (row) =>
              `${row.employee.paternalSurname} ${
                row.employee.maternalSurname || ''
              }`
          },
          {
            name: 'Nacionalidad',
            selector: (row) => row.employee.nationality.description
          },
          {
            name: 'Sexo',
            selector: (row) => row.employee.gender
          },
          {
            name: 'Motivo',
            selector: (row) => console.log(row)
          }
        ]}
        data={employeesToAttend}
      />
    </Wrapper>
  )
}

export default List
