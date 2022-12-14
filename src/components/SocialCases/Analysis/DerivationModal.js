import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Box, Typography, Grid, Chip } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { Select, Button, TextField, TextArea } from '../../UI'
import { Dialog } from '../../Shared'
import companyActions from '../../../state/actions/companies'
import socialCaseActions from '../../../state/actions/socialCase'
import usersActions from '../../../state/actions/users'

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  BoxForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center'
  },
  boxInput: {
    width: '100%'
  },
  boxHorizontal: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px'
  }
}))

const DerivationModal = ({ open, onClose, assistanceID, data, type }) => {
  console.log(data)
  const classes = useStyles()
  const { socialCaseId } = useParams()
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { caseDetails } = useSelector((state) => state.socialCase)
  const [assistanceList, setAssistanceList] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [state] = useState(data?.state)
  const [value, setValue] = useState([])
  const assistanceDerivationId = value.map((encargado) => encargado.id)

  const priority = ['BAJA', 'MEDIA', 'ALTA']

  const formik = useFormik({
    initialValues: {
      priority: data ? data.priority : '',
      observations: data ? data.observations : ''
    },
    validationSchema: Yup.object({
      priority: Yup.string().required('Seleccione la prioridad'),
      observations: Yup.string().required('El campo Observaciones es requerido')
    }),
    onSubmit: (formData) => {
      try {
        formData.date = new Date().toISOString()
        formData.assistanceTitularId = assistanceID
        formData.state = state
        formData.professionals = value.map((item) => ({
          userId: item.id,
          fullName: `${item.names} ${item.paternal_surname} ${
            item?.maternal_surname || ''
          }`
            .toUpperCase()
            .trim()
        }))
        if (type === 'EDIT') {
          dispatch(
            socialCaseActions.editDerivation(socialCaseId, formData)
          ).then(() => {
            enqueueSnackbar('Delegaci??n Editada Exitosamente', {
              variant: 'success'
            })
            dispatch(
              socialCaseActions.DerivationUpdate(
                socialCaseId,
                assistanceDerivationId
              )
            )
            dispatch(socialCaseActions.getSocialCaseById(socialCaseId))
            const actualDate = moment().format('DD/MM/YYYY')
            const asignedUsers = value?.map(
              (el) =>
                `${el?.names} ${el?.paternalSurname} ${el?.maternalSurname}`
            )
            const assignedTo = value?.map((el) => el.email)
            dispatch(
              socialCaseActions.SocialCaseMail(
                { type: 'ASIGN' },
                {
                  profesionalDerivatedList: asignedUsers,
                  date: actualDate.toString(),
                  socialCaseNumber: socialCaseId,
                  derivationComment: formData.observations,
                  to: assignedTo
                }
              )
            )
            onClose()
          })
        } else {
          dispatch(
            socialCaseActions.createDerivation(socialCaseId, formData)
          ).then(() => {
            enqueueSnackbar('Delegaci??n Creada Exitosamente', {
              variant: 'success'
            })
            dispatch(
              socialCaseActions.DerivationUpdate(
                socialCaseId,
                assistanceDerivationId
              )
            )
            dispatch(socialCaseActions.getSocialCaseById(socialCaseId))
            const actualDate = moment().format('DD/MM/YYYY')
            const asignedUsers = value?.map(
              (el) =>
                `${el?.names} ${el?.paternal_surname} ${el?.maternal_surname}`
            )
            const assignedTo = value?.map((el) => el.email)
            dispatch(
              socialCaseActions.SocialCaseMail(
                { type: 'ASIGN' },
                {
                  profesionalDerivatedList: asignedUsers,
                  date: actualDate.toString(),
                  socialCaseNumber: socialCaseId,
                  derivationComment: formData.observations,
                  to: assignedTo
                }
              )
            )
            onClose()
          })
        }
      } catch (error) {
        enqueueSnackbar(error, {
          variant: 'error'
        })
      }
    }
  })

  useEffect(() => {
    if (open) {
      formik.resetForm()
      if (type === 'EDIT') {
        setValue(data.professionals)
      } else {
        setValue([])
      }
    }
  }, [open, type])

  useEffect(() => {
    if (open) {
      if (caseDetails) {
        dispatch(companyActions.getContacts(caseDetails.businessId))
        dispatch(usersActions.getSocialAssistanceList()).then((res) => {
          setAssistanceList(res)
        })
      }
    }
  }, [caseDetails, open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Typography variant="h6" align="center" className={classes.title}>
          Crear Derivaci??n
        </Typography>

        <Grid container>
          <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Box className={classes.BoxForm}>
                <Box className={classes.boxHorizontal}>
                  <Box className={classes.boxInput}>
                    <TextField
                      label="Estado *"
                      name="state"
                      value={state}
                      disabled
                      fullWidth
                    />
                  </Box>

                  <Box className={classes.boxInput}>
                    <Select
                      label="Prioridad *"
                      name="priority"
                      value={formik.values.priority}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.priority &&
                        Boolean(formik.errors.priority)
                      }
                      helperText={
                        formik.touched.priority && formik.errors.priority
                      }
                    >
                      <option value="">-Seleccione-</option>
                      {priority.map((item) => (
                        <option key={`priority-${item}`} value={item}>
                          {item}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </Box>
                <Box className={classes.boxHorizontal}>
                  <Box className={classes.boxInput}>
                    <TextArea
                      label="Observaciones"
                      name="observations"
                      multiline
                      rows={8}
                      variant="outlined"
                      fullWidth
                      required
                      value={formik.values.observations}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.observations &&
                        Boolean(formik.errors.observations)
                      }
                      helperText={
                        formik.touched.observations &&
                        formik.errors.observations
                      }
                    />
                  </Box>
                </Box>
                <Box className={classes.boxHorizontal}>
                  <Box className={classes.boxInput}>
                    <Typography>Agregar nuevos Encargados *</Typography>
                    <Autocomplete
                      multiple
                      value={value}
                      onChange={(event, newValue) => {
                        setValue([...newValue])
                      }}
                      options={assistanceList}
                      getOptionLabel={(option) => option.names}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            label={`${option.names.toUpperCase()}-${
                              option.charge_name
                            }`}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Selecciona los Encargados"
                        />
                      )}
                      renderOption={(values) => (
                        <Box>
                          <Typography
                            style={{ fontSize: 17, fontWeight: 'bold' }}
                          >
                            {`Nombre:  ${values.names} ${values.paternal_surname}`}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: 15,
                              textTransform: 'capitalize'
                            }}
                          >
                            Cargo: {values.charge_name}{' '}
                          </Typography>
                        </Box>
                      )}
                    />
                  </Box>
                </Box>
                <Box className={classes.boxHorizontal}>
                  <Button type="submit">Guardar</Button>
                </Box>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

export default DerivationModal
