import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import companiesActions from '../../state/actions/companies'
import { PageHeading } from '../../components/UI'

import Tabs from '../../components/Company/Tabs'

const Company = ({ ...props }) => {
  const dispatch = useDispatch()
  const { idCompany } = props.match.params
  const { company } = useSelector((state) => state.companies)
  const goBack = () => {
    props.history.goBack()
  }

  useEffect(() => {
    dispatch(companiesActions.getCompany(idCompany))
  }, [])
  return (
    <div>
      <Box display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <PageHeading>{company?.business_name}</PageHeading>
      </Box>
      <Tabs />
    </div>
  )
}

export default withRouter(Company)
