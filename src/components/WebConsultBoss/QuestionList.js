import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowRight as NextIcon } from 'react-icons/fi'
import { Box, Chip } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { formatDate, formatHours } from '../../formatters'
import questionActions from '../../state/actions/questions'
import { DataTable } from '../Shared'
import { ActionsTable } from '../UI'
import { QuestionPreview } from '../Question'

const QuestionList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({ page: 1, size: 30 })

  const { questions, totalQuestions: totalDocs } = useSelector(
    (state) => state.questions
  )

  const getQuestions = () => {
    setLoading(true)
    dispatch(questionActions.getQuestions(query)).then(() => {
      setLoading(false)
    })
  }
  const handleSelectedRows = ({ selectedRows }) => {
    console.log(selectedRows)
  }

  useEffect(() => {
    getQuestions()
  }, [query])

  return (
    <Box>
      <Box mt={2}>
        <DataTable
          data={questions}
          selectableRows
          onSelectedRowsChange={handleSelectedRows}
          selectableRowDisabled={(row) => row.status === 'ASIGNADA'}
          columns={[
            {
              name: 'N°',
              selector: (row) => <strong>{row.number}</strong>,
              width: '80px',
              sortable: true,
              compact: true
            },
            {
              name: 'Estado',
              selector: (row) => <Chip label={row.status} siz="small" />,
              compact: true,
              maxWidth: '100px'
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
              name: 'Area',
              selector: (row) => row.areaName,
              compact: true,
              hide: 'md',
              maxWidth: '100px'
            },
            {
              name: 'Trabajador',
              selector: (row) => row.employeeNames,
              sortable: true,
              compact: true,
              hide: 'md'
            },
            {
              name: '',
              right: true,
              selector: (row) => (
                <ActionsTable
                  moreOptions={[
                    {
                      icon: <NextIcon />,
                      onClick: () => {
                        history.push(`/question/${row.number}`)
                      }
                    }
                  ]}
                />
              )
            }
          ]}
          progressPending={loading}
          pagination
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
          expandableRows
          expandOnRowClicked
          expandableRowsHideExpander
          selectableRowsHighlight
          expandableRowsComponent={({ data }) => (
            <QuestionPreview question={data} />
          )}
        />
      </Box>
    </Box>
  )
}

export default QuestionList
