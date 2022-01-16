import { useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Dialog } from '../Shared'
import StatusList from '../Course/Employees/Status/List'
import { Button } from '../UI'
import { useToggle } from '../../hooks'
import CourseStatus from '../Course/Employees/Status/CourseStatus'

const UpdateCourse = ({ open, onClose }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const { open: openStatus, toggleOpen: toggleOpenStatus } = useToggle()
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={'md'}
        fullScreen={isMobile}
      >
        <Box textAlign="center">
          <Typography
            variant="h6"
            align="center"
            style={{ fontWeight: 'bold' }}
          >
            Estado de curso
          </Typography>
          <Box textAlign="center" marginTop="10px">
            <Button size="small" onClick={toggleOpenStatus}>
              Agregar
            </Button>
          </Box>
          <StatusList />
        </Box>
      </Dialog>
      <CourseStatus open={openStatus} onClose={toggleOpenStatus} />
    </>
  )
}

export default UpdateCourse
