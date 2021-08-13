import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import companyActions from '../../state/actions/companies'
import constructionActions from '../../state/actions/constructions'
import { ActionsTable, Button, EmptyState, StatusChip, Wrapper } from '../UI'
import { useSuccess, useToggle } from '../../hooks'
import { ConfirmDelete, DataTable } from '../Shared'
import { ConstructionModal } from '../Constructions'
import useStyles from './styles'

const Details = ({ ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idCompany } = props.match.params
  const [tableData, setTableData] = useState([])
  const { constructions } = useSelector((state) => state.companies)
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
    dispatch(companyActions.getConstructions(idCompany))
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
        dispatch(companyActions.getConstructions(idCompany))
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchConstruction()
  }, [])

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
          <Button onClick={toggleOpenCreate}>Agregar</Button>
        </Box>

        <Box>
          {tableData.length === 0 ? (
            <EmptyState message="Esta empresa no tiene obras" />
          ) : (
            <DataTable
              columns={[
                {
                  name: 'Nombre',
                  selector: 'name',
                  sortable: true
                },
                {
                  name: 'Vigencia',
                  selector: '',
                  cell: (row) => (
                    <StatusChip
                      {...row}
                      success={row.status === 'VIGENTE'}
                      error={row.status === 'NO_VIGENTE'}
                      label={
                        row.status === 'VIGENTE' ? 'Vigente' : 'No vigente'
                      }
                    />
                  ),
                  hide: 'md'
                },
                {
                  name: 'Dirección',
                  selector: 'address',
                  hide: 'md'
                },
                {
                  name: '',
                  selector: '',
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
            />
          )}
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
            <span>
              ¿Estás seguro de eliminar
              <strong>{currentConstruction.business_name}</strong>?
            </span>
          }
        />
      )}
    </Box>
  )
}

export default withRouter(Details)
