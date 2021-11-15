import { useState } from 'react'
import { Box } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Tabs } from '../Shared'

const EmployeeTabs = ({ children }) => {
  const history = useHistory()
  const location = useLocation()
  const { idEmployee } = useParams()

  const getValue = () => {
    if (location.pathname.includes('attachments')) return 7
    if (location.pathname.includes('attentions')) return 6
    if (location.pathname.includes('jobs-history')) return 5
    if (location.pathname.includes('specialties')) return 4
    if (location.pathname.includes('situation')) return 3
    if (location.pathname.includes('family')) return 2
    if (location.pathname.includes('contacts')) return 1

    return 0
  }

  const [tab] = useState(getValue())

  const getRoute = (value) => {
    if (value === 7) return 'attachments'
    if (value === 6) return 'attentions'
    if (value === 5) return 'jobs-history'
    if (value === 4) return 'specialties'
    if (value === 3) return 'situation'
    if (value === 2) return 'family'
    if (value === 1) return 'contacts'
    return 'info'
  }

  const handleTabChange = (__, newValue) => {
    history.push(`/employee/${idEmployee}/${getRoute(newValue)}`)
  }

  return (
    <Box>
      <Box>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          tabs={[
            'Datos personales',
            'Contacto',
            'Grupo Familiar',
            'Situación previsional y habitacional',
            'Especialidades',
            'Trabajos',
            'Atenciones',
            'Adjuntos'
          ]}
        >
          {children}
        </Tabs>
      </Box>
    </Box>
  )
}

export default EmployeeTabs
