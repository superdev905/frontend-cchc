import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { ActionsTable } from '../../../UI'
import { DataTable } from '../../../Shared'
import { useToggle } from '../../../../hooks'
import coursesActions from '../../../../state/actions/courses'
import CourseStatus from './CourseStatus'
import { formatDate } from '../../../../formatters'

const StatusList = ({ successFunction }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(null)
  const { studentDetails } = useSelector((state) => state.courses)
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()

  const updateStatus = (values) => {
    dispatch(
      coursesActions.updateStatus(studentDetails.status.id, {
        ...values,
        studentId: studentDetails.studentId
      })
    )
      .then(() => {
        setLoading(false)
        toggleOpenUpdate()
        if (successFunction) {
          successFunction()
        }
        enqueueSnackbar('Estado actualizado correctamente', {
          autoHideDuration: 2000,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <Box mb={4}>
      <DataTable
        progressPending={loading}
        emptyMessage={'Aún no hay estados de alumno'}
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Fecha',
            selector: (row) => formatDate(row.date)
          },
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
              />
            )
          }
        ]}
        data={studentDetails?.status ? [{ ...studentDetails?.status }] : []}
      />

      {currentStatus && openUpdate && (
        <CourseStatus
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          data={currentStatus}
          submitFunction={updateStatus}
        />
      )}
    </Box>
  )
}

export default StatusList
