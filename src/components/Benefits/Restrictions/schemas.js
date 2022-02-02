import * as Yup from 'yup'

export const companySchema = Yup.object().shape({
  businessId: Yup.string().required('Seleccione empresa'),
  businessName: Yup.string().required('Seleccione empresa'),
  constructionId: Yup.string().required('Seleccione obra'),
  businessType: Yup.string(),
  socialService: Yup.string(),
  businessField: Yup.string(),
  employeeType: Yup.string(),
  coverage: Yup.string(),
  target: Yup.string(),
  office: Yup.string()
})

export const courseSchema = Yup.object().shape({
  otecId: Yup.string().required(
    'Seleccione empresa que realiza la capacitación'
  ),
  instructorId: Yup.string(),
  place: Yup.string().required('Ingrese lugar'),
  modality: Yup.string(),
  participants: Yup.string().required('Ingrese participantes'),
  courseHours: Yup.string().required('Ingrese horas del curso'),
  occupationName: Yup.string(),
  assignedTo: Yup.string(),
  enrollCost: Yup.string().required('Ingrese costo de matrícula')
})

export const generalSchema = Yup.object().shape({
  nationalityId: Yup.string(),
  rshId: Yup.string(),
  legalCharge: Yup.string(),
  prevision: Yup.string(),
  retired: Yup.string(),
  belongsToReconocer: Yup.string(),
  isAdult: Yup.string().required('Ingrese edad'),
  gender: Yup.string(),
  activityType: Yup.string(),
  inscriber: Yup.string(),
  funding: Yup.string(),
  maxSalary: Yup.string().required('Ingrese renta')
})

export const scholarshipSchema = Yup.object().shape({
  careerId: Yup.number(),
  averageLastYear: Yup.number()
    .min(1, 'El promedio debe ser mayor o igual a 1')
    .max(7, 'El promedio debe ser menor o igual a 7')
    .required('Ingrese nota'),
  semester: Yup.number().required('Ingrese semestre'),
  tracking: Yup.string()
})
