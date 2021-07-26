import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton, Typography } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import companiesActions from '../../state/actions/companies'
import { Button, PageHeading } from '../../components/UI'
import Tabs from '../../components/Company/Tabs'
import { useSuccess, useToggle } from '../../hooks'
import { ConfirmDelete } from '../../components/Shared'
import CompanyModal from '../../components/Companies/Create'

const Company = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { idCompany } = useParams()
  const { company } = useSelector((state) => state.companies)
  const [deleting, setDeleting] = useState(false)
  const { open, toggleOpen } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { success, changeSuccess } = useSuccess()
  const goBack = () => {
    history.push('/companies')
  }

  const fetchCompanyDetails = () => {
    dispatch(companiesActions.getCompany(idCompany))
  }

  const blockCompany = () => {
    setDeleting(true)
    dispatch(companiesActions.blockCompany(idCompany))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        fetchCompanyDetails()
        toggleOpen()
      })
      .catch(() => {
        setDeleting(false)
        toggleOpen()
      })
  }
  useEffect(() => {
    fetchCompanyDetails()
  }, [])
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <PageHeading>{company?.business_name}</PageHeading>
        </Box>
        <Box>
          <Button danger onClick={toggleOpen}>
            Eliminar
          </Button>
          <Button onClick={toggleOpenEdit}>Editar</Button>
        </Box>
      </Box>
      <Tabs>{children}</Tabs>
      <ConfirmDelete
        open={open}
        loading={deleting}
        success={success}
        message={
          <Typography variant="h6">
            <strong>¿Estás seguro de eliminar este cliente?</strong>
          </Typography>
        }
        onConfirm={blockCompany}
        onClose={toggleOpen}
      />
      {company && openEdit && (
        <CompanyModal
          type="UPDATE"
          data={company}
          open={openEdit}
          successFunction={fetchCompanyDetails}
          onClose={toggleOpenEdit}
        />
      )}
    </div>
  )
}

export default Company
