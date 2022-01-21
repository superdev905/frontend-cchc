import * as Yup from 'yup'

export const benefitSchema = Yup.object().shape({
  code: Yup.string().required('Ingrese código'),
  name: Yup.string().required('Ingrese nombre del beneficio'),
  projectName: Yup.string().required('Ingrese nombre del proyecto'),
  startDate: Yup.date().required('Seleccione fecha de inicio'),
  endDate: Yup.date().required('Seleccione fecha de termino'),
  isActive: Yup.string().required('Seleccione estado'),
  usersQuantity: Yup.number('Ingrese número valido')
    .min(1, 'La cantidad minima debe ser 1')
    .required('Ingrese cupos anuales')
    .integer('Ingrese número valido'),
  totalCost: Yup.number('Ingrese número valido')
    .min(1, 'La cantidad minima debe ser 1')
    .required('Ingrese costo total'),
  isCourse: Yup.bool()
})

export const courseSchema = Yup.object().shape({
  otecId: Yup.number().required('Seleccione otec'),
  description: Yup.string().required('Ingrese descripción'),
  instructorId: Yup.number().required('Seleccione relator'),
  status: Yup.string().required('Selecciona estado de curso')
})

export const restrictionSchema = {}
