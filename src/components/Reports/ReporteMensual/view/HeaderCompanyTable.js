import { View, Text, StyleSheet } from '@react-pdf/renderer'

const HeaderCompanyTable = ({ first, second, third, fourth }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      border: '1px solid black',
      backgroundColor: 'grey',
      color: 'white',
      fontSize: '12pt'
    },
    number: {
      width: '20%'
    },
    date: {
      width: '20%'
    },
    name: {
      width: '20%'
    },
    acf: {
      width: '40%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.number}>{first}</Text>
      <Text style={styles.date}>{second}</Text>
      <Text style={styles.name}>{third}</Text>
      <Text style={styles.acf}>{fourth}</Text>
    </View>
  )
}

export default HeaderCompanyTable
