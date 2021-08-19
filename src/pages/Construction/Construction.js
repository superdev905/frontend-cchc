import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton, Typography } from '@material-ui/core'
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

  const deleteConstruction = (id) => {
    setDeleting(true)
    dispatch(constructionActions.patchConstruction(id, { state: 'DELETED' }))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        getConstructionDetails()
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
        state: construction.state,
        typology_id: values.typology_id || null,
        business_id: construction.business_id
      })
    )

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
            <PageHeading>{construction?.name}</PageHeading>
          </Text>
        </Box>
        <Box>
          <Button
            danger
            disabled={construction?.state === 'DELETED'}
            onClick={toggleOpenDelete}
          >
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
            <Typography variant="h6">
              ¿Estás seguro de eliminar
              <strong> {construction.name}</strong>?
            </Typography>
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
