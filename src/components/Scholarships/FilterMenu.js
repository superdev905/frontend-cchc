import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Box, Menu, Fade, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Button } from '../UI'
import DatePicker from '../Shared/DatePicker'
import scholarshipsActions from '../../state/actions/scholarships'
import { scholarshipConfig } from '../../config'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '400px'
    }
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px',
    gap: '8px'
  }
}))

const FiltersMenu = ({ open, onClose, anchorEl, filters, setFilters }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { scholarshipType } = useSelector((state) => state.scholarships)

  useEffect(() => {
    dispatch(scholarshipsActions.getScholarshipTypes())
  }, [])

  return (
    <Menu
      classes={{ paper: classes.root }}
      TransitionComponent={Fade}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Box className={classes.content}>
        <Box width="100%">
          <Autocomplete
            options={scholarshipType}
            value={
              scholarshipType[
                scholarshipType.indexOf(
                  scholarshipType.find(
                    (item) => item.key === filters.scholarshipType
                  )
                )
              ]
            }
            onChange={(e, value) => {
              setFilters({
                ...filters,
                scholarshipType: value != null ? value.key : ''
              })
            }}
            getOptionSelected={(option, value) => option === value || ''}
            getOptionLabel={(option) => option.name || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tipo de Beca"
                placeholder=""
              />
            )}
          />
        </Box>
        <Box width="100%">
          <DatePicker
            label={'Fecha desde'}
            value={filters.startDate}
            onChange={(date) =>
              setFilters({
                ...filters,
                startDate:
                  date != null ? new Date(date).toISOString().toString() : ''
              })
            }
          />
        </Box>
        <Box width="100%">
          <DatePicker
            label={'Fecha hasta'}
            value={filters.endDate}
            onChange={(date) =>
              setFilters({
                ...filters,
                endDate:
                  date != null ? new Date(date).toISOString().toString() : ''
              })
            }
          />
        </Box>
        <Box width="100%">
          <Autocomplete
            options={scholarshipConfig.revisionStatus}
            value={
              scholarshipConfig.revisionStatus[
                scholarshipConfig.revisionStatus.indexOf(
                  scholarshipConfig.revisionStatus.find(
                    (item) => item.status === filters.status
                  )
                )
              ]
            }
            onChange={(e, value) => {
              setFilters({
                ...filters,
                status: value != null ? value.status : ''
              })
            }}
            getOptionSelected={(option, value) => option === value || ''}
            getOptionLabel={(option) => option.name || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Estado"
                placeholder=""
              />
            )}
          />
        </Box>

        <Box width="100%" display="flex" justifyContent="center">
          <Button
            onClick={() => {
              setFilters({
                scholarshipType: '',
                startDate: '',
                endDate: '',
                status: ''
              })
              onClose()
            }}
            variant="outlined"
          >
            Limpiar
          </Button>
        </Box>
      </Box>
    </Menu>
  )
}

export default FiltersMenu
