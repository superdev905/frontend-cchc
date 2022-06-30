import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer'
import { useSelector } from 'react-redux'
import { Dialog } from '../../Shared'
import useStyles from '../../Shared/FileVisor/styles'

const MonthlyReport = ({ open, onClose }) => {
  const { visit, totalUsers, assistanceConstructionList, statisticsPrint } =
    useSelector((state) => state.assistance)
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={true}
      classes={{ paper: classes.modalRoot }}
    >
      <PDFViewer style={{ minHeight: '85vh', width: '100%' }}>
        <Document style={{ minHeigth: '100vh', width: '100%' }}>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text> FUNDACIÓN SOCIAL SOMOS CCHC </Text>
            <Text>INFORME EJECUTIVO</Text>
            <Text> "NOMBRE EMPRESA" </Text>
            <Text> "FECHA SELECCIONADA" </Text>
          </Page>
          <Page size="A4" style={{ padding: '20px' }}>
            <Text> FUNDACIÓN SOCIAL SOMOS CCHC </Text>
            <Text>INFORME EJECUTIVO</Text>
            <Text> "NOMBRE EMPRESA" </Text>
            <Text> "FECHA SELECCIONADA" </Text>
          </Page>
        </Document>
      </PDFViewer>
    </Dialog>
  )
}

export default MonthlyReport
