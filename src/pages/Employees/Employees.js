import { ListEmployees } from '../../components/Employees'
import { PageHeading } from '../../components/UI'

const Employees = () => (
  <div>
    <ModuleIndicator module={'TRABAJADORES'} />
    <PageHeading>Trabajadores</PageHeading>
    <ListEmployees />
  </div>
)

export default Employees
