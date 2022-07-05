import { View, Text, StyleSheet } from '@react-pdf/renderer'

const ObrasView = ({ place, date, quantity, consult }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      border: '1px solid black',
      backgroundColor: 'transparent',
      color: 'black',
      fontSize: '12pt'
    },
    place: {
      width: '50%'
    },
    date: {
      width: '23%'
    },
    people: {
      width: '23%'
    },
    consult: {
      width: '13%'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.place}>{place}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.people}>{quantity}</Text>
      <Text style={styles.consult}>{consult}</Text>
    </View>
  )
}

export default ObrasView
