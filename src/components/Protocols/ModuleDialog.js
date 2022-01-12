import { useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useToggle } from '../../hooks'
import filesActions from '../../state/actions/files'
import { Dialog, FileVisor } from '../Shared'
import { Button, EmptyState } from '../UI'
import ProtocolCard from './Card'

const ModuleDIalog = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { moduleList: list } = useSelector((state) => state.protocols)
  const [currentProtocol, setCurrentProtocol] = useState(null)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Protocolos disponibles
        </Typography>
        <Box mt={2}>
          <Grid container spacing={2}>
            {list.length === 0 ? (
              <EmptyState message="Este módulo no tiene protocolos vigentes" />
            ) : (
              <>
                {list.map((item) => (
                  <Grid item xs={12} key={`protocol-card-${item.id}`}>
                    <ProtocolCard
                      protocol={item}
                      onDownload={() => {
                        dispatch(
                          filesActions.downloadFile(
                            item.file.fileUrl,
                            item.file.fileName
                          )
                        )
                      }}
                      onView={() => {
                        setCurrentProtocol(item)
                        toggleOpenVisor()
                      }}
                    />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
          <Box mt={2} textAlign="center">
            <Button onClick={onClose}>Cerrar</Button>
          </Box>
        </Box>
        {openVisor && currentProtocol && (
          <FileVisor
            open={openVisor}
            onClose={toggleOpenVisor}
            src={currentProtocol.file.fileUrl}
            filename={currentProtocol.file.filename}
          />
        )}
      </Box>
    </Dialog>
  )
}

export default ModuleDIalog
