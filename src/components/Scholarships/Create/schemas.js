import * as Yup from 'yup'
import { rutValidation } from '../../../validations'

const validationSchema = Yup.object({
  scholarshipId: Yup.string().required('Seleccione beca'),
  employeeRut: Yup.string()
    .required('Ingrese rut trabajador')
    .test('Check Rut', 'Ingrese Rut válido', (v) => rutValidation(v)),
  employeeId: Yup.number().required('Ingrese nombre trabajador'),
  employeeNames: Yup.string().required('Ingrese nombre trabajador'),
  businessRut: Yup.string()
    .required('Ingrese rut empresa')
    .test('Check Rut', 'Ingrese Rut válido', (v) => rutValidation(v)),
  businessName: Yup.string().required('Ingrese nombre empresa'),
  businessId: Yup.number().required('Ingrese nombre empresa'),
  businessRelatedRut: Yup.string(),
  businessRelatedName: Yup.string(),
  businessRelatedId: Yup.number(),
  beneficiaryRut: Yup.string().test('Check Rut', 'Ingrese Rut válido', (v) => {
    if (v || v === '') return true
    return rutValidation(v)
  }),
  beneficiaryNames: Yup.string().required('Ingrese nombre beneficiario'),
  beneficiaryId: Yup.number().required('Ingrese nombre beneficiario'),
  beneficiaryIsRelative: Yup.bool().required('Ingrese nombre beneficiario'),
  careerId: Yup.string().required('Ingrese nombre carrera'),
  schoolName: Yup.string().required('Ingrese nombre de institución o colegio'),
  schoolRegion: Yup.number().required(
    'Seleccione región de institución o colegio'
  ),
  schoolCommune: Yup.number().required(
    'Seleccione comuna de institución o colegio'
  ),
  psuScore: Yup.number('Ingrese puntaje valido')
    .min(150, 'Debe ser mayor a 150')
    .max(850, 'Debe ser menor a 850')
    .required('Ingrese puntaje ptu o simil')
})

export default validationSchema
