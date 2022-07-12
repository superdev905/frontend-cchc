import MonthlyReport from './MonthlyReport'
import UserReportModal from './UserReportModal'
import DifusionReportModal from './DifusionReportModal'

function getSteps() {
  return ['Empresa y Obra', 'Áreas de Mayor Intervención', 'Difusión Mensual']
}

function getStepContent(stepIndex, { onClose }) {
  switch (stepIndex) {
    case 0:
      return <MonthlyReport onClose={onClose} />
    case 1:
      return <UserReportModal />
    case 2:
      return <DifusionReportModal />
    default:
      return <span>Paso no encontrado</span>
  }
}
