import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiTrash2 as DeleteIcon } from 'react-icons/fi'
import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import { Button, Select, InputLabel, TextArea } from '../../UI'
import commonActions from '../../../state/actions/common'
import { AttentionStatus } from '../../../config'
import { useSuccess, useToggle } from '../../../hooks'
import { /* ActivityCard, */ BenefitCard } from '../../Benefits'
import benefitsActions from '../../../state/actions/benefits'
import useStyles from './styles'

const attentionPlaces = ['OFICINA', 'TERRENO', 'VIRTUAL']

const WorkerInterventionRecord = ({ employee, type, visitShift, formik }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { areas, managementList } = useSelector((state) => state.common)
  const { user } = useSelector((state) => state.auth)
  const [topics, setTopics] = useState([])
  const [attachedFile, setAttachedFile] = useState(null)
  const [selectedManagement, setSelectedManagement] = useState('')
  const [activityDetails, setActivityDetails] = useState({
    benefit: null,
    activity: null
  })
  const { open: openBenefit, toggleOpen: toggleOpenBenefit } = useToggle()

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'area': {
        const area = areas.find((item) => item.id === parseInt(value, 10))
        setTopics(area.topics)
        // setAreas(area?.areas || [])
        formik.setFieldValue('area_id', area.id)
        formik.setFieldValue('area_name', area.name)
        break
      }
      case 'topic': {
        const topic = topics.find((item) => item.id === parseInt(value, 10))
        formik.setFieldValue('topic_id', topic.id)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  const setAttentionPlace = (shiftName) => {
    if (shiftName === 'COVID') return 'VIRTUAL'
    if (shiftName === 'AT.CESANTES') return 'OFICINA'
    return 'TERRENO'
  }

  useEffect(() => {
    if (type === 'CREATE') {
      formik.setFieldValue('date', new Date())
      formik.setFieldValue('attention_place', setAttentionPlace(visitShift))
    }
  }, [type, visitShift])

  useEffect(() => {
    if (formik.values.area_id && areas.length > 0) {
      handleSelectChange({
        target: { name: 'area', value: formik.values.area_id }
      })
    }
  }, [formik.values.area_id, areas])

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getAreas())
      dispatch(commonActions.getManagement())
    }
  }, [open])

  return (
    <Box>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <strong>Complete los siguientes campos</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Select
              label="Lugar de atención"
              name="attention_place"
              required
              value={formik.values.attention_place}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.attention_place &&
                Boolean(formik.errors.attention_place)
              }
              helperText={
                formik.touched.attention_place && formik.errors.attention_place
              }
            >
              <option value="">SELECCIONE LUGAR </option>
              {attentionPlaces.map((item, i) => (
                <option key={`plce-${i}-${item}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Select
              label="Método de contacto"
              name="contact_method"
              required
              value={formik.values.contact_method}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contact_method &&
                Boolean(formik.errors.contact_method)
              }
              helperText={
                formik.touched.contact_method && formik.errors.contact_method
              }
            >
              <option value="">SELECCIONE OPCIÓN </option>
              {[
                'PRESENCIAL',
                'TELEFÓNICO',
                'RED SOCIAL',
                'VIDEO CONFERENCIA'
              ].map((item, i) => (
                <option key={`plce-${i}-${item}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Select
              label="Area"
              name="area"
              required
              value={formik.values.area_id}
              onChange={handleSelectChange}
              onBlur={formik.handleBlur}
              error={formik.touched.area_id && Boolean(formik.errors.area_id)}
              helperText={formik.touched.area_id && formik.errors.area_id}
            >
              <option value={`INVALID`}>Seleccione area</option>
              {areas.map((item, index) => (
                <option key={`area--${index}`} value={`${item.id}`}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Select
              label="Tema"
              name="topic"
              required
              value={formik.values.topic_id}
              onChange={handleSelectChange}
              onBlur={formik.handleBlur}
              error={formik.touched.topic_id && Boolean(formik.errors.topic_id)}
              helperText={formik.touched.topic_id && formik.errors.topic_id}
            >
              <option value={`INVALID`}>Seleccione tema</option>
              {topics.map((item, index) => (
                <option key={`area--${index}`} value={`${item.id}`}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Select
              label="Gestión"
              name="management_id"
              required
              value={formik.values.management_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.management_id &&
                Boolean(formik.errors.management_id)
              }
              helperText={
                formik.touched.management_id && formik.errors.management_id
              }
            >
              <option value="">SELECCIONE GESTIÓN</option>
              {managementList.map((item, i) => (
                <option key={`management-${i}-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Select
              label="Estado"
              name="status"
              required
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            >
              <option value="">SELECCIONE ESTADO</option>
              {AttentionStatus.map((item, i) => (
                <option key={`status-${i}-${item}`} value={`${item.name}`}>
                  {`${item.short}: ${item.name}`}
                </option>
              ))}
            </Select>
          </Grid>
          {selectedManagement === 'ENTREGA DE BENEFICIO' && (
            <Grid item xs={12}>
              <Box className={classes.benefitBox} p={2}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography style={{ marginBottom: 15 }}>
                    <strong>Detalles de beneficio</strong>
                  </Typography>
                  {activityDetails.benefit && activityDetails.activity && (
                    <Button
                      startIcon={<DeleteIcon />}
                      size="small"
                      danger
                      onClick={() =>
                        setActivityDetails({ benefit: null, activity: null })
                      }
                    >
                      Eliminar
                    </Button>
                  )}
                </Box>
                {activityDetails.benefit && activityDetails.activity ? (
                  <>
                    <BenefitCard benefit={activityDetails.benefit} selected />
                    {/* <ActivityCard activity={activityDetails.activity} />  */}
                  </>
                ) : (
                  <Box>
                    <EmptyState
                      message="Seleccione beneficio y actividad"
                      event={toggleOpenBenefit}
                      actionMessage="Ver beneficios"
                    ></EmptyState>
                  </Box>
                )}
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            <InputLabel required>Informe Empresa</InputLabel>
            <Box>
              <FormControlLabel
                value="end"
                control={
                  <Radio
                    color="primary"
                    checked={formik.values.company_report === 'SI'}
                    onChange={() => {
                      formik.setFieldValue('company_report', 'SI')
                    }}
                  />
                }
                label="SI"
              />
              <FormControlLabel
                value="end"
                control={
                  <Radio
                    color="primary"
                    checked={formik.values.company_report === 'NO'}
                    onChange={() => {
                      formik.setFieldValue('company_report', 'NO')
                    }}
                  />
                }
                label="NO"
              />
            </Box>
          </Grid>

          <Grid container spacing={2} item xs={12} md={12} lg={12}>
            <Grid item xs={12} md={3} lg={2}>
              <InputLabel required>Caso Social</InputLabel>
              <Box>
                <FormControlLabel
                  value="end"
                  control={
                    <Radio
                      color="primary"
                      checked={formik.values.is_social_case === 'SI'}
                      onChange={() => {
                        formik.setFieldValue('is_social_case', 'SI')
                      }}
                    />
                  }
                  label="SI"
                />
                <FormControlLabel
                  value="end"
                  control={
                    <Radio
                      color="primary"
                      checked={formik.values.is_social_case === 'NO'}
                      onChange={() => {
                        formik.setFieldValue('is_social_case', 'NO')
                      }}
                    />
                  }
                  label="NO"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
              <Select
                label="Caso"
                name="case_id"
                required
                value={formik.values.case_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.case_id && Boolean(formik.errors.case_id)}
                helperText={formik.touched.case_id && formik.errors.case_id}
              >
                <option value="">SELECCIONE CASO </option>
                {[
                  { index: 1, name: 'CASO 1' },
                  { index: 2, name: 'CASO 2' }
                ].map((item, i) => (
                  <option key={`case_id-${i}-${item}`} value={item.index}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
              <Select
                label="Plan de Intervención"
                name="task_id"
                required
                value={formik.values.task_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.task_id && Boolean(formik.errors.task_id)}
                helperText={formik.touched.task_id && formik.errors.task_id}
              >
                <option value="">SELECCIONE PLAN DE INTERVENCIÓN</option>
                {[
                  { index: 1, name: 'Plan de Intervención 1' },
                  { index: 2, name: 'Plan de Intervención 2' }
                ].map((item, i) => (
                  <option key={`plan-${i}-${item}`} value={item.index}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <TextArea
              rowsMin={4}
              label="Observaciones"
              name="observation"
              value={formik.values.observation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.observation && Boolean(formik.errors.observation)
              }
              helperText={
                formik.touched.observation && formik.errors.observation
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

WorkerInterventionRecord.defaultProps = {
  type: 'CREATE'
}

export default WorkerInterventionRecord
