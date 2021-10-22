import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Dialog } from '../../Shared'
import Company from './CompanyForm'
import Course from './CourseForm'
import General from './GeneralForm'
import Scholarship from './ScholarshipForm'

const RestrictionEdit = ({
  open,
  onClose,
  type,
  restriction,
  submitFunction
}) => {
  const { isMobile } = useSelector((state) => state.ui)

  const onUpdateSuccess = () => {
    onClose()
  }

  const components = {
    BUSINESS: (
      <Company
        successMessage={'Restriccion actualizada'}
        data={restriction}
        submitFunction={submitFunction}
        successFunction={onUpdateSuccess}
        onCancel={onClose}
      />
    ),
    COURSE: (
      <Course
        successMessage={'Restriccion actualizada'}
        data={restriction}
        submitFunction={submitFunction}
        successFunction={onUpdateSuccess}
        onCancel={onClose}
      />
    ),
    GENERAL: (
      <General
        successMessage={'Restriccion actualizada'}
        data={restriction}
        submitFunction={submitFunction}
        successFunction={onUpdateSuccess}
        onCancel={onClose}
      />
    ),
    SCHOLARSHIP: (
      <Scholarship
        successMessage={'Restriccion actualizada'}
        data={restriction}
        submitFunction={submitFunction}
        successFunction={onUpdateSuccess}
        onCancel={onClose}
      />
    )
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Typography
        align="center"
        style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
      >
        Actualizar restricción
      </Typography>
      {components[type]}
    </Dialog>
  )
}

RestrictionEdit.propTypes = {
  type: PropTypes.oneOf(['BUSINESS', 'COURSE', 'GENERAL', 'SCHOLARSHIP'])
}

export default RestrictionEdit
