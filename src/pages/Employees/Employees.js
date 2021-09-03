import { ListEmployees } from '../../components/Employees'
import { PollsDot } from '../../components/Polls'
import { PageHeading } from '../../components/UI'

const Employees = () => (
  <div>
    <PageHeading>
      Trabajadores <PollsDot module="TRABAJADORES" />
    </PageHeading>
    <ListEmployees />
  </div>
)

export default Employees
