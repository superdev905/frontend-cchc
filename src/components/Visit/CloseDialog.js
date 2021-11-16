import { memo, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Avatar, Box, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import assistanceActions from '../../state/actions/assistance'
import { useSuccess, useToggle } from '../../hooks'
import { ConfirmDelete, Dialog } from '../Shared'
import { TextArea, Button, InputLabel } from '../UI'

const validationSchema = Yup.object().shape({
  approver_id: Yup.number().required('Seleccione responsable'),
  comments: Yup.string('Ingrese comentarios')
})

const DetailsDialog = ({ open, onClose, visitId, successFunction }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [closing, setClosing] = useState(false)
  const { isMobile } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const { success, changeSuccess } = useSuccess()
  const { open: openConfirm, toggleOpen: toggleOpenConfirm } = useToggle()
  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      comments: '',
      approver_id: user?.id
    },
    onSubmit: () => {
      toggleOpenConfirm()
      formik.setSubmitting(false)
    }
  })

  const closeVisit = () => {
    setClosing(true)
    dispatch(
      assistanceActions.closeVisit(visitId, {
        ...formik.values,
        date: new Date().toISOString()
      })
    )
      .then(() => {
        setClosing(false)
        changeSuccess(true, () => {
          if (successFunction) {
            successFunction()
          }
          onClose()
          enqueueSnackbar('Visita cerrada exitosamente', {
            variant: 'success'
          })
        })
      })
      .catch((err) => {
        setClosing(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Box mb={2}>
          <Typography
            align="center"
            variant="h6"
            style={{ fontWeight: 'bold' }}
          >
            {`Cierre: Visita ${visitId}`}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextArea
                rowsMin={2}
                name="comments"
                label={'Comentarios'}
                value={formik.values.comments}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={800}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Cierre autorizado por:</InputLabel>
              <Box mt={2} display="flex" alignItems="center">
                {user && (
                  <>
                    <Avatar style={{ backgroundColor: '#0084F4' }}>
                      {user.names.charAt(0)}
                    </Avatar>
                    <Typography
                      style={{ marginLeft: 10 }}
                    >{`${user.names} ${user.paternal_surname}`}</Typography>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="center">
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            disabled={!formik.isValid || formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
            Confirmar
          </Button>
        </Box>
        {openConfirm && (
          <ConfirmDelete
            onClose={toggleOpenConfirm}
            open={openConfirm}
            success={success}
            loading={closing}
            confirmText="Aceptar"
            message={
              <Box>
                <Typography variant="h6" align="center">
                  ¿Estas seguro de cerrar esta visita:
                  <strong>{` Visita ${visitId}`}</strong>?
                </Typography>
                <Box mt={2}>
                  <Alert severity="error">
                    Al confirmar el cierre de la visita, ya no se podrá seguir
                    atendiendo a los trabajadores
                  </Alert>
                </Box>
              </Box>
            }
            onConfirm={closeVisit}
          />
        )}
      </Box>
    </Dialog>
  )
}

export default memo(DetailsDialog)
