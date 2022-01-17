import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { courseConfig } from '../../config'
import commonActions from '../../state/actions/common'
import usersActions from '../../state/actions/users'
import { CompanyRow } from '../Shared'
import { InputLabel, Select, TextArea, TextField } from '../UI'

const CreateForm = ({ type, data, formik }) => {
  const dispatch = useDispatch()
  const [selectedOTEC, setSelectedOTEC] = useState(null)
  const [instructorsList, setInstructorList] = useState([])
  const { otecs } = useSelector((state) => state.common)

  useEffect(() => {
    if (type === 'UPDATE' && otecs.length > 0) {
      const currentOtec = otecs.find(
        (item) => item.id === parseInt(data.otecId, 10)
      )
      setSelectedOTEC(currentOtec)
    }
  }, [type, otecs])

  useEffect(() => {
    const otecId = selectedOTEC?.id || ''
    const otecName = selectedOTEC?.businessName || ''
    formik.setFieldValue('otecId', otecId)
    formik.setFieldValue('otecName', otecName)
  }, [selectedOTEC])

  useEffect(() => {
    const { instructorId } = formik.values
    if (instructorId && instructorsList.length > 0) {
      const currentInstructor = instructorsList.find(
        (item) => item.id === parseInt(instructorId, 10)
      )
      formik.setFieldValue('instructorName', currentInstructor.name)
    } else {
      formik.setFieldValue('instructorName', '')
    }
  }, [formik.values.instructorId, instructorsList])

  useEffect(() => {
    const { instructorId } = formik.values
    if (instructorId === '') {
      formik.setFieldValue('instructorId', '')
      formik.setFieldValue('instructorName', '')
    }
  }, [formik.values.instructorId, instructorsList])

  useEffect(() => {
    dispatch(commonActions.getAllOTECS())
    dispatch(usersActions.getOTECUsers()).then((result) => {
      setInstructorList(result)
    })
  }, [])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel required>OTEC</InputLabel>
          {selectedOTEC ? (
            <CompanyRow
              company={selectedOTEC}
              onDelete={() => {
                setSelectedOTEC(null)
              }}
            />
          ) : (
            <Autocomplete
              required
              options={otecs}
              value={''}
              getOptionLabel={(option) => option.businessName || ''}
              onChange={(__, option) => {
                setSelectedOTEC(option)
              }}
              renderOption={(option) => (
                <CompanyRow.Autocomplete company={option} iconColor="#BD52F2" />
              )}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            label="Relator"
            required
            name="instructorId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.instructorId}
            helperText={
              formik.touched.instructorId && formik.errors.instructorId
            }
            error={
              formik.touched.instructorId && Boolean(formik.errors.instructorId)
            }
          >
            <option value="">SELECCIONE RELATOR </option>
            {instructorsList.map((item) => (
              <option
                value={item.id}
              >{`${item.names} ${item.paternal_surname} ${item.maternal_surname}`}</option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            label="Estado"
            required
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
            helperText={formik.touched.status && formik.errors.status}
            error={formik.touched.status && Boolean(formik.errors.status)}
          >
            <option value="">SELECCIONE ESTADO </option>
            {courseConfig.statusList.map((item) => (
              <option value={item} disabled={item !== 'CONVOCATORIA'}>
                {item}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextArea
            label="Descripción"
            required
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

CreateForm.defaultProps = {
  type: 'CREATE'
}

export default CreateForm
