import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import CompaniesList from '../../components/Companies/List'
import uiActions from '../../state/actions/ui'

const Companies = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(uiActions.setCurrentModule('EMPRESAS'))
  }, [])

  return (
    <Box>
      <PageHeading>Empresas</PageHeading>
      <CompaniesList />
    </Box>
  )
}

export default Companies
