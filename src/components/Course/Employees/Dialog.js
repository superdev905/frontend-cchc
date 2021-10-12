import { Drawer } from '@material-ui/core'
import { useSelector } from 'react-redux'

const EmployeeDialog = ({ open, onClose }) => {
  const { isMobile } = useSelector((state) => state.ui)
  return <Drawer fullScreen={isMobile} open={open} onClose={onClose}></Drawer>
}

EmployeeDialog.propTypes = {}

export default EmployeeDialog
