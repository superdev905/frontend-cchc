import { useEffect, useState } from 'react'
import { Box, Chip, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { formatDate, formatHours } from '../../../formatters'
import questionEmployeeActions from '../../../state/actions/questionEmployee'
import { DataTable } from '../../Shared'
import { ActionsTable } from '../../UI'
import useStyles from './styles'

const History = () => {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const {
    historyQuestions,
    historyTotal: totalDocs,
    employeeId
  } = useSelector((state) => state.questionEmployee)
  const [query, setQuery] = useState({ page: 1, size: 30, employeeId })

  const getHistory = () => {
    setLoading(true)
    dispatch(questionEmployeeActions.getHistoryQuestions(query))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    getHistory()
  }, [query])

  return (
    <Box>
      <Box mb={1}>
        <Typography className={classes.title}>Mi Historial</Typography>
      </Box>

      <Box>
        <DataTable
          data={historyQuestions}
          emptyMessage="No tienes preguntas en tu historial"
          columns={[
            {
              name: 'N°',
              selector: (row) => row.number,
              width: '100px',
              sortable: true,
              compact: true,
              center: true
            },
            {
              name: 'Estado',
              selector: (row) => (
                <Chip color="primary" label={row.status} siz="small" />
              ),
              compact: true,
              maxWidth: '120px'
            },

            {
              name: 'Título',
              selector: (row) => row.title
            },
            {
              name: 'Fecha',
              selector: (row) =>
                `${formatDate(row.createdDate, {})} - ${formatHours(
                  row.createdDate
                )}`,
              compact: true
            },
            {
              name: 'Fecha respuesta',
              selector: (row) =>
                `${formatDate(row.answer.date, {})} - ${formatHours(
                  row.answer.date
                )}`,
              compact: true
            },
            {
              name: 'Area',
              selector: (row) => row.areaName,
              compact: true,
              hide: 'md',
              maxWidth: '100px'
            },
            {
              name: '',
              right: true,
              selector: (row) => (
                <ActionsTable
                  onView={() => {
                    history.push(`/consultas-web/preguntas/${row.number}`)
                  }}
                />
              )
            }
          ]}
          progressPending={loading}
          pagination
          onRowClicked={(row) => {
            history.push(`/consultas-web/preguntas/${row.number}`)
          }}
          highlightOnHover
          pointerOnHover
          paginationRowsPerPageOptions={[30, 40]}
          paginationPerPage={query.size}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setQuery({ ...query, size: limit })
          }}
          onChangePage={(page) => {
            setQuery({ ...query, page })
          }}
          paginationTotalRows={totalDocs}
        />
      </Box>
    </Box>
  )
}

export default History
