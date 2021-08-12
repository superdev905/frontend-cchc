import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { DataTable } from '../../components/Shared'
import assistanceActions from '../../state/actions/assistance'
import { Button, PageHeading, Wrapper } from '../../components/UI'
import { formatDate } from '../../formatters'

const Assistance = () => {
  const history = useHistory()
  const [tableData, setTableData] = useState([])
  const { listEvents } = useSelector((state) => state.assistance)

  const dispatch = useDispatch()
  const launchCalendar = () => {
    history.push('/calendar')
  }

  const fetchList = () => {
    dispatch(assistanceActions.getEvents())
  }
  useEffect(() => {
    setTableData(
      listEvents.map((item) => ({ ...item, dateEvent: formatDate(item.date) }))
    )
  }, [listEvents])

  useEffect(() => {
    fetchList()
  }, [])

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
            data={tableData}
            columns={[
              {
                name: 'Fecha de evento',
                selector: 'dateEvent',
                sortable: true
              },
              {
                name: 'Empresa',
                selector: 'business_name'
              },
              {
                name: 'Obra',
                selector: 'construction_name',
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
