import { View, Text, StyleSheet } from '@react-pdf/renderer'

const ObrasView = ({ firstName, secondName, thirdName, fourthName }) => {
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
      <Text style={styles.place}>{firstName}</Text>
      <Text style={styles.date}>{secondName}</Text>
      <Text style={styles.people}>{thirdName}</Text>
      <Text style={styles.consult}>{fourthName}</Text>
    </View>
  )
}

export default ObrasView
