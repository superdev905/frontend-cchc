import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { Button, LabeledRow, Text, Wrapper } from '../UI'
import { Dialog, Map } from '.'
import { useSuccess, useToggle } from '../../hooks'
import ConstructionModal from '../Constructions/CreateModal'
import constructionsActions from '../../state/actions/constructions'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}))

const MapModal = ({ loading, open, onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { construction } = useSelector((state) => state.constructions)
  const { success, changeSuccess } = useSuccess()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()

  const fetchConstructions = () => {
    dispatch(constructionsActions.getConstruction(construction.id))
  }

  const updateConstruction = (values) =>
    dispatch(
      constructionsActions.updateConstruction(construction.id, {
        ...values,
        typology_id: values.typology_id || null,
        business_id: construction.business_id
      })
    )
      .then(() => {
        changeSuccess(true)
        fetchConstructions()
      })
      .catch(() => {
        changeSuccess(false)
      })

  useEffect(() => {
    if (open) {
      fetchConstructions()
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
          <Typography className={classes.heading}>
            {' '}
            Dirección de obra{' '}
          </Typography>
          <Button endIcon={<EditIcon />} onClick={toggleOpenEdit}>
            Editar obra
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Box>
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
        <ConstructionModal
          type="UPDATE"
          open={openEdit}
          onClose={toggleOpenEdit}
          construction={construction}
          submitFunction={updateConstruction}
          successMessage="Obra actualizada exitosamente"
          successFunction={fetchConstructions}
          success={success}
        />
      )}
    </Dialog>
  )
}

export default MapModal
