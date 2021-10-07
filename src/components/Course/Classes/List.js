import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { useSuccess, useToggle } from '../../../hooks'
import ClassesCard from './Card'
import ClassesDialog from './Dialog'
import courses from '../../../state/actions/courses'
import { ConfirmDelete } from '../../Shared'
import { EmptyState } from '../../UI'

const ClassesTab = () => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const fetchClasses = () => {
    setLoading(true)
    dispatch(
      courses.getClasses({ size: 30, page: 1, courseId: idCourse })
    ).then((result) => {
      setList(result.items)
      setLoading(false)
    })
  }

  const createClass = (values) =>
    dispatch(courses.createClass({ ...values, courseId: idCourse }))

  const updateClass = (values) =>
    dispatch(
      courses.updateClass(current.id, { ...values, courseId: current.courseId })
    )

  const deleteClass = (id) => {
    setDeleting(true)
    dispatch(courses.patchClass(id, { state: 'DELETED' })).then(() => {
      setDeleting(false)
      changeSuccess(true, () => {
        toggleOpenDelete()
        fetchClasses()
      })
    })
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  return (
    <Box>
      {loading ? (
        <ClassesCard.Container>
          <ClassesCard.Loader />
          <ClassesCard.Loader />
          <ClassesCard.Loader />
        </ClassesCard.Container>
      ) : (
        <>
          {list.length === 0 ? (
            <EmptyState
              message="Este curso aún no tiene clases"
              actionMessage="Nueva clase"
              event={toggleOpenAdd}
            />
          ) : (
            <ClassesCard.Container>
              <ClassesCard.AddCard onClick={toggleOpenAdd} />
              {list.map((item) => (
                <ClassesCard
                  key={`card-class-${item.id}`}
                  item={item}
                  onDelete={() => {
                    setCurrent(item)
                    toggleOpenDelete()
                  }}
                  onEdit={() => {
                    setCurrent(item)
                    toggleOpenEdit()
                  }}
                />
              ))}
            </ClassesCard.Container>
          )}
        </>
      )}

      {openAdd && (
        <ClassesDialog
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={createClass}
          successFunction={fetchClasses}
          successMessage="Clase creada"
        />
      )}
      {current && openEdit && (
        <ClassesDialog
          open={openEdit}
          type="UPDATE"
          onClose={toggleOpenEdit}
          submitFunction={updateClass}
          successFunction={fetchClasses}
          data={current}
          successMessage="Clase actualizada con éxito"
        />
      )}
      {current && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          success={success}
          loading={deleting}
          message={
            <Box>
              <Typography variant="h6" align="center">
                ¿Estás seguro de eliminar esta clase?
              </Typography>
              <Typography
                variant="h6"
                align="center"
                style={{ fontWeight: 'bold' }}
              >
                {current.title}
              </Typography>
            </Box>
          }
          onConfirm={() => deleteClass(current.id)}
        />
      )}
    </Box>
  )
}
export default ClassesTab
