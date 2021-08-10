import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { DataTable } from '../../components/Shared'
import { Button, PageHeading, Wrapper } from '../../components/UI'

const Assistance = () => {
  const history = useHistory()

  const launchCalendar = () => {
    history.push('/calendar')
  }
  return (
    <Box>
      <PageHeading>Asistencias</PageHeading>

      <Box marginTop="10px">
        <Wrapper>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={launchCalendar} size="small">
              Revisar calendario
            </Button>
          </Box>
          <DataTable
            data={[]}
            columns={[
              {
                name: 'Fecha de evento',
                selector: 'run',
                sortable: true
              },
              {
                name: 'Empresa',
                selector: 'names'
              },
              {
                name: 'Obra',
                selector: 'last_name',
                hide: 'md'
              }
            ]}
          />
        </Wrapper>
      </Box>
    </Box>
  )
}

export default Assistance
