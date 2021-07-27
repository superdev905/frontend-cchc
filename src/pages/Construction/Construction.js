import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import constructionActions from '../../state/actions/constructions'
import { Button, PageHeading, Text } from '../../components/UI'
import {
  ConstructionContactsList,
  ConstructionDetails,
  ConstructionModal
} from '../../components/Constructions'
import { ConfirmDelete } from '../../components/Shared'
import { useSuccess, useToggle } from '../../hooks'

const Construction = () => {
  const dispatch = useDispatch()
  const { idConstruction } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { success, changeSuccess } = useSuccess()
  const { construction } = useSelector((state) => state.constructions)

  const deleteConstruction = (id) => {
    setDeleting(true)
    dispatch(constructionActions.deleteConstruction(id))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  const goBack = () => {
    history.goBack()
  }

  const updateConstruction = (values) =>
    dispatch(
      constructionActions.updateConstruction(idConstruction, {
        ...values,
        typology_id: values.typology_id || null,
        business_id: construction.business_id
      })
    )

  const getConstructionDetails = () => {
    setLoading(true)
    dispatch(constructionActions.getConstruction(idConstruction))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getConstructionDetails()
  }, [])
  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Text loading={loading}>
            <PageHeading>{construction?.business_name}</PageHeading>{' '}
          </Text>
        </Box>
        <Box>
          <Button danger onClick={toggleOpenDelete}>
            Eliminar
          </Button>
          <Button onClick={toggleOpenUpdate}>Editar</Button>
        </Box>
      </Box>
      <ConstructionDetails loading={loading} />
      <ConstructionContactsList />
      {construction && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          loading={deleting}
          success={success}
          onConfirm={() => deleteConstruction(construction.id)}
          message={
            <span>
              ¿Estás seguro de eliminar
              <strong> {construction.business_name}</strong>?
            </span>
          }
        />
      )}
      {construction && openUpdate && (
        <ConstructionModal
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          construction={construction}
          submitFunction={updateConstruction}
          successFunction={getConstructionDetails}
          successMessage="Obra actualizada exitosamente"
        />
      )}
    </div>
  )
}

export default Construction
