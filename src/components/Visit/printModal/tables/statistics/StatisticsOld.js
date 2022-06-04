import { View, Text, StyleSheet } from '@react-pdf/renderer'

const StatisticsHeader = ({ old, subcontract }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
      fontSize: '12pt'
    },
    main: {
      width: '30%',
      backgroundColor: 'grey',
      border: '1px solid grey'
    },
    quantity: {
      width: '20%',
      color: 'black',
      border: '1px solid black'
    },
    space: {
      width: '20%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.main}>ANTIGUOS</Text>
      <Text style={styles.quantity}>{old}</Text>
      <Text style={styles.space}></Text>
      <Text style={styles.main}>SUBCONTRATO</Text>
      <Text style={styles.quantity}>{subcontract}</Text>
    </View>
  )
}

export default StatisticsHeader
