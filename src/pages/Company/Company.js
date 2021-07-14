import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton, Typography } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import companiesActions from '../../state/actions/companies'
import { Button, PageHeading, Wrapper } from '../../components/UI'
import CreateModal from '../../components/Contacts/CreateModal'
import Tabs from '../../components/Company/Tabs'
import useToggle from '../../hooks/useToggle'

const Company = ({ ...props }) => {
  const dispatch = useDispatch()
  const { idCompany } = props.match.params
  const { company } = useSelector((state) => state.companies)
  const { open: openContact, toggleOpen: toggleOpenContact } = useToggle()
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
      <Wrapper>
        <Box>
          <Typography>{company?.name}</Typography>
          <Typography>{company?.business_name}</Typography>
          <Typography>{company?.name}</Typography>
        </Box>
      </Wrapper>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography>Subempresas</Typography>
          <Button>Nueva </Button>
        </Box>
        <CreateModal />
      </Wrapper>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography>Contactos</Typography>
          <Button onClick={toggleOpenContact}>Nuevo contacto </Button>
          <CreateModal open={openContact} onClose={toggleOpenContact} />
        </Box>
      </Wrapper>
    </div>
  )
}

export default withRouter(Company)
