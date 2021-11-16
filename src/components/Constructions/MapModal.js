import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { Button, LabeledRow, Text, Wrapper } from '../UI'
import { Dialog, Map } from '../Shared'
import { useSuccess, useToggle } from '../../hooks'
import constructionsActions from '../../state/actions/constructions'
import AddressUpdate from './AddressUpdate'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}))

const MapModal = ({
  loading,
  open,
  onClose,
  successFunction,
  constructionId
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { construction } = useSelector((state) => state.constructions)
  const { success } = useSuccess()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()

  const fetchConstruction = () => {
    if (successFunction) {
      successFunction()
    }
    dispatch(constructionsActions.getConstruction(constructionId))
  }

  const updateConstruction = (values) =>
    dispatch(
      constructionsActions.updateConstruction(construction.id, {
        ...construction,
        ...values
      })
    )

  useEffect(() => {
    if (open) {
      fetchConstruction()
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
    >
      <Wrapper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className={classes.heading}>Obra</Typography>
          <Button endIcon={<EditIcon />} onClick={toggleOpenEdit}>
            Actualizar dirección
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Box>
                <LabeledRow label="Nombre">
                  <Text loading={loading}>{construction?.name}</Text>
                </LabeledRow>
                <LabeledRow label="Dirección">
                  <Text loading={loading}>{construction?.address}</Text>
                </LabeledRow>
                <LabeledRow label="Región">
                  <Text loaderWidth="80%" loading={loading}>
                    {construction?.region?.name}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Comuna">
                  <Text loading={loading}>{construction?.commune?.name}</Text>
                </LabeledRow>
              </Box>
              {construction && (
                <Map
                  height={400}
                  longitude={parseFloat(construction.longitude)}
                  latitude={parseFloat(construction.latitude)}
                  markers={[
                    {
                      address: construction.address,
                      longitude: parseFloat(construction.longitude),
                      latitude: parseFloat(construction.latitude)
                    }
                  ]}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Wrapper>

      {construction && openEdit && (
        <AddressUpdate
          open={openEdit}
          onClose={toggleOpenEdit}
          construction={construction}
          submitFunction={updateConstruction}
          successMessage="Obra actualizada exitosamente"
          successFunction={fetchConstruction}
          success={success}
        />
      )}
    </Dialog>
  )
}

export default MapModal
