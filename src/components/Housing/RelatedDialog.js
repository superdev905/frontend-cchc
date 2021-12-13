import { Box, Typography } from '@material-ui/core'
import { useState } from 'react'
import SearchCompany from '../Companies/SearchCompany'
import { Dialog } from '../Shared'
import { Button } from '../UI'

const RelatedDialog = ({ open, onClose, onAdd }) => {
  const [company, setCompany] = useState(null)
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box>
        <Typography align="center">Agregar empresa relacionada</Typography>
        <Box>
          <SearchCompany
            onSelected={(value) => setCompany(value)}
            onDelete={() => setCompany(null)}
          />
        </Box>
        <Box textAlign="center">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onAdd(company)
              onClose()
            }}
          >
            Agregar
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

RelatedDialog.propTypes = {}

export default RelatedDialog
