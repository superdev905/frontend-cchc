import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Chip } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import socialCaseActions from '../../state/actions/socialCase'

const TagsList = () => {
  const dispatch = useDispatch()
  const { tags: tagsStore, filters } = useSelector((state) => state.socialCase)
  const [tags, setTags] = useState([])

  const handleDelete = (data) => {
    const newFilter = { ...filters }
    const newTags = { ...tagsStore }

    newTags[data.keyTag].filter = ''
    newFilter[data.keyFilters] = ''

    dispatch(socialCaseActions.setFilters(newFilter))
    dispatch(socialCaseActions.setTags(newTags))
  }

  useEffect(() => {
    const arrayItem = []
    Object.values(tagsStore).forEach((values) => {
      const { filter } = values

      if (!filter) {
        return
      }
      const item = values
      arrayItem.push(item)
    })
    setTags(arrayItem)
    console.log(arrayItem)
  }, [filters])

  return (
    <Box container padding="10px">
      {tags.map((data) => (
        <span key={data.key} style={{ margin: '3px' }}>
          <Chip
            label={`${data.label}: ${data.filter}`}
            deleteIcon={<HighlightOff />}
            onDelete={() => handleDelete(data)}
          />
        </span>
      ))}
    </Box>
  )
}

export default TagsList
