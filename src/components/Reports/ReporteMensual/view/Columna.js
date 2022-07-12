import { View, Text, StyleSheet } from '@react-pdf/renderer'

const Columna = ({ primary, secondary }) => {
  const styles = StyleSheet.create({
    row: {
      textAlign: 'left',
      fontSize: '12pt',
      width: '80%'
    },
    main: {
      backgroundColor: 'transparent',
      padding: '3px',
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
