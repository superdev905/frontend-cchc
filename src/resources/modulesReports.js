const modulesReports = [
  {
    module: 'Visitas',
    name: 'Todas las Atenciones',
    type: 'ALL_VISITS',
    isActive: true
  },
  {
    module: 'Visitas',
    name: 'Atenciones por Empresa',
    type: 'VISITS_COMPANY',
    isActive: true
  },
  {
    module: 'Visitas',
    name: 'Atenciones por Profesional',
    type: 'VISITS_ASSIGNED',
    isActive: true
  },
  {
    module: 'Calendario',
    name: 'Asistencias por Trabajador',
    type: 'ASSISTANCE_EMPLOYEE',
    isActive: true
  },
  {
    module: 'Calendario',
    name: 'Asistencias por Empresa',
    type: 'ASSISTANCE_COMPANY',
    isActive: true
  },
  {
    module: 'Empresas',
    name: 'Reporte mensual por Empresa',
    type: 'MONTHLY_REPORT',
    report: 'ASSISTANCE_COMPANY',
    isActive: true
  },
  {
    module: 'Caso social',
    name: 'Reporte Caso Social',
    type: 'INFORME_CSOCIAL',
    report: 'INFORME_CSOCIAL',
    isActive: true
  },
  {
    module: 'Vivienda',
    name: 'Reporte Convenio',
    type: 'INFORME_CONVENIO',
    report: 'INFORME_CONVENIO',
    isActive: true
  },
  {
    module: 'Vivienda',
    name: 'Reporte Anexos por convenio',
    type: 'INFORME_ANEXO_CONVENIO',
    report: 'INFORME_ANEXO_CONVENIO',
    isActive: true
  }
]

export default modulesReports
