import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { Box, Typography } from '@material-ui/core'
import useStyles from '../styles'
import Actions from '../Actions'
import benefitsActions from '../../../state/actions/benefits'
import BenefitForm from './InfoForm'
import { benefitSchema, courseSchema } from './schemas'

const StepOne = ({ onClose, data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { create } = useSelector((state) => state.benefits)
  const [isCourse, setIsCourse] = useState(false)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: isCourse
      ? benefitSchema.concat(courseSchema)
      : benefitSchema,
    initialValues: {
      code: create?.benefit?.code || '',
      startDate: create?.benefit?.startDate || '',
      endDate: create?.benefit?.endDate || '',
      name: create?.benefit?.name || '',
      projectName: create?.benefit?.projectName || '',
      usersQuantity: create?.benefit?.usersQuantity || '',
      isActive: create?.benefit?.isActive || '',
      totalCost: create?.benefit?.totalCost || '',
      area: create?.benefit?.area || '',
      isCourse: create?.benefit?.isCourse || false,
      otecId: create?.benefit?.otecId || '',
      otecName: create?.benefit?.otecName || '',
      instructorId: create?.benefit?.instructorId || '',
      instructorName: create?.benefit?.instructorName || '',
      description: create?.benefit?.description || '',
      status: create?.benefit?.status || ''
    },
    onSubmit: (values) => {
      const body = { ...values }
      if (values.isCourse) {
        body.course = {
          status: values.status,
          otecId: values.otecId,
          instructorId: values.instructorId,
          description: values.description
        }
      }

      dispatch(
        benefitsActions.updateCreate({
          ...create,
          benefit: { ...create.benefit, ...body },
          step: create.step + 1
        })
      )
    }
  })

  useEffect(() => {
    setIsCourse(formik.values.isCourse)
  }, [formik.values.isCourse])

  useEffect(() => {
    if (data) {
      dispatch(
        benefitsActions.updateCreate({
          ...create,
          ...data
        })
      )
    }
  }, [data])

  return (
    <Box className={classes.form}>
      <Box>
        <Typography align="center" className={classes.subtitle}>
          Nuevo Beneficio
        </Typography>
        <BenefitForm
          formData={create.benefit}
          formik={formik}
          type={create.type}
          actions={
            <Actions
              showBackIcon={false}
              handleBack={onClose}
              backText="Cancelar"
              disableNext={!formik.isValid}
              handleNext={formik.handleSubmit}
            />
          }
        />
      </Box>
    </Box>
  )
}

export default StepOne
