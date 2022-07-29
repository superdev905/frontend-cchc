import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  Typography
} from '@material-ui/core'
import { Select, TextField } from '../../UI'
import { CurrencyTextField, DatePicker } from '../../Shared'
import CourseForm from '../../Courses/CourseForm'
import commonActions from '../../../state/actions/common'
import uiActions from '../../../state/actions/ui'
import { PollsModule } from '../../Polls'

const statusList = ['VIGENTE', 'NO VIGENTE']

const BenefitForm = ({ type, formik, actions }) => {
  const dispatch = useDispatch()
  const { areas } = useSelector((state) => state.common)

  const validNumber = (num) => {
    if (num === '') return ''
    if (Number.isNaN(num)) return ''
    if (num * 1 < 0) return ''
    if (num === '0') return ''
    return parseInt(num, 10)
  }

  useEffect(() => {
    dispatch(commonActions.getAreas())
    dispatch(uiActions.setCurrentModule('BENEFICIOS'))
  }, [])

  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Código"
              name="code"
              required
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              inputProps={{ maxLength: 7 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre del beneficio"
              name="name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre del proyecto"
              name="projectName"
              required
              value={formik.values.projectName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.projectName && Boolean(formik.errors.projectName)
              }
              helperText={
                formik.touched.projectName && formik.errors.projectName
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              required
              label="Fecha de inicio"
              disabledFuture={false}
              value={formik.values.startDate}
              helperText={formik.touched.startDate && formik.errors.startDate}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              onChange={(date) => {
                formik.setFieldTouched('startDate')
                formik.setFieldValue('startDate', date)
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              required
              label="Fecha de termino"
              minDate={formik.values.startDate}
              disabledPast
              disabledFuture={false}
              value={formik.values.endDate}
              helperText={formik.touched.endDate && formik.errors.endDate}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              onChange={(date) => {
                formik.setFieldTouched('endDate')
                formik.setFieldValue('endDate', date)
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Select
              label="Estado"
              required
              name="isActive"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.isActive}
              helperText={formik.touched.isActive && formik.errors.isActive}
              error={formik.touched.isActive && Boolean(formik.errors.isActive)}
            >
              <option value="">SELECCIONE ESTADO</option>
              {statusList.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Cupos anuales"
              name="usersQuantity"
              required
              type="number"
              value={formik.values.usersQuantity}
              onChange={(e) => {
                formik.setFieldTouched('usersQuantity')
                formik.setFieldValue(
                  'usersQuantity',
                  validNumber(e.target.value)
                )
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.usersQuantity &&
                Boolean(formik.errors.usersQuantity)
              }
              helperText={
                formik.touched.usersQuantity && formik.errors.usersQuantity
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CurrencyTextField
              label="Costo de total"
              required
              name="totalCost"
              value={formik.values.totalCost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.totalCost && Boolean(formik.errors.totalCost)
              }
              helperText={formik.touched.totalCost && formik.errors.totalCost}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Select
              label="Área"
              name="areaId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.areaId}
            >
              <option value="">SIN ÁREA</option>
              {areas.map((item) => (
                <option key={`area-option-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          {type === 'CREATE' && (
            <Grid item xs={12}>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      value={formik.values.isCourse}
                      onChange={(e) => {
                        formik.setFieldValue('isCourse', e.target.checked)
                      }}
                    />
                  }
                  label="Este beneficio es un curso"
                />
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            {formik.values.isCourse && type === 'CREATE' && (
              <Box>
                <Typography style={{ marginBottom: 10 }}>
                  Detalles de curso
                </Typography>
                <CourseForm formik={formik} type="CREATE" />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box>
        <PollsModule />
      </Box>
      {actions}
    </Box>
  )
}

BenefitForm.defaultProps = {
  type: 'CREATE'
}

export default BenefitForm
