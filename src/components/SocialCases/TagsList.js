import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Chip } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import socialCaseActions from '../../state/actions/socialCase'

const TagsList = () => {
  const dispatch = useDispatch()
  const { filters } = useSelector((state) => state.socialCase)
  const [tags, setTags] = useState([])

  const handleDelete = (data) => {
    const newFilter = { ...filters }
    newFilter[data.filterName] = ''
    dispatch(socialCaseActions.setFilters(newFilter))
  }

  useEffect(() => {
    const arrayItem = []
    Object.entries(filters).forEach((e) => {
      const key = e[0]
      const value = e[1]

      if (key === 'page' || key === 'size' || key === 'search') {
        return
      }
      if (value === '' || value === 0) {
        return
      }
      const item = { filterName: key, label: value }
      arrayItem.push(item)
    })
    setTags(arrayItem)
  }, [filters])

  return (
    <Box container padding="10px">
      {tags.map((data) => (
        <span key={data.clave} style={{ margin: '3px' }}>
          <Chip
            label={`${data.filterName}: ${data.label}`}
            deleteIcon={<HighlightOff />}
            onDelete={() => handleDelete(data)}
          />
        </span>
      ))}
    </Box>
  )
}

export default TagsList
