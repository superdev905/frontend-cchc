import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { ActionsTable, Wrapper } from '../../../UI'
import { ConfirmDelete, DataTable } from '../../../Shared'
import { useToggle, useSuccess } from '../../../../hooks'
import coursesActions from '../../../../state/actions/courses'
import CourseStatus from './CourseStatus'

const StatusList = () => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(null)
  const { statusList } = useSelector((state) => state.courses)
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const [filters] = useState({
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

  const updateStatus = (values) => {
    dispatch(
      coursesActions.updateStatus(currentStatus.id, {
        ...values,
        studentId: currentStatus.studentId
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenUpdate()
        fetchStatus()
        enqueueSnackbar('Estado actualizado correctamente', {
          autoHideDuration: 2000,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const deleteStatus = (id) => {
    dispatch(
      coursesActions.patchStatus(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchStatus()
        enqueueSnackbar('Estado eliminado exitosamente', {
          autoHideDuration: 1800,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
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
            : 'Aún no hay estados de alumno'
        }
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Estado de alumno',
            selector: (row) => row.studentStatus
          },
          {
            name: '',
            right: true,
            cell: (row) => (
              <ActionsTable
                {...row}
                disabledDelete={row.state === 'DELETED'}
                onEdit={() => {
                  setCurrentStatus(row)
                  toggleOpenUpdate()
                }}
                onDelete={() => {
                  setCurrentStatus(row)
                  toggleOpenDelete()
                }}
                //  onView={() => { props.history.push(`/obras/${row.id}`)  }}
              />
            )
          }
        ]}
        data={statusList}
      />

      {currentStatus && openUpdate && (
        <CourseStatus
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          data={currentStatus}
          submitFunction={updateStatus}
          successFunction={fetchStatus}
        />
      )}

      {currentStatus && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteStatus(currentStatus.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar este estado?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}
    </Wrapper>
  )
}

export default StatusList
