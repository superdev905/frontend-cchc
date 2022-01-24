const scholarshipConfig = {
  postulationAttachments: [
    {
      displayName: 'CERTIFICADO EGRESO ENSEÑANZA MEDIA',
      isRequired: false,
      name: 'CERTIFICADO_EGRESO_ENSEÑANZA_MEDIA'
    },
    {
      displayName: 'LIQUIDACIÓN SUELDO',
      fileName: '',
      isRequired: true,
      name: 'LIQUIDACION_SUELDO'
    },
    {
      displayName: 'CERTIFICADO DE NOTAS O NEM',
      isRequired: true,
      name: 'CERTIFICADO_DE_NOTAS_O_NEM'
    },
    {
      displayName: 'CERTIFICADO ALUMNO REGULAR',
      isRequired: true,
      name: 'CERTIFICADO_ALUMNO_REGULAR'
    },
    {
      displayName: 'CERTIFICADO DE NACIMIENTO PARA ASIGNACION FAMILIAR',
      isRequired: true,
      name: 'CERTIFICADO_DE_NACIMIENTO_PARA _ASIGNACION_FAMILIAR'
    },
    {
      displayName: 'CERTIFICADO DE COTIZACIONES HISTORICA TRABAJADOR',
      isRequired: false,
      name: 'CERTIFICADO_DE_COTIZACIONES_HISTORICA_TRABAJADOR'
    },
    {
      displayName: 'FICHA DE POSTULACIÓN CON FIRMA Y TIMBRE DE LA EMPRESA',
      isRequired: true,
      name: 'FICHA_DE_POSTULACIÓN_CON_FIRMA_Y_TIMBRE DE_LA_EMPRESA'
    },
    {
      displayName: 'COTIZACIÓN DE LA CARRERA',
      isRequired: false,
      name: 'COTIZACIÓN_DE_LA_CARRERA'
    },
    {
      displayName: 'CERTIFICADO DE AFILIACION AFP',
      isRequired: false,
      name: 'CERTIFICADO_DE_AFILIACION_AFP'
    }
  ],
  revisionStatus: [
    { status: 'CREADO', name: 'Creado' },
    { status: 'REVISION', name: 'Revisión' },
    { status: 'RECHAZADA', name: 'Rechazada' },
    { status: 'DOCUMENTACION_COMPLETA', name: 'Documentacion completa' },
    { status: 'BECA_ASIGNADA', name: 'Beca asignada' },
    { status: 'BECA_APROBADA', name: 'Beca aprobada' }
  ]
}

export default scholarshipConfig
