import { View, Text, StyleSheet } from '@react-pdf/renderer'

const StatisticsHeader = ({ newCount, house }) => {
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
      <Text style={styles.main}>NUEVOS</Text>
      <Text style={styles.quantity}>{newCount}</Text>
      <Text style={styles.space}></Text>
      <Text style={styles.main}>CASA</Text>
      <Text style={styles.quantity}>{house}</Text>
    </View>
  )
}

export default StatisticsHeader
