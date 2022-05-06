import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  attention_place: Yup.string().required('Seleccione lugar de atención'),
  contact_method: Yup.string().required('Seleccione método de contacto lugar'),
  topic_id: Yup.string().required('Seleccione tema'),
  area_id: Yup.string().required('Seleccione area').nullable(),
  area_name: Yup.string().required('Seleccione area'),
  management_id: Yup.string().required('Seleccione gestión'),
  status: Yup.string().required('Seleccione estado'),
  company_report: Yup.string().required('Seleccione opcion').nullable(),
  is_social_case: Yup.string().required('Seleccione caso social'),
  //  case_id: Yup.string('Seleccione caso'),
  //  task_id: Yup.number(),
  assigned_id: Yup.string('Ingrese profesional'),
  observation: Yup.string('Ingrese observaciones'),
  attended_id: Yup.number().required('Selecciona persona atendida'),
  attended_name: Yup.string().required('Selecciona persona atendida'),
  is_attended_relative: Yup.bool().required('Seleccione quien es atendido'),
  attached_url: Yup.mixed()
})

export const caseAdditionalSchema = Yup.object().shape({
  request_type: Yup.string().required('Ingrese de solicitud')
})
