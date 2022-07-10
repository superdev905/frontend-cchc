import { View, Text, StyleSheet } from '@react-pdf/renderer'

const FirstComment = ({ areaTotal, totalAtenciones, PrimerArea }) => {
  const styles = StyleSheet.create({
    subtitles2: {
      fontWeight: 'extrabold',
      fontSize: '13pt',
      marginHorizontal: '20px',
      marginTop: '10px'
    },
    text: {
      fontWeight: 'extralight',
      fontSize: '12pt',
      marginHorizontal: '20px',
      marginTop: '10px'
    }
  })

  const Br = () => '\n'

  return (
    <Text style={styles.text}>
      <View>
        <Text style={styles.subtitles2}>
          A- {areaTotal && areaTotal[0].total > 0 ? areaTotal[0].name : null}
        </Text>
        <Br />
        <Text style={styles.text}>
          La primera área de mayor intervención corresponde a{' '}
          {areaTotal && areaTotal[0].total > 0 ? areaTotal[0].name : null}, con
          porcentaje de{' '}
          {areaTotal && areaTotal[0].total
            ? `${Number.parseFloat(
                (areaTotal[0].total * 100) / totalAtenciones
              ).toFixed(2)}% `
            : '0%'}
          consultas realizadas. A continuación se detallan sus variables:
        </Text>
        <Br />
        <Br />
        <Text style={styles.text}> {PrimerArea || null} </Text>
      </View>
    </Text>
  )
}

export default FirstComment
