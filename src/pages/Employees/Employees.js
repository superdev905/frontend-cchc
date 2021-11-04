import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ListEmployees } from '../../components/Employees'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'

const Employees = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('TRABAJADORES'))
  }, [])

  return (
    <div>
      <PageHeading>Trabajadores</PageHeading>
      <ListEmployees />
    </div>
  )
}

export default Employees
