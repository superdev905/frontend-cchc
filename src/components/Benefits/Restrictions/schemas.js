import * as Yup from 'yup'

export const companySchema = Yup.object().shape({
  businessId: Yup.string().required('Seleccione empresa'),
  businessName: Yup.string().required('Seleccione empresa'),
  constructionId: Yup.string().required('Seleccione obra'),
  businessType: Yup.string().required('Seleccione tipo de empresa'),
  socialService: Yup.string().required('Seleccione relacion servicio social'),
  businessField: Yup.string().required('Seleccione giro de empresa'),
  employeeType: Yup.string().required('Seleccione tipo de trabajador'),
  coverage: Yup.string().required('Seleccione coverage'),
  target: Yup.string().required('Seleccione a quien va dirigido'),
  office: Yup.string().required('Seleccione oficina regional')
})

export const courseSchema = Yup.object().shape({
  otecId: Yup.string().required(
    'Seleccione empresa que realiza la capacitación'
  ),
  instructorId: Yup.string().required('Ingrese relator'),
  place: Yup.string().required('Ingrese lugar'),
  modality: Yup.string().required('Seleccione modalidad'),
  participants: Yup.string().required('Ingrese participantes'),
  courseHours: Yup.string().required('Ingrese horas del curso'),
  occupationName: Yup.string().required('Seleccione nombre oficio'),
  assignedTo: Yup.string().required('Seleccione responsable de fundación'),
  enrollCost: Yup.string().required('Ingrese costo de matrícula')
})

export const generalSchema = Yup.object().shape({
  nationalityId: Yup.string().required('Seleccione nacionalidad'),
  rshId: Yup.string().required('Seleccione rsh'),
  legalCharge: Yup.string().required('Seleccione carga legal'),
  prevision: Yup.string().required('Seleccione previsión'),
  retired: Yup.string().required('Seleccione estado de jubilación'),
  belongsToReconocer: Yup.string().required(
    'Seleccione si pertenece a reconocer'
  ),
  isAdult: Yup.string().required('Ingrese edad'),
  gender: Yup.string().required('Seleccione genero'),
  activityType: Yup.string().required('Seleccione tipo de actividad'),
  inscriber: Yup.string().required('Seleccione quien inscribe'),
  funding: Yup.string().required('Seleccione financiamiento'),
  maxSalary: Yup.string().required('Ingrese renta')
})

export const scholarshipSchema = Yup.object().shape({
  careerId: Yup.string().required('Seleccione nombre de carrera'),
  averageLastYear: Yup.number()
    .min(1, 'El promedio debe ser mayor o igual a 1')
    .max(7, 'El promedio debe ser menor o igual a 7')
    .required('Ingrese nota'),
  semester: Yup.string().required('Ingrese año de carrera'),
  tracking: Yup.string().required('Ingrese segumiento')
})
