import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { LabeledRow, Text, Wrapper } from '../UI'
import { Dialog, Map } from '../Shared'
import { useToggle } from '../../hooks'
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
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()

  const updateConstruction = (values) =>
    dispatch(
      constructionsActions.updateConstruction(construction.id, {
        ...values,
        typology_id: values.typology_id || null,
        business_id: construction.business_id
      })
    )

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Wrapper>
        <Box
          display="flex"
          justifyContent="flex-end"
          className={classes.actions}
        >
          <IconButton color="primary" onClick={toggleOpenEdit}>
            <EditIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Typography className={classes.heading}>Ubicación</Typography>
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
        />
      )}
    </Dialog>
  )
}

export default MapModal
