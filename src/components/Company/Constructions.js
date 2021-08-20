import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import companyActions from '../../state/actions/companies'
import constructionActions from '../../state/actions/constructions'
import { ActionsTable, Button, StatusChip, Wrapper } from '../UI'
import { useSuccess, useToggle } from '../../hooks'
import { ConfirmDelete, DataTable } from '../Shared'
import { ConstructionModal } from '../Constructions'
import useStyles from './styles'

const Details = ({ ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { idCompany } = props.match.params
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    business_id: idCompany,
    state: 'ACTIVE'
  })
  const [tableData, setTableData] = useState([])
  const { constructions, company } = useSelector((state) => state.companies)
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const [currentConstruction, setCurrentConstruction] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const [deleting, setDeleting] = useState(false)

  const onEditClick = (construction) => {
    setCurrentConstruction(construction)
    toggleOpenUpdate()
  }

  const fetchConstruction = () => {
    setTableData([])
    setLoading(true)
    dispatch(companyActions.getConstructions(query)).then(() => {
      setLoading(false)
    })
  }

  const onDelete = (construction) => {
    setCurrentConstruction(construction)
    toggleOpenDelete()
  }

  const createConstruction = (values) =>
    dispatch(
      constructionActions.createConstruction({
        ...values,
        typology_id: values.typology_id || null,
        business_id: parseInt(idCompany, 10)
      })
    )

  const updateConstruction = (values) =>
    dispatch(
      constructionActions.updateConstruction(currentConstruction.id, {
        ...values,
        typology_id: values.typology_id || null,
        business_id: parseInt(idCompany, 10)
      })
    )

  const deleteConstruction = (id) => {
    setDeleting(true)
    dispatch(constructionActions.patchConstruction(id, { state: 'DELETED' }))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        enqueueSnackbar('Obra eliminada exitosamente', { variant: 'success' })
        fetchConstruction()
      })
      .catch((err) => {
        setDeleting(false)
        enqueueSnackbar(err.detail, {
          variant: 'error'
        })
        toggleOpenDelete()
      })
  }

  useEffect(() => {
    fetchConstruction()
  }, [query])

  useEffect(() => {
    setTableData(
      constructions.map((item) => ({
        ...item,
        is_partner: Boolean(item.is_partner),
        createDate: new Date(item.created_at).toLocaleDateString('es-CL', {
          dateStyle: 'long'
        })
      }))
    )
  }, [constructions])

  return (
    <Box>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.heading}>Obras</Typography>
          <Button
            onClick={toggleOpenCreate}
            disabled={company?.state === 'DELETED'}
          >
            Agregar
          </Button>
        </Box>
        <Box className={classes.btnGroup}>
          <Button
            size="small"
            variant={query.state === 'ACTIVE' ? 'contained' : 'outlined'}
            onClick={() => {
              setQuery({ ...query, state: 'ACTIVE' })
            }}
            className={clsx(query.state === 'ACTIVE' && classes.white)}
          >
            Ver activos
          </Button>
          <Button
            size="small"
            variant={query.state === 'DELETED' ? 'contained' : 'outlined'}
            onClick={() => {
              setQuery({ ...query, state: 'DELETED' })
            }}
            className={clsx(query.state === 'DELETED' && classes.white)}
          >
            Ver eliminados
          </Button>
        </Box>

        <Box>
          <DataTable
            emptyMessage={`Esta empresa no tiene obras ${
              query.state === 'ACTIVE' ? 'activas' : 'eliminadas'
            }`}
            columns={[
              {
                name: 'Nombre',
                selector: (row) => row.name,
                sortable: true
              },
              {
                name: 'Vigencia',
                cell: (row) => (
                  <StatusChip
                    {...row}
                    success={row.status === 'VIGENTE'}
                    error={row.status === 'NO_VIGENTE'}
                    label={row.status === 'VIGENTE' ? 'Vigente' : 'No vigente'}
                  />
                ),
                hide: 'md'
              },
              {
                name: 'Dirección',
                selector: (row) => row.address,
                hide: 'md'
              },
              {
                name: '',
                right: true,
                cell: (row) => (
                  <ActionsTable
                    {...row}
                    disabledDelete={row.state === 'DELETED'}
                    onEdit={() => onEditClick(row)}
                    onDelete={() => onDelete(row)}
                    onView={() => {
                      props.history.push(`/obras/${row.id}`)
                    }}
                  />
                )
              }
            ]}
            data={tableData}
            progressPending={loading}
          />
        </Box>
      </Wrapper>
      <ConstructionModal
        open={openCreate}
        onClose={toggleOpenCreate}
        successFunction={fetchConstruction}
        submitFunction={createConstruction}
      />
      {currentConstruction && openUpdate && (
        <ConstructionModal
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          construction={currentConstruction}
          submitFunction={updateConstruction}
          successMessage="Obra actualizada exitosamente"
          successFunction={fetchConstruction}
        />
      )}
      {currentConstruction && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          loading={deleting}
          success={success}
          onConfirm={() => deleteConstruction(currentConstruction.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar esta obra:{' '}
              <strong>{currentConstruction.name}</strong>?
            </Typography>
          }
        />
      )}
    </Box>
  )
}

export default withRouter(Details)
