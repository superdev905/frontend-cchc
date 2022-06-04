import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer'
import { useSelector } from 'react-redux'
import { Dialog } from '../../Shared'
import useStyles from '../../Shared/FileVisor/styles'
import CompanyHeaderTable from './tables/CompanyHeaderTable'
import CompanyBodyTable from './tables/CompanyBody'
import AttendedHeaderTable from './tables/AttendedHeaderTable'
import AttendedBodyTable from './tables/AttendedBodyTable'
import GesHeaderTable from './tables/GesHeaderTable'
import GesBodyTable from './tables/GesBodyTable'
import StatisticsTable from './tables/statistics/StatisticsTable'

const PrintModal = ({ open, onClose }) => {
  const { visit, totalUsers, assistanceConstructionList, statisticsPrint } =
    useSelector((state) => state.assistance)
  const test = useSelector((state) => state)
  console.log(test)
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
            <Text>REGISTRO DE VISITAS A LUGARES DE TRABAJO</Text>
            <CompanyHeaderTable />
            <CompanyBodyTable
              companyName={visit.bussiness}
              constructionName={visit.construction_name}
            />
            <AttendedHeaderTable />
            <AttendedBodyTable
              attendedUsers={totalUsers}
              assigned={visit.assigned}
            />
            <GesHeaderTable />
            <GesBodyTable
              assistConstructionList={assistanceConstructionList}
              assigned={visit.assigned}
            />
            <StatisticsTable statistics={statisticsPrint} />
          </Page>
        </Document>
      </PDFViewer>
    </Dialog>
  )
}

export default PrintModal
