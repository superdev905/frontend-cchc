import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import {
  Box,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import { FiMoreVertical as MoreIcon } from 'react-icons/fi'
import companiesActions from '../../state/actions/companies'
import { Button, PageHeading } from '../../components/UI'
import Tabs from '../../components/Company/Tabs'
import { useMenu, useSuccess, useToggle } from '../../hooks'
import { ConfirmDelete } from '../../components/Shared'
import CompanyModal from '../../components/Companies/Create'

const useStyles = makeStyles((theme) => ({
  menuItem: {
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    fontSize: 15
  },
  moreButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: 8,
    '&:hover': { backgroundColor: theme.palette.primary.main }
  }
}))

const Company = ({ children }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { idCompany } = useParams()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { company } = useSelector((state) => state.companies)
  const [deleting, setDeleting] = useState(false)
  const [errorDelete, setErrorDelete] = useState('')
  const [errorDocs, setErrorDocs] = useState([])
  const { open, toggleOpen } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openErrorDelete, toggleOpen: toggleOpenErrorDelete } =
    useToggle()
  const { open: openSuspend, toggleOpen: toggleOpenSuspend } = useToggle()
  const { success, changeSuccess } = useSuccess()
  const { open: openMenu, anchorEl, handleOpen, handleClose } = useMenu()
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
        changeSuccess(true, () => {
          fetchCompanyDetails()
          toggleOpen()
          enqueueSnackbar('Empresa eliminada', { variant: 'success' })
        })
      })
      .catch((err) => {
        setDeleting(false)
        toggleOpen()
        setErrorDelete(err.message)
        toggleOpenErrorDelete()
        setErrorDocs(err.docs)
      })
  }

  const suspendCompany = () => {
    setDeleting(true)
    dispatch(companiesActions.suspendCompany(idCompany))
      .then(() => {
        setDeleting(false)
        changeSuccess(true, () => {
          fetchCompanyDetails()
          toggleOpenSuspend()
          enqueueSnackbar('Empresa suspendida', { variant: 'success' })
        })
      })
      .catch((err) => {
        setDeleting(false)
        enqueueSnackbar(err, { variant: 'error' })
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
          <Button
            disabled={company?.state === 'DELETED'}
            danger
            onClick={toggleOpen}
          >
            Eliminar
          </Button>
          <Button onClick={toggleOpenEdit}>Editar</Button>

          <IconButton onClick={handleOpen} className={classes.moreButton}>
            <MoreIcon />
          </IconButton>
          <Menu
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'bottom'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={openMenu}
            onClose={handleClose}
            anchorEl={anchorEl}
          >
            <MenuItem className={classes.menuItem}>Suspender</MenuItem>
            <MenuItem className={classes.menuItem}>Activar</MenuItem>
          </Menu>
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
      {errorDelete && openErrorDelete && (
        <ConfirmDelete
          open={openErrorDelete}
          message={
            <Box>
              <Typography variant="h6">
                <strong>Error al eliminar</strong>
              </Typography>
              <Typography>{errorDelete}</Typography>
              <Box p={2}>
                {errorDocs.map((item) => (
                  <Typography
                    align="left"
                    style={{ fontSize: '17px' }}
                    component="li"
                    key={`item-${item.id}`}
                  >
                    <a
                      href={`/${
                        item.type === 'construction' ? 'obras' : 'company'
                      }/${item.id}${
                        item.type === 'construction' ? '' : '/details'
                      }`}
                    >
                      {item.name}
                    </a>
                  </Typography>
                ))}
              </Box>
            </Box>
          }
          event="SHOW"
          confirmText="Aceptar"
          onConfirm={toggleOpenErrorDelete}
          onClose={toggleOpenErrorDelete}
        />
      )}
      {openSuspend && (
        <ConfirmDelete
          open={openSuspend}
          loading={deleting}
          success={success}
          message={
            <Typography variant="h6">
              <strong>¿Estás seguro de suspender esta empresa?</strong>
            </Typography>
          }
          confirmText={'Suspender'}
          onConfirm={suspendCompany}
          onClose={toggleOpenSuspend}
        />
      )}
    </div>
  )
}

export default Company
