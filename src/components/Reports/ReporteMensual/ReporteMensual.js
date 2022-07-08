import { Box } from '@material-ui/core'
import {
  PDFViewer,
  Document,
  Page,
  Text,
  StyleSheet
} from '@react-pdf/renderer'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Dialog } from '../../Shared'
import AreaView from './view/AreaAtendida'
import HouseAreaView from './view/AreaPrevision'
import ObrasView from './view/ObrasAtendidas'
import ObrasViewBody from './view/bodyObrasAtendidas'
import TeamView from './view/Team'
import AreaBody from './view/AreaBody'

const MonthlyReport = ({
  open,
  onClose,
  year,
  month,
  asistentes,
  filteredVisits,
  areaTotal,
  totalAtenciones,
  PrimerArea,
  SegundaArea,
  TercerArea
}) => {
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
      nombre: 'Cristián Carvallo',
      email: 'ccarvallo@fundacioncchc.cl',
      charge_name: 'Gerente Sostenibilidad',
      zona: '(Santiago)'
    },
    {
      nombre: 'Carlos García',
      email: 'cgarcia@fundacioncchc.cl',
      charge_name: 'Gerente Servicio Social',
      zona: '(Santiago)'
    },
    {
      nombre: 'Greta Lopez',
      email: 'glopez@fundacioncchc.cl',
      charge_name: 'Sub Gerente Zona Norte Grande',
      zona: '(Iquique)'
    },
    {
      nombre: 'Ana María Gómez',
      email: 'amgomez@fundacioncchc.cl',
      charge_name: 'Sub Gerente Zona Sur',
      zona: '(Temuco)'
    },
    {
      nombre: 'Johana Chamorro',
      email: 'jchamorro@fundacioncchc.cl',
      charge_name: 'Sub Gerente Quinta Región',
      zona: '(Valparaiso)'
    },
    {
      nombre: 'Constanza Galaz',
      email: 'cgalaz@fundacioncchc.cl',
      charge_name: 'Jefa Norte Chico',
      zona: '(La Serena)'
    },
    {
      nombre: 'Yessica Pino',
      email: 'ypino@fundacioncchc.cl',
      charge_name: 'Jefa Servicio Social Oficina',
      zona: '(Santiago)'
    },
    {
      nombre: 'Karina Hidalgo',
      email: 'khidalgo@fundacioncchc.cl',
      charge_name: 'Coordinadora Atencion Social Empresas',
      zona: '(Santiago)'
    },
    {
      nombre: 'Krsitopher Poblete',
      email: 'kpoblete@fundacioncchc.cl',
      charge_name: 'Coordinador Atencion Social Empresas',
      zona: '(Santiago)'
    },
    {
      nombre: 'Melisa Vega',
      email: 'mvega@fundacioncchc.cl',
      charge_name: 'Coordinadora Atencion Social Empresas',
      zona: '(Santiago)'
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
                  `}
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
              la Construcción durante el mes de {`${month} ${year}`} en{' '}
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
            {asistentes.map((asistente, index) => (
              <TeamView jefatura={asistente} key={index} />
            ))}
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>
              {' '}
              I. ATENCION SOCIAL EMPRESA - TERRENO {`${month} ${year}`}
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

            <ObrasView
              firstName={'Lugar'}
              secondName={'Fecha'}
              thirdName={'Personas'}
              fourthName={'Consulta'}
            />
            {filteredVisits?.map((filteredVisit) => (
              <ObrasViewBody
                place={filteredVisit.construction_name}
                date={moment(filteredVisit.start_date).format('DD-MM-YYYY')}
                quantity={'pendiente'}
                consult={'pendiente'}
              />
            ))}
            <ObrasView
              firstName={'TOTAL GENERAL'}
              secondName={`${filteredVisits.length} visitas`}
              thirdName={'pendiente'}
              fourthName={'pendiente'}
            />

            <Text style={styles.text}>
              El total de atenciones realizadas durante {`${month} ${year}`}, se
              distribuye entre las areas citadas a continuacion:
            </Text>
            <Text style={styles.description}> Cuadro </Text>
            <Text style={styles.description}>
              {' '}
              Consultas realizadas por Area{' '}
            </Text>
            {areaTotal && (
              <>
                <AreaView
                  firstName={'Area Consulta'}
                  secondName={'Total'}
                  thirdName={'Porcentaje'}
                />
                {areaTotal.map((area) => {
                  if (area.total > 0) {
                    const porcentaje = (area.total * 100) / totalAtenciones
                    return (
                      <AreaBody
                        AreaName={area.name}
                        AtentionTotal={area.total}
                        Porcentaje={`${Number.parseFloat(porcentaje).toFixed(
                          2
                        )}% `}
                      />
                    )
                  }
                })}
                <AreaView
                  firstName={'TOTAL GENERAL'}
                  secondName={totalAtenciones}
                  thirdName={'100%'}
                />
              </>
            )}
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.text}>
              De acuerdo a la información arrojada por la Consulta, es posible
              inferir que las áreas de mayor intervención son las siguientes:
            </Text>
            <Text style={styles.subtitles2}>
              A- {areaTotal ? areaTotal[0].name : null}
            </Text>
            <Text style={styles.text}>
              La primera área de mayor intervención corresponde a{' '}
              {areaTotal ? areaTotal[0].name : null}, con porcentaje de{' '}
              {areaTotal
                ? `${Number.parseFloat(
                    (areaTotal[0].total * 100) / totalAtenciones
                  ).toFixed(2)}% `
                : '0%'}
              consultas realizadas. A continuación se detallan sus variables:
            </Text>
            <Text style={styles.text}> {PrimerArea || null} </Text>
            <Text style={styles.subtitles2}>
              B- {areaTotal && areaTotal.length > 1 ? areaTotal[1].name : null}
            </Text>
            <Text style={styles.text}>
              La segunda área de mayor intervención corresponde a{' '}
              {areaTotal && areaTotal.length > 1 ? areaTotal[1].name : null},
              con porcentaje de{' '}
              {areaTotal && areaTotal.length > 1
                ? `${Number.parseFloat(
                    (areaTotal[1].total * 100) / totalAtenciones
                  ).toFixed(2)}% `
                : '0%'}{' '}
              consultas realizadas. A continuación se detallan sus variables:
            </Text>
            <Text style={styles.text}> {SegundaArea || null} </Text>
            <Text style={styles.subtitles2}>
              C- {areaTotal && areaTotal.length > 2 ? areaTotal[2].name : null}
            </Text>
            <Text style={styles.text}>
              La Tercera área de mayor intervención corresponde a{' '}
              {areaTotal && areaTotal.length > 2 ? areaTotal[2].name : null},
              con porcentaje de{' '}
              {areaTotal && areaTotal.length > 2
                ? `${Number.parseFloat(
                    (areaTotal[2].total * 100) / totalAtenciones
                  ).toFixed(2)}% `
                : '0%'}{' '}
              consultas realizadas. A continuación se detallan sus variables:
            </Text>
            <Text style={styles.text}> {TercerArea || null} </Text>
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
              Gestiones realizadas {`${month} ${year}`}
            </Text>

            <HouseAreaView></HouseAreaView>

            <HouseAreaView></HouseAreaView>
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>MATERIAL DE DIFUSION ENTREGADO</Text>
            <Text style={styles.subtitles2}> A. Afiches:</Text>
            <Text style={styles.text}>
              Durante {`${month} ${year}`}, de acuerdo a la programación de la
              empresa, se entregaron los siguientes afiches informativos.
              <Br />
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Afiches entregados {`${month} ${year}`}
            </Text>
            <Text style={styles.subtitles2}> B. Folletos: </Text>
            <Text style={styles.text}>
              Durante {`${month} ${year}`}, de acuerdo a la programación de la
              empresa, se entregaron los siguientes folletos informativos.
            </Text>
            <Text style={styles.description}> Cuadro</Text>
            <Text style={styles.description}>
              Folletos entregados {`${month} ${year}`}
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
              Consultas realizadas por Area {`${month} ${year}`}
            </Text>
            <Text>
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Gestiones realizadas {`${month} ${year}`}
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
              realizan charlas informativas. <Br /> <Br /> Durante{' '}
              {`${month} ${year}`}, de acuerdo a la programación de la empresa,
              se realizaron las siguientes charlas informativas y de
              capacitación. <Br />
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Charlas realizadas {`${month} ${year}`}
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
              Durante {`${month} ${year}`} no se matricularon personas en
              cursos.
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
              VI. PROGRAMA DE FOMENTO AL AHORRO {`${month} ${year}`}{' '}
            </Text>
            <Text style={styles.text}>
              Durante {`${month} ${year}`} se continuó con la difusión en las
              obras sobre este programa para incentivar el ahorro para la
              vivienda, ahorro previsional voluntario y/o ahorro de libre
              disposición, a través de los diversos beneficios que entrega la
              caja de compensación.
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
