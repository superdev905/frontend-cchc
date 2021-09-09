import { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import CompaniesList from '../../components/Companies/List'
import { PollsDot } from '../../components/Polls'
import uiActions from '../../state/actions/ui'

const Companies = () => {
  useEffect(() => {
    uiActions.setCurrentModule('EMPRESAS')
    console.log('CAMBIO DE MODULO: EMP')
  }, [])

  return (
    <Box>
      <PageHeading>
        Empresas
        <PollsDot module="EMPRESAS" />
      </PageHeading>
      <CompaniesList />
    </Box>
  )
}

export default Companies
