import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Chip, makeStyles, Typography } from '@material-ui/core'
import companyActions from '../../state/actions/companies'
import constructionActions from '../../state/actions/constructions'
import { ActionsTable, Button, Wrapper } from '../UI'
import { useSuccess, useToggle } from '../../hooks'
import { ConfirmDelete, DataTable } from '../Shared'
import { ConstructionModal } from '../Constructions'

const useStyles = makeStyles(() => ({
  root: {}
}))

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

  const onDelete = (construction) => {
    setCurrentConstruction(construction)
    toggleOpenDelete()
  }

  const deleteConstruction = (id) => {
    setDeleting(true)
    dispatch(constructionActions.deleteConstruction(id))
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
    dispatch(companyActions.getConstructions(idCompany))
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
    <Box className={classes.root}>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography>Obras</Typography>
          <Button onClick={toggleOpenCreate}>Agregar</Button>
        </Box>

        <Box>
          <DataTable
            columns={[
              {
                name: 'Razón social',
                selector: 'business_name',
                sortable: true
              },
              {
                name: 'Rut',
                selector: 'rut'
              },
              {
                name: 'Estado',
                selector: 'is_partner',
                cell: (row) => <Chip {...row} label={row.state}></Chip>,
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
        </Box>
      </Wrapper>
      <ConstructionModal open={openCreate} onClose={toggleOpenCreate} />
      {currentConstruction && openUpdate && (
        <ConstructionModal
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          construction={currentConstruction}
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
