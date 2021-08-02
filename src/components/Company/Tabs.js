import { useState } from 'react'
import { Box } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Tabs } from '../Shared'

const CompanyTabs = ({ children }) => {
  const history = useHistory()
  const location = useLocation()
  const { idCompany } = useParams()

  const getValue = () => {
    if (location.pathname.includes('constructions')) return 3
    if (location.pathname.includes('contacts')) return 2
    if (location.pathname.includes('divisions')) return 1

    return 0
  }

  const [tab] = useState(getValue())

  const getRoute = (value) => {
    if (value === 3) return 'constructions'
    if (value === 2) return 'contacts'
    if (value === 1) return 'divisions'
    return 'details'
  }

  const handleTabChange = (__, newValue) => {
    history.push(`/company/${idCompany}/${getRoute(newValue)}`)
  }

  return (
    <Box>
      <Box>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          tabs={['Detalles', 'Divisiones', 'Contactos', 'Obras']}
        >
          {children}
        </Tabs>
      </Box>
    </Box>
  )
}

export default CompanyTabs
