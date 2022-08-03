import { ModuleIndicator } from '../../components/Shared'
import { PageHeading } from '../../components/UI'
import EscuelaTecnica from '../../components/EscuelaTecnica'

const ETC = () => (
  <div>
    <ModuleIndicator module={'ETC'} />
    <PageHeading>Escuela Técnica</PageHeading>
    <EscuelaTecnica />
  </div>
)

export default ETC
