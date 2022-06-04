import { View, Text, StyleSheet } from '@react-pdf/renderer'
import moment from 'moment'

const CompanyBodyTable = ({ companyName, constructionName }) => {
  const currentDate = moment().format('DD-MM-YYYY')
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      border: '1px solid black',
      fontSize: '10pt'
    },
    date: {
      width: '20%',
      borderRight: '1px solid black'
    },
    company: {
      width: '50%',
      borderRight: '1px solid black'
    },
    construction: {
      width: '30%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.date}>{currentDate}</Text>
      <Text style={styles.company}>
        {companyName.rut} : {companyName.business_name}
      </Text>
      <Text style={styles.construction}>{constructionName}</Text>
    </View>
  )
}

export default CompanyBodyTable
