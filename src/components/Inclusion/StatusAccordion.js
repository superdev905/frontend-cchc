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
import ApproveDetails from './Approve/Details'
import RejectDetails from './Reject/Details'
import { LabeledRow, Text } from '../UI'
import { formatDate } from '../../formatters'
import { UserCard } from '../Users'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  },
  accordionHeading: {
    fontWeight: 'bold'
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  }
}))
const StatusAccordion = () => {
  const { inclusionCaseDetails: details } = useSelector(
    (state) => state.inclusion
  )
  const classes = useStyles()

  return (
    <Box>
      <Typography className={classes.heading}>Estado de caso</Typography>
      {details?.approbation && (
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel de aprobación"
          >
            <Typography className={classes.accordionHeading}>
              Aprobación de caso
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box width={'100%'}>
              <ApproveDetails caseNumber={details.number} />
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
      {details?.rejection && (
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel de rechazo"
          >
            <Typography className={classes.accordionHeading}>
              Rechazo de caso
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box width={'100%'}>
              <RejectDetails caseNumber={details.number} />
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
      {details?.close && (
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel de cierre"
          >
            <Typography className={classes.accordionHeading}>
              Cierre de caso
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box width={'100%'}>
              <LabeledRow label={'Fecha'}>
                <Text> {formatDate(details.close.date)}</Text>
              </LabeledRow>
              <LabeledRow label={'Commentarios'}>
                <Text>{details.close.comments} </Text>
              </LabeledRow>
              <Typography className={classes.label}>Assistente</Typography>
              <UserCard user={details.close.assistance} />
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  )
}

export default StatusAccordion
