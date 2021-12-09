import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  date: Yup.date().required('Seleccione fecha'),
  attention_place: Yup.string().required('Seleccione lugar de atención'),
  contact_method: Yup.string().required('Seleccione método de contacto lugar'),
  topic_id: Yup.string().required('Seleccione tema'),
  area_id: Yup.string().required('Seleccione area').nullable(),
  area_name: Yup.string().required('Seleccione area'),
  management_id: Yup.string().required('Seleccione gestión'),
  status: Yup.string().required('Seleccione estado'),
  company_report: Yup.string().required('Seleccione opcion').nullable(),
  is_social_case: Yup.string().required('Seleccione caso social'),
  case_id: Yup.string().required('Seleccione caso'),
  task_id: Yup.number(),
  assigned_id: Yup.string('Ingrese profesional'),
  observation: Yup.string('Ingrese observaciones'),
  attached_url: Yup.mixed()
})

export const caseAdditionalSchema = Yup.object().shape({
  zone: Yup.string().required('Ingrese zona'),
  delegation: Yup.string().required('Ingrese zona'),
  office: Yup.string().required('Ingrese zona')
})
