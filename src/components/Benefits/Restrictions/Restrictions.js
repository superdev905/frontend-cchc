import { useEffect, useState } from 'react'
import { Box, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import {
  FaUserGraduate,
  FaAward,
  FaHome,
  FaCity,
  FaClipboardList
} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog } from '../../Shared'
import Company from './CompanyForm'
import Course from './CourseForm'
import General from './GeneralForm'
import Scholarship from './ScholarshipForm'
import benefitsActions from '../../../state/actions/benefits'

const useStyles = makeStyles(() => ({
  Box: {
    cursor: 'pointer',
    border: '2px solid grey',
    borderRadius: 7,
    padding: '7px',
    '&:hover': {
      backgroundColor: 'rgba(114, 115, 130, 0.11)'
    }
  }
}))

const Restrictions = ({ open, onClose, formType, currentStep, type }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { create } = useSelector((state) => state.benefits)
  const [step, setStep] = useState(currentStep || 0)
  const [currentType, setCurrentType] = useState(formType || '')

  const RestrictionsTypes = [
    { name: 'General', type: 'general', icon: <FaClipboardList /> },
    { name: 'Beca', type: 'scholarship', icon: <FaAward /> },
    { name: 'Curso', type: 'course', icon: <FaUserGraduate /> },
    { name: 'Empresa', type: 'business', icon: <FaCity /> },
    { name: 'Vivienda', type: 'home', icon: <FaHome /> }
  ]

  const updateBenefit = (benefit, resType, values) => {
    if (resType === 'business') {
      return { ...benefit, businessRestriction: values }
    }
    return { ...benefit, generalRestriction: values }
  }

  const addRestriction = (values) => {
    dispatch(
      benefitsActions.updateCreate({
        ...create,
        benefit: updateBenefit(create.benefit, currentType, values)
      })
    )
    onClose()
  }

  useEffect(() => {
    if (open && type !== 'UPDATE') {
      setStep(0)
    }
  }, [open])

  const forms = {
    business: (
      <Company
        data={null}
        submitFunction={addRestriction}
        onCancel={onClose}
        successMessage="Restricción agregada"
        submitText="Agregar"
      />
    ),
    course: (
      <Course
        data={null}
        submitFunction={addRestriction}
        onCancel={onClose}
        successMessage="Restricción agregada"
      />
    ),
    general: (
      <General
        data={null}
        submitFunction={addRestriction}
        onCancel={onClose}
        successMessage="Restricción agregada"
      />
    ),
    scholarship: (
      <Scholarship
        data={null}
        submitFunction={addRestriction}
        onCancel={onClose}
        successMessage="Restricción agregada"
      />
    )
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Box p={2}>
          {step === 0 && (
            <>
              <Grid container spacing={2}>
                {RestrictionsTypes.map((item, index) => (
                  <Grid item xs={12} md={6} key={`${index}-restrictionCard`}>
                    <Box
                      onClick={() => {
                        setStep(1)
                        setCurrentType(item.type)
                      }}
                      display="flex"
                      alignItems="center"
                      className={classes.Box}
                    >
                      <Icon>{item.icon}</Icon>
                      <Typography>{item.name} </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {step === 1 && <Box>{currentType && forms[currentType]}</Box>}
        </Box>
      </Box>
    </Dialog>
  )
}

Restrictions.defaultProps = {
  type: 'CREATE'
}

export default Restrictions
