import { Fragment } from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import moment from 'moment'

const AttendedBodyTable = ({ attendedUsers, assigned }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      border: '1px solid black',
      fontSize: '10pt'
    },
    number: {
      width: '5%',
      borderRight: '1px solid black'
    },
    rut: {
      width: '20%',
      borderRight: '1px solid black'
    },
    names: {
      width: '30%',
      borderRight: '1px solid black'
    },
    mini: {
      width: '4%',
      borderRight: '1px solid black'
    },
    dig: {
      width: '18%',
      borderRight: '1px solid black'
    },
    date: {
      width: '27%'
    }
  })

  const rows =
    attendedUsers.length > 0 ? (
      attendedUsers.map((element, index) => (
        <View style={styles.row}>
          <Text style={styles.number}>{index + 1}</Text>
          <Text style={styles.rut}>{element.run}</Text>
          <Text style={styles.names}>{element.fullName}</Text>
          <Text style={styles.mini}>{element.tag}</Text>
          <Text style={styles.mini}>{element.S}</Text>
          <Text style={styles.mini}>{element.V}</Text>
          <Text style={styles.mini}>{element.P}</Text>
          <Text style={styles.mini}>{element.F}</Text>
          <Text style={styles.mini}>{element.E}</Text>
          <Text style={styles.mini}>{element.L}</Text>
          <Text style={styles.mini}>{element.D}</Text>
          <Text style={styles.mini}>{element.B}</Text>
          <Text style={styles.mini}>{element.FR}</Text>
          <Text style={styles.mini}>{element.PS}</Text>
          <Text style={styles.mini}>{element.IN}</Text>
          <Text style={styles.dig}>
            {assigned.names.charAt(0)}
            {assigned.paternal_surname}
          </Text>
          <Text style={styles.date}>
            {moment(element.date).format('DD-MM-YYYY HH:mm:ss')}
          </Text>
        </View>
      ))
    ) : (
      <View style={styles.row}>
        <Text style={styles.number}></Text>
        <Text style={styles.rut}></Text>
        <Text style={styles.names}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.mini}></Text>
        <Text style={styles.dig}></Text>
        <Text style={styles.date}></Text>
      </View>
    )
  return <Fragment>{rows}</Fragment>
}

export default AttendedBodyTable
