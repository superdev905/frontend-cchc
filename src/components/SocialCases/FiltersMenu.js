import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Box, Menu, Fade } from '@material-ui/core'
import { Select, Button } from '../UI'
import statesData from '../../resources/statesData'
import filterSocialCase from '../../resources/filtersSocialCase'
import tagsSocialCase from '../../resources/tagsSocialCase'
import DatePicker from '../Shared/DatePicker'
import companiesActions from '../../state/actions/companies'
import usersActions from '../../state/actions/users'
import commonActions from '../../state/actions/common'
import socialCaseActions from '../../state/actions/socialCase'
import { formatDate } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '400px'
    }
  }
}))

const FiltersMenu = ({ open, anchorEl, onClose }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { areas, regions } = useSelector((state) => state.common)
  const { filters } = useSelector((state) => state.socialCase)
  const [companies, setCompanies] = useState([])
  const [employees, setEmployees] = useState([])
  const [seleted, setSeleted] = useState(filterSocialCase)
  const [seletedTags, setSeletedTags] = useState(tagsSocialCase)

  const closeFilterMenu = () => {
    setSeleted(filterSocialCase)
    onClose()
  }

  const onSelectedOption = (event, typeInput) => {
    const { value } = event.target
    const { text } = event.target[event.target.selectedIndex]
    if (typeInput === 'companies') {
      setSeleted({
        ...seleted,
        businessId: parseInt(value, 10)
      })
      setSeletedTags({
        ...seletedTags,
        business: {
          ...seletedTags.business,
          filter: text
        }
      })
    }
    if (typeInput === 'states') {
      setSeleted({
        ...seleted,
        state: value
      })
      setSeletedTags({
        ...seletedTags,
        state: {
          ...seletedTags.state,
          filter: text
        }
      })
    }
    if (typeInput === 'profesional') {
      setSeleted({
        ...seleted,
        assistanceId: value
      })
      setSeletedTags({
        ...seletedTags,
        assistance: {
          ...seletedTags.assistance,
          filter: text
        }
      })
    }
    if (typeInput === 'zone') {
      setSeleted({
        ...seleted,
        zone: value
      })
      setSeletedTags({
        ...seletedTags,
        zone: {
          ...seletedTags.zone,
          filter: text
        }
      })
    }
    if (typeInput === 'delegation') {
      setSeleted({
        ...seleted,
        delegation: value
      })
      setSeletedTags({
        ...seletedTags,
        delegation: {
          ...seletedTags.delegation,
          filter: text
        }
      })
    }
    if (typeInput === 'area') {
      setSeleted({
        ...seleted,
        areaId: value
      })
      setSeletedTags({
        ...seletedTags,
        area: {
          ...seletedTags.area,
          filter: text
        }
      })
    }
  }

  const getStartDate = (date) => {
    setSeleted({
      ...seleted,
      startDate: date
    })
    setSeletedTags({
      ...seletedTags,
      startDate: {
        ...seletedTags.startDate,
        filter: formatDate(date)
      }
    })
  }

  const getEndDate = (date) => {
    setSeleted({
      ...seleted,
      endDate: date
    })
    setSeletedTags({
      ...seletedTags,
      endDate: {
        ...seletedTags.endDate,
        filter: formatDate(date)
      }
    })
  }

  const applyFilter = () => {
    const {
      businessId,
      state,
      assistanceId,
      zone,
      delegation,
      areaId,
      startDate,
      endDate
    } = seleted

    const newFilters = {
      ...filters,
      businessId,
      state,
      assistanceId,
      zone,
      delegation,
      areaId,
      startDate,
      endDate
    }

    dispatch(socialCaseActions.setFilters(newFilters))
    dispatch(socialCaseActions.setTags(seletedTags))

    closeFilterMenu()
  }

  useEffect(() => {
    dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
      (list) => {
        setCompanies(list)
      }
    )
    dispatch(usersActions.getFoundationUsers()).then((list) => {
      setEmployees(list)
    })
    dispatch(commonActions.getAreas())
    dispatch(commonActions.getRegions())
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        padding="10px"
      >
        <Box width="100%">
          Empresa:
          <Select
            name="companies"
            onChange={(e) => onSelectedOption(e, 'companies')}
          >
            <option value="">-Seleccione-</option>
            {companies.map((item) => (
              <option
                key={`application--filters-companies${item.id}`}
                value={item.id}
              >
                {item.business_name.toUpperCase()}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Estado:
          <Select name="status" onChange={(e) => onSelectedOption(e, 'states')}>
            <option value="">-Seleccione-</option>
            {statesData.map((item, index) => (
              <option key={`application--filters-state${index}`} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Profesional:
          <Select
            name="profesional"
            onChange={(e) => onSelectedOption(e, 'profesional')}
          >
            <option value="">-Seleccione-</option>
            {employees.map((item) => (
              <option
                key={`application--filters-employees${item.id}`}
                value={item.id}
              >
                {item.names}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Zona:
          <Select name="zone" onChange={(e) => onSelectedOption(e, 'zone')}>
            <option value="">-Seleccione-</option>
            {regions.map((item) => (
              <option
                key={`application--filters-zone${item.id}`}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Delegación:
          <Select
            name="delegation"
            onChange={(e) => onSelectedOption(e, 'delegation')}
          >
            <option value="">-Seleccione-</option>
            {regions.map((item) => (
              <option
                key={`application--filters-delegation${item.id}`}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%">
          Fecha desde:
          <DatePicker onChange={getStartDate} />
        </Box>

        <Box width="100%">
          Fecha Hasta:
          <DatePicker onChange={getEndDate} />
        </Box>

        <Box width="100%">
          Area:
          <Select name="area" onChange={(e) => onSelectedOption(e, 'area')}>
            <option value="">-Seleccione-</option>
            {areas.map((item) => (
              <option
                key={`application--filters-areas${item.id}`}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%" display="flex" justifyContent="center">
          <Button variant="outlined">Cancelar</Button>
          <Button onClick={applyFilter}>Aplicar</Button>
        </Box>
      </Box>
    </Menu>
  )
}

export default FiltersMenu
