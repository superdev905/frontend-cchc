import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Wrapper } from '../../../UI'
import { DataTable } from '../../../Shared'
import coursesActions from '../../../../state/actions/courses'

const StatusList = () => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const [loading, setLoading] = useState(false)
  const { totalStatus, statusList } = useSelector((state) => state.courses)

  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    state: ''
  })

  const fetchStatus = () => {
    setLoading(true)
    dispatch(coursesActions.getStatus({ courseId: idCourse })).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchStatus()
  }, [filters])

  return (
    <Wrapper>
      <DataTable
        progressPending={loading}
        emptyMessage={
          filters.search
            ? `No se encontraron resultados para: ${filters.search}`
            : 'Aún no hay estados de curso'
        }
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Estado de curso',
            selector: (row) => row.courseStatus
          },
          {
            name: 'Estado de alumno',
            selector: (row) => row.studentStatus
          }
        ]}
        data={statusList}
        pagination
        paginationRowsPerPageOptions={[15, 30]}
        paginationPerPage={filters.size}
        paginationServer={true}
        onChangeRowsPerPage={(limit) => {
          setFilters({ ...filters, size: limit })
        }}
        onChangePage={(page) => {
          setFilters({ ...filters, skip: page })
        }}
        paginationTotalRows={totalStatus}
      />
    </Wrapper>
  )
}

export default StatusList
