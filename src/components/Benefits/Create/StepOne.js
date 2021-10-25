import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { Box, Typography } from '@material-ui/core'
import useStyles from '../styles'
import Actions from '../Actions'
import benefitsActions from '../../../state/actions/benefits'
import BenefitForm from './InfoForm'
import { benefitSchema } from './schemas'

const StepOne = ({ onClose, data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { create } = useSelector((state) => state.benefits)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: benefitSchema,
    initialValues: {
      code: create?.benefit?.code || '',
      startDate: create?.benefit?.startDate || '',
      endDate: create?.benefit?.endDate || '',
      name: create?.benefit?.name || '',
      projectName: create?.benefit?.projectName || '',
      usersQuantity: create?.benefit?.usersQuantity || '',
      isActive: create?.benefit?.isActive || '',
      totalCost: create?.benefit?.totalCost || ''
    },
    onSubmit: (values) => {
      dispatch(
        benefitsActions.updateCreate({
          ...create,
          benefit: { ...create.benefit, ...values },
          step: create.step + 1
        })
      )
    }
  })

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
