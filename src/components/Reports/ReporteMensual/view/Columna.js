import { View, Text, StyleSheet } from '@react-pdf/renderer'

const Columna = ({ primary, secondary }) => {
  const styles = StyleSheet.create({
    row: {
      textAlign: 'center',
      color: 'white',
      fontSize: '12pt'
    },
    main: {
      backgroundColor: 'grey',
      border: '1px solid grey'
    }
  })
  return (
    <View style={styles.row}>
      <Text style={styles.main}>{primary} </Text>
      <Text style={styles.main}>{secondary} </Text>
    </View>
  )
}

export default Columna
