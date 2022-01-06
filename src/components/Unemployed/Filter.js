import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Menu, Grid, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Button } from '../UI'
import DatePicker from '../Shared/DatePicker'
import unemployedActions from '../../state/actions/unemployed'
import { formatDate } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '700px'
    }
  }
}))

const Filter = ({ open, anchorEl, onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { filters, query } = useSelector((state) => state.unemployed)

  const [localFilters, setLocalFilters] = useState({ ...filters })
  const [localQuery, setLocalQuery] = useState({ ...query })

  const applyFilters = () => {
    dispatch(unemployedActions.setFilters(localFilters))
    dispatch(unemployedActions.setQuery({ ...query, ...localQuery }))
    onClose()
  }

  const handleChange = (date, key) => {
    if (!date) {
      return
    }

    const copyLocalQuery = { ...localQuery }
    const copyLocalFilters = { ...localFilters }
    copyLocalQuery[key] = date
    copyLocalFilters[key] = {
      label: key !== 'endDate' ? 'Fecha Desde' : 'Fecha Hasta',
      date: formatDate(date)
    }
    setLocalFilters(copyLocalFilters)
    setLocalQuery(copyLocalQuery)
  }

  useEffect(() => {
    if (open) {
      setLocalFilters({ ...filters })
      setLocalQuery({ ...query })
    }
  }, [open])

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
      <Box>
        <Box pt={2} px={3}>
          <Box mb={2}>
            <Typography align="center">Filtros</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Box width="100%">
                Fecha desde:
                <DatePicker
                  value={query?.starDate}
                  onChange={(date) => handleChange(date, 'starDate')}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box width="100%">
                Fecha Hasta:
                <DatePicker
                  value={query?.endDate}
                  onChange={(date) => handleChange(date, 'endDate')}
                />
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={applyFilters}>Aplicar</Button>
          </Box>
        </Box>
      </Box>
    </Menu>
  )
}

export default Filter
