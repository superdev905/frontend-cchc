import React from 'react'
import { useSelector } from 'react-redux'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  makeStyles,
  Box
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { FileThumbnail } from '../Shared'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}))
const StatusAccordion = () => {
  const { inclusionCaseDetails: details } = useSelector(
    (state) => state.inclusion
  )
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Aprobación de caso
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography>{details?.approbation?.comments}</Typography>
            <Typography style={{ fontWeight: 'bold' }}>
              Archivos adjuntos
            </Typography>
            {details?.approbation?.attachments.map((item) => (
              <>
                <Typography>{item.attachment.attachmentName}</Typography>
                <FileThumbnail
                  key={`approbation-file-${item.attachment.id}`}
                  fileName={item.attachment.fileName}
                  date={item.attachment.uploadDate}
                  fileSize={item.attachment.fileSize}
                />
              </>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            Aprobación de caso
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>
            Disabled Accordion
          </Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  )
}

export default StatusAccordion
