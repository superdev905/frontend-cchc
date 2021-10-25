import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
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

const useStyles = makeStyles((theme) => ({
  resCard: {
    cursor: 'pointer',
    border: `2px solid ${theme.palette.gray.gray200}`,
    borderRadius: 5,
    '&:hover': {
      backgroundColor: 'rgba(114, 115, 130, 0.11)',
      border: `2px solid ${theme.palette.primary.main}`
    }
  },
  resIcon: {
    fontSize: 30,
    marginRight: 5
  },
  disabledCard: {
    opacity: 0.5,
    pointerEvents: 'none'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
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
    {
      name: 'General',
      title: 'Restricción general',
      type: 'general',
      icon: <FaClipboardList className={classes.resIcon} color="#BE52F2" />
    },
    {
      name: 'Beca',
      title: 'Restricción de beca',
      type: 'scholarship',
      icon: <FaAward className={classes.resIcon} color="#FF6474" />
    },
    {
      name: 'Curso',
      title: 'Restricción de curso',
      type: 'course',
      icon: <FaUserGraduate className={classes.resIcon} color="#0084F4" />
    },
    {
      name: 'Empresa',
      title: 'Restricción de empresa',
      type: 'business',
      icon: <FaCity className={classes.resIcon} color="#00C48C" />
    },
    {
      name: 'Vivienda',
      title: 'Restricción de vivienda',
      type: 'home',
      icon: <FaHome className={classes.resIcon} />
    }
  ]

  const updateBenefit = (benefit, resType, values) => {
    if (resType === 'business') {
      return { ...benefit, businessRestriction: values }
    }
    if (resType === 'course') {
      return { ...benefit, courseRestriction: values }
    }
    if (resType === 'scholarship') {
      return { ...benefit, scholarshipRestriction: values }
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
  const isAddedRestriction = (resType) => {
    const { benefit } = create
    if (resType === 'business') {
      return Boolean(benefit.businessRestriction)
    }
    if (resType === 'course') {
      return Boolean(benefit.courseRestriction)
    }
    if (resType === 'scholarship') {
      return Boolean(benefit.scholarshipRestriction)
    }
    return Boolean(benefit.generalRestriction)
  }

  const renderTitle = (index, resType) => {
    if (index === 0) {
      return 'Selecciona tipo de restricción'
    }
    return RestrictionsTypes.find((item) => item.type === resType).title
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
        submitText="Agregar"
      />
    ),
    general: (
      <General
        data={null}
        submitFunction={addRestriction}
        onCancel={onClose}
        successMessage="Restricción agregada"
        submitText="Agregar"
      />
    ),
    scholarship: (
      <Scholarship
        data={null}
        submitFunction={addRestriction}
        onCancel={onClose}
        successMessage="Restricción agregada"
        submitText="Agregar"
      />
    )
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography align="center" className={classes.title}>
          {renderTitle(step, currentType)}
        </Typography>
        <Box p={2}>
          {step === 0 && (
            <>
              <Grid container spacing={2}>
                {RestrictionsTypes.map((item, index) => (
                  <Grid item xs={12} md={6} key={`${index}-restrictionCard`}>
                    <Box
                      p={2}
                      onClick={() => {
                        setStep(1)
                        setCurrentType(item.type)
                      }}
                      display="flex"
                      alignItems="center"
                      className={clsx(
                        classes.resCard,
                        item.type === 'home' && classes.disabledCard,
                        isAddedRestriction(item.type) && classes.disabledCard
                      )}
                    >
                      {item.icon}
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
