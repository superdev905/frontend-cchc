import { Box } from '@material-ui/core'
import {
  PDFViewer,
  Document,
  Page,
  Text,
  StyleSheet
} from '@react-pdf/renderer'
import { useSelector } from 'react-redux'
import { Dialog } from '../../Shared'
import AreaView from './view/AreaAtendida'
import HouseAreaView from './view/AreaPrevision'
import ObrasView from './view/ObrasAtendidas'
import TeamView from './view/Team'

const MonthlyReport = ({ open, onClose, year, month }) => {
  /*  const { visit, totalUsers, assistanceConstructionList, statisticsPrint } =
    useSelector((state) => state.assistance)  */
  const { constructionByCompany } = useSelector((state) => state.constructions)
  const styles = StyleSheet.create({
    box: {
      display: 'flex',
      alignContent: 'space-between',
      height: '200px',
      flexDirection: 'column'
    },
    title: {
      marginTop: '20px',
      textAlign: 'center',
      color: 'black',
      fontSize: '24pt'
    },
    subtitle: {
      textAlign: 'center',
      fontWeight: 'extrabold',
      fontSize: '16pt',
      marginTop: '20px'
    },
    page: {
      padding: '20px'
    },
    subtitles: {
      fontWeight: 'extrabold',
      fontSize: '14pt',
      margin: '20px'
    },
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
    },
    description: {
      fontWeight: 'extrabold',
      fontSize: '12pt',
      textAlign: 'center'
    }
  })
  const Br = () => '\n'
  const jefaturas = [
    {
      name: 'Cristián Carvallo',
      email: 'ccarvallo@fundacioncchc.cl',
      cargo: 'Gerente Sostenibilidad',
      zona: '(Santiago)'
    },
    {
      name: 'Carlos García',
      email: 'cgarcia@fundacioncchc.cl',
      cargo: 'Gerente Servicio Social',
      zona: '(Santiago)'
    },
    {
      name: 'Greta Lopez',
      email: 'glopez@fundacioncchc.cl',
      cargo: 'Sub Gerente Zona Norte Grande',
      zona: '(Iquique)'
    },
    {
      name: 'Ana María Gómez',
      email: 'amgomez@fundacioncchc.cl',
      cargo: 'Sub Gerente Zona Sur',
      zona: '(Temuco)'
    },
    {
      name: 'Johana Chamorro',
      email: 'jchamorro@fundacioncchc.cl',
      cargo: 'Sub Gerente Quinta Región',
      zona: '(Valparaiso)'
    },
    {
      name: 'Constanza Galaz',
      email: 'cgalaz@fundacioncchc.cl',
      cargo: 'Jefa Norte Chico',
      zona: '(La Serena)'
    },
    {
      name: 'Yessica Pino',
      email: 'ypino@fundacioncchc.cl',
      cargo: 'Jefa Servicio Social Oficina',
      zona: '(Santiago)'
    },
    {
      name: 'Karina Hidalgo',
      email: 'khidalgo@fundacioncchc.cl',
      cargo: 'Coordinadora Atencion Social Empresas',
      zona: '(Santiago)'
    },
    {
      name: 'Krsitopher Poblete',
      email: 'kpoblete@fundacioncchc.cl',
      cargo: 'Coordinador Atencion Social Empresas',
      zona: '(Santiago)'
    },
    {
      name: 'Melisa Vega',
      email: 'mvega@fundacioncchc.cl',
      cargo: 'Coordinadora Atencion Social Empresas',
      zona: '(Santiago)'
    }
  ]
  const prueba = [
    {
      name: 'prueba',
      email: 'prueba@prueba',
      cargo: 'pruebas.',
      zona: 'prueba'
    }
  ]
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={true}
      /* classes={{ paper: classes.modalRoot }} */
    >
      <PDFViewer style={{ minHeight: '85vh', width: '100%' }}>
        <Document style={{ minHeigth: '100vh', width: '100%' }}>
          <Page size="A4" style={styles.page}>
            <Box>
              <Box style={styles.box}>
                <Text style={styles.title}> FUNDACIÓN SOCIAL SOMOS CCHC </Text>
              </Box>
              <Box>
                <Text style={styles.subtitle}>INFORME EJECUTIVO</Text>
              </Box>
              <Box>
                <Text style={styles.subtitle}>
                  {`${constructionByCompany[0].business.business_name}
                  ${constructionByCompany[0].name}`}
                </Text>
              </Box>
              <Box>
                <Text style={styles.subtitle}></Text>
              </Box>
              <Box>
                <Text style={styles.subtitle}> {`${month} ${year}`} </Text>
              </Box>
            </Box>
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>INTRODUCCIÓN</Text>
            <Text style={styles.text}>
              El presente documento informa sobre las actividades y gestiones
              realizadas por el equipo de la Fundación Social Cámara Chilena de
              la Construcción durante el mes de "inserte Fecha" en{' '}
              {constructionByCompany[0].business.business_name}. <Br />
              <Br /> Durante el periodo se atendió a los trabajadores de la
              empresa y sus grupos familiares tanto en las oficinas de la
              Fundación Social como en su lugar de trabajo.
              <Br />
              <Br /> El equipo a cargo de la atención social en este mes estuvo
              integrado por:
              <Br />
              <Br />
            </Text>
            <Text> </Text>
            {jefaturas.map((jefatura, index) => (
              <TeamView jefatura={jefatura} key={index} />
            ))}
            {prueba.map((jefatura, index) => (
              <TeamView jefatura={jefatura} key={index} />
            ))}
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>
              {' '}
              I. ATENCION SOCIAL EMPRESA - TERRENO "inserte fecha"
            </Text>
            <Text style={styles.text}>
              Durante el presente mes se visitaron las siguientes obras en las
              cuales se atendió al total de trabajadores que se indica:
              <Br />
              <Br />
            </Text>
            <Text style={styles.description}> Cuadro </Text>
            <Text style={styles.description}>
              Obras Atendidas durante el mes
            </Text>

            <ObrasView></ObrasView>

            <Text style={styles.text}>
              El total de atenciones realizadas durante "Inserte Fecha", se
              distribuye entre las areas citadas a continuacion:
            </Text>
            <Text style={styles.description}> Cuadro </Text>
            <Text style={styles.description}>
              {' '}
              Consultas realizadas por Area{' '}
            </Text>
            <AreaView></AreaView>
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.text}>
              De acuerdo a la información arrojada por la Consulta, es posible
              inferir que las áreas de mayor intervención son las siguientes:
            </Text>
            <Text style={styles.subtitles2}>A-"llenado por asistente" </Text>
            <Text style={styles.text}>
              La primera área de mayor intervención corresponde a Previsión, con
              porcentaje de 52,63% consultas realizadas. A continuación se
              detallan sus variables:
            </Text>
            <Text style={styles.subtitles2}>B- "llenado por asistente"</Text>
            <Text style={styles.text}>
              La segunda área de mayor intervención corresponde a Educación, con
              porcentaje de 18,42% consultas realizadas. A continuación se
              detallan sus variables:
            </Text>
            <Text style={styles.subtitles2}>C- Vivienda</Text>
            <Text style={styles.text}>
              La Tercera área de mayor intervención corresponde a Vivienda, con
              porcentaje de 18,42% consultas realizadas. A continuación se
              detallan sus variables:
            </Text>
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>
              DISTRIBUCION POR CONSULTA - ATENCION TERRENO
            </Text>
            <Text style={styles.text}>
              En los cuadros siguientes se detallan los temas consultados por
              los trabajadores en cada una de las areas citadas anteriormente:
              <Br />
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Gestiones realizadas "Inserte Fecha"
            </Text>

            <HouseAreaView></HouseAreaView>

            <HouseAreaView></HouseAreaView>
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>MATERIAL DE DIFUSION ENTREGADO</Text>
            <Text style={styles.subtitles2}> A. Afiches:</Text>
            <Text style={styles.text}>
              Durante "Inserte Fecha", de acuerdo a la programación de la
              empresa, se entregaron los siguientes afiches informativos.
              <Br />
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Afiches entregados "Inserte Fecha"
            </Text>
            <Text style={styles.subtitles2}> B. Folletos: </Text>
            <Text style={styles.text}>
              Durante "Inserte Fecha", de acuerdo a la programación de la
              empresa, se entregaron los siguientes folletos informativos.
            </Text>
            <Text style={styles.description}> Cuadro</Text>
            <Text style={styles.description}>
              Folletos entregados "Inserte Fecha"
            </Text>
          </Page>

          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles2}>
              {' '}
              II. ATENCION SOCIAL EMPRESA - OFICINA
            </Text>

            <Text style={styles.text}>
              Del total de atenciones realizadas en terreno por las asistentes
              sociales, algunas son derivadas a las oficinas centrales de la
              Fundación Social para entregar una atención focalizada y
              especifica en los problemas del trabajador y dar una respuesta de
              calidad a sus necesidades.
              <Br />
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Consultas realizadas por Area "inserte Fecha"
            </Text>
            <Text>
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Gestiones realizadas "Inserte Fecha"
            </Text>
            <Text>
              <Br />
            </Text>
            <Text style={styles.subtitles2}>
              DISTRIBUCIÓN POR CONSULTA - ATENCION OFICINA
            </Text>
            <Text>
              <Br />
            </Text>
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>
              III. CAPACITACIÓN REALIZADA EN OBRA
            </Text>
            <Text style={styles.text}>
              Con el objetivo entregar información, incentivar y promover
              diversos temas de relevancia para los trabajadores durante sus
              visitas a obras, las asistentes sociales de la Fundación Social
              realizan charlas informativas. <Br /> <Br /> Durante "Inserte
              Fecha", de acuerdo a la programación de la empresa, se realizaron
              las siguientes charlas informativas y de capacitación. <Br />
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Charlas realizadas "Inserte Fecha"
            </Text>
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>IV. PROYECTOS SOCIALES</Text>
            <Text style={styles.subtitles2}>Capacitacion</Text>
            <Text style={styles.text}>
              En el marco de los Proyectos de Responsabilidad Social promovidos
              por Cámara Chilena de la Construcción, la Fundación Social
              desarrolla el programa de “Capacitación en oficios de la
              construcción para trabajadores”.
              <Br />
              <Br />
              Este proyecto tiene por objetivo entregar a los trabajadores de la
              construcción capacitación técnica de un oficio relativo al área
              donde se desempeñan, representando no sólo el mejoramiento de sus
              condiciones de trabajo, sino también especializar sus
              conocimientos laborales en el ámbito de la construcción.
              <Br />
              <Br />
              Además se desarrollan cursos de capacitación para esposas e hijos
              de trabajadores, con el fin de aumentar el nivel de empleabilidad
              del grupo familiar y asi incidir positivamente en sus ingresos.
              <Br />
              <Br />
              Durante "Inserte Fecha" no se matricularon personas en cursos.
            </Text>
            <Text style={styles.subtitles}>
              V. BECAS EMPRESARIOS DE LA CONSTRUCCION{' '}
            </Text>
            <Text style={styles.subtitles2}>Beca Mejor Alumno:</Text>
            <Text style={styles.text}>
              Durante el mes se difundió el programa Beca Empresarios de la
              Construcción. El proyecto tiene por objetivo contribuir en la
              educación de los hijos de trabajadores de menores recursos
              pertenecientes a empresas socias del gremio. Esta dirigido a los
              alumnos que se encuentran cursando 8° año básico durante el
              presente año y que tengan un promedio de notas igual o superior a
              5,7.
              <Br />
              <Br />
              No se registraron trabajadores para este beneficio.{' '}
            </Text>
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>
              VI. PROGRAMA DE FOMENTO AL AHORRO "Inserte Fecha"{' '}
            </Text>
            <Text style={styles.text}>
              Durante "Inserte Fecha" se continuó con la difusión en las obras
              sobre este programa para incentivar el ahorro para la vivienda,
              ahorro previsional voluntario y/o ahorro de libre disposición, a
              través de los diversos beneficios que entrega la caja de
              compensación.
              <Br />
              <Br /> En el presente mes no se tramitaron aperturas de libretas
              de ahorro
            </Text>

            <Text style={styles.subtitles}>
              {' '}
              VII. TEMAS DE DIFUSIÓN MENSUAL
            </Text>

            <Text style={styles.subtitles2}>
              Los principales temas ha difundir el próximo mes son:{' '}
            </Text>
            <Text style={styles.text}>Charla:</Text>
            <Text style={styles.text}>Habilidades Parentales</Text>
            <Text style={styles.text}>Marketing:</Text>
            <Text style={styles.text}>1. Extensión IFE Laboral </Text>
            <Text style={styles.text}>
              2. Actividades con los niños en verano
            </Text>
            <Text style={styles.text}>3. Beca Presidente de la República </Text>

            <Text style={styles.subtitles}>VII. CASOS SOCIALES RELEVANTES</Text>
            <Text style={styles.subtitles2}>Parque Las Palmas II</Text>
          </Page>
        </Document>
      </PDFViewer>
    </Dialog>
  )
}

export default MonthlyReport
