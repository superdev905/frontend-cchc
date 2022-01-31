import * as Yup from 'yup'

export const CommonTrackingSchema = Yup.object().shape({
  benefitId: Yup.string(),
  yearInProgress: Yup.number('Ingrese año válido').required(
    'Ingrese año en curso'
  ),
  levelInProgress: Yup.string().required('Ingrese nivel en curso'),
  totalCourses: Yup.number('Ingrese número válido').required(
    'Ingrese ramos totales'
  ),
  failedCourses: Yup.number('Ingrese número válido').required(
    'Ingrese ramos reprobados'
  ),
  businessName: Yup.string().required('Ingrese nombre de empresa actual'),
  scholarshipStatus: Yup.string().required('Seleccione estado de beca'),
  observations: Yup.string()
})

export const BeaTrackingSchema = Yup.object().shape({
  benefitId: Yup.string(),
  yearInProgress: Yup.number('Ingrese año válido').required(
    'Ingrese año en curso'
  ),
  levelInProgress: Yup.string().required('Ingrese nivel en curso'),
  avgScoreFirstSemester: Yup.number('Ingrese número válido').required(
    'Ingrese promedio del primer trimeste'
  ),
  avgScoreSecondSemester: Yup.number('Ingrese promedio válido'),
  businessName: Yup.string().required('Ingrese nombre de empresa actual'),
  mandatoryActivity: Yup.string(),
  psychologicalInterview: Yup.string(),
  scholarshipStatus: Yup.string().required('Seleccione estado de beca'),
  observations: Yup.string()
})

export const PmaTrackingSchema = Yup.object().shape({
  businessName: Yup.string(),
  scholarshipStatus: Yup.string().required('Seleccione estado de beca'),
  observations: Yup.string()
})
