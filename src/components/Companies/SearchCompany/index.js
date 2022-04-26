import { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete } from '@material-ui/lab'
import { Box, CircularProgress } from '@material-ui/core'
import companiesActions from '../../../state/actions/companies'
import searchWithRut from '../../../formatters/searchWithRut'
import { InputLabel, TextField } from '../../UI'
import { CompanyRow } from '../../Shared'

const SearchCompany = ({ onSelected, onDelete, onDefaultValue }) => {
  const dispatch = useDispatch()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const { companyCalendar } = useSelector((state) => state.companies)
  const defaultCompany = () => {
    dispatch(companiesActions.getMainCompany(onDefaultValue))
  }
  useEffect(() => {
    setSelectedCompany(companyCalendar)
  }, [companyCalendar])

  useEffect(() => {
    defaultCompany()
  }, [onDefaultValue])
  const searchCompanies = (e) => {
    setSearchValue(searchWithRut(e.target.value))
    setLoading(true)
    dispatch(
      companiesActions.searchCompanies({
        search: searchWithRut(e.target.value),
        page: 1
      })
    ).then((res) => {
      setList(res)
      setLoading(false)
    })
  }

  const onCompanySelect = (__, value) => {
    setSelectedCompany(value)
    onSelected(value)
  }

  return (
    <Box>
      {selectedCompany ? (
        <Box>
          <InputLabel>Empresa seleccionada </InputLabel>
          <CompanyRow
            company={selectedCompany}
            onDelete={() => {
              setSelectedCompany(null)
              setSearchValue('')
              setList([])
              onDelete()
            }}
          />
        </Box>
      ) : (
        <Autocomplete
          options={list}
          // value={selectedCompany || searchValue}
          inputValue={searchValue}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) =>
            `${option.rut} ${option.business_name}` || ''
          }
          onChange={onCompanySelect}
          loading={loading}
          renderOption={(option) => (
            <CompanyRow.Autocomplete company={option} />
          )}
          noOptionsText="Sin resultados"
          renderInput={(params) => (
            <TextField
              {...params}
              value={searchValue}
              onChange={searchCompanies}
              label="Busca y selecciona una empresa"
              placeholder="Buscar por: Rut y Nombre"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                )
              }}
            />
          )}
        />
      )}
    </Box>
  )
}

export default SearchCompany
