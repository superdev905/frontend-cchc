import { useEffect } from 'react'
import { ListEmployees } from '../../components/Employees'
import { PollsDot } from '../../components/Polls'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'

const Employees = () => {
  useEffect(() => {
    uiActions.setCurrentModule('TRABAJADORES')
    console.log('CAMBIO DE MODULO: TRAB')
  }, [])

  return (
    <div>
      <PageHeading>
        Trabajadores <PollsDot module="TRABAJADORES" />
      </PageHeading>
      <ListEmployees />
    </div>
  )
}

export default Employees
