import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Menu, Fade, makeStyles, Grid } from '@material-ui/core'
import { Button, Select } from '../UI'
import DatePicker from '../Shared/DatePicker'
import scholarshipsActions from '../../state/actions/scholarships'
import { scholarshipConfig } from '../../config'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: '400px'
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Select
            label="Beca"
            name="scholarshipId"
            onChange={(e) => {
              setFilters({ ...filters, scholarshipId: e.target.value })
            }}
          >
            <option value="">TODOS</option>
            {scholarshipType.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label={'Fecha desde'}
            value={filters.startDate}
            onChange={(date) =>
              setFilters({
                ...filters,
                startDate: date
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label={'Fecha hasta'}
            value={filters.endDate}
            onChange={(date) =>
              setFilters({
                ...filters,
                endDate: date
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            label={'Estado'}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value
              })
            }
          >
            <option value="">TODOS</option>
            {scholarshipConfig.revisionStatus.map((item) => (
              <option key={`status-option-${item.status}`} value={item.status}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
      </Grid>
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
    </Menu>
  )
}

export default FiltersMenu
