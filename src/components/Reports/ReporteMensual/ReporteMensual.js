import { Box } from '@material-ui/core'
import {
  PDFViewer,
  Document,
  Page,
  Text,
  StyleSheet,
  Image
} from '@react-pdf/renderer'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Dialog } from '../../Shared'
import AreaView from './view/AreaAtendida'
import ObrasView from './view/ObrasAtendidas'
import ObrasViewBody from './view/bodyObrasAtendidas'
import TeamView from './view/Team'
import AreaBody from './view/AreaBody'
import FirstComment from './view/firstComment'
import SecondComment from './view/secondComment'
import ThirdComment from './view/thirdComment'
import HeaderACF from './view/HeaderACF'
import BodyACF from './view/BodyACF'
import HeaderCompanyTable from './view/HeaderCompanyTable'
import BodyCompanyTable from './view/BodyCompanyTable'
import Noinfo from './view/Noinfo'
import FcchcLogo from '../../../assets/informeLogo/Logo-fcchc.PNG'

const MonthlyReport = ({
  open,
  onClose,
  year,
  month,
  asistentes,
  filteredVisits,
  areaTerreno,
  totalAtencionesTerreno,
  PrimerArea,
  SegundaArea,
  TercerArea,
  totalAtencionesOficina,
  areaOficina,
  topicNameTerreno,
  topicNameOficina,
  difusion,
  managementNameTerreno,
  managementNameOficina,
  folletoCharlaAfiche,
  atencionesEmpresa,
  totalConsultas,
  contadorAsistencias,
  contadorPersonas,
  totalPersonas,
  obras
}) => {
  const { constructionByCompany } = useSelector((state) => state.constructions)
  const { topics } = useSelector((state) => state.common)
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
      fontWeight: 'bold',
      fontSize: '20pt',
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
    },
    images: {
      width: '200px',
      height: '200px',
      marginVertical: 15,
      marginHorizontal: 180,
      paddingTop: '50px'
    }
  })
  const Br = () => '\n'
  const jefaturas = [
    {
      nombre: 'Cristi??n Carvallo',
      email: 'ccarvallo@fundacioncchc.cl',
      charge_name: 'Gerente Sostenibilidad',
      zona: '(Santiago)'
    },
    {
      nombre: 'Carlos Garc??a',
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
      nombre: 'Ana Mar??a G??mez',
      email: 'amgomez@fundacioncchc.cl',
      charge_name: 'Sub Gerente Zona Sur',
      zona: '(Temuco)'
    },
    {
      nombre: 'Johana Chamorro',
      email: 'jchamorro@fundacioncchc.cl',
      charge_name: 'Sub Gerente Quinta Regi??n',
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
    <Dialog open={open} onClose={onClose} fullScreen={true}>
      <PDFViewer style={{ minHeight: '85vh', width: '100%' }}>
        <Document style={{ minHeigth: '100vh', width: '100%' }}>
          <Page size="A4" style={styles.page}>
            <Box>
              <Box style={styles.box}>
                <Box style={styles.images}>
                  <Image src={FcchcLogo} />
                </Box>
              </Box>
              <Box>
                <Text style={styles.subtitle}>
                  {`${constructionByCompany[0].business.business_name}
                  `}
                </Text>
                <Text style={styles.subtitle}>
                  {obras.map((obra) => obra.name).join(' - ')}
                </Text>
              </Box>
              <Box>
                <Text style={styles.subtitle}>{`${month} ${year}`}</Text>
              </Box>
            </Box>
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>INTRODUCCI??N</Text>
            <Text style={styles.text}>
              El presente documento informa sobre las actividades y gestiones
              realizadas por el equipo de la Fundaci??n Social C??mara Chilena de
              la Construcci??n durante el mes de {`${month} ${year}`} en{' '}
              {constructionByCompany[0].business.business_name}. <Br />
              <Br /> Durante el periodo se atendi?? a los trabajadores de la
              empresa y sus grupos familiares tanto en las oficinas de la
              Fundaci??n Social como en su lugar de trabajo.
              <Br />
              <Br /> El equipo a cargo de la atenci??n social en este mes estuvo
              integrado por:
              <Br />
              <Br />
            </Text>
            <Text> </Text>
            {jefaturas.map((jefatura, index) => (
              <TeamView jefatura={jefatura} key={index} />
            ))}
            {asistentes?.map((asistente, index) => (
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
              cuales se atendi?? al total de trabajadores que se indica:
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
              fourthName={'Consultas'}
            />
            {filteredVisits?.map((filteredVisit) => {
              let consultas
              let personas
              contadorAsistencias.map((c) => {
                if (c.visitId === filteredVisit.id) {
                  consultas = c.asistencias
                }
                return null
              })

              contadorPersonas.map((c) => {
                if (c.visitId === filteredVisit.id) {
                  personas = c?.persona?.length
                }
                return null
              })

              return (
                <ObrasViewBody
                  place={filteredVisit.construction_name}
                  date={moment(filteredVisit.start_date).format('DD-MM-YYYY')}
                  quantity={personas}
                  consult={consultas}
                />
              )
            })}
            <ObrasView
              firstName={'TOTAL GENERAL'}
              secondName={`${filteredVisits.length} visitas`}
              thirdName={totalPersonas}
              fourthName={totalConsultas}
            />

            <Text style={styles.text}>
              El total de atenciones realizadas durante {`${month} ${year}`}, se
              distribuye entre las areas citadas a continuacion:
            </Text>
            <Text style={styles.description}> Cuadro </Text>
            <Text style={styles.description}>
              Consultas realizadas por Area
            </Text>
            {areaTerreno && (
              <>
                <AreaView
                  firstName={'Area Consulta'}
                  secondName={'Total'}
                  thirdName={'Porcentaje'}
                />
                {areaTerreno?.map((area, index) => {
                  if (area.total > 0) {
                    const porcentaje =
                      (area.total * 100) / totalAtencionesTerreno
                    return (
                      <AreaBody
                        key={index}
                        AreaName={area.name}
                        AtentionTotal={area.total}
                        Porcentaje={`${Number.parseFloat(porcentaje).toFixed(
                          2
                        )}% `}
                      />
                    )
                  }
                  return null
                })}
                {totalAtencionesTerreno === 0 && (
                  <Noinfo
                    primary={
                      'Durante el presente mes no se efectuaron Consultas'
                    }
                  />
                )}
                <AreaView
                  firstName={'TOTAL GENERAL'}
                  secondName={totalAtencionesTerreno}
                  thirdName={'100%'}
                />
              </>
            )}
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.text}>
              De acuerdo a la informaci??n arrojada por la Consulta, es posible
              inferir que las ??reas de mayor intervenci??n son las siguientes:
            </Text>
            {areaTerreno &&
              areaTerreno?.length > 0 &&
              areaTerreno[0]?.total > 0 && (
                <FirstComment
                  areaTotal={areaTerreno}
                  totalAtenciones={totalAtencionesTerreno}
                  PrimerArea={PrimerArea}
                />
              )}
            {areaTerreno &&
              areaTerreno?.length > 1 &&
              areaTerreno[1]?.total > 0 && (
                <SecondComment
                  areaTotal={areaTerreno}
                  totalAtenciones={totalAtencionesTerreno}
                  SegundaArea={SegundaArea}
                />
              )}
            {areaTerreno &&
              areaTerreno?.length > 2 &&
              areaTerreno[2]?.total > 0 && (
                <ThirdComment
                  areaTotal={areaTerreno}
                  totalAtenciones={totalAtencionesTerreno}
                  TercerArea={TercerArea}
                />
              )}
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
            {topicNameTerreno && areaTerreno && (
              <>
                {areaTerreno?.map((area) => {
                  if (area.total > 0) {
                    return (
                      <>
                        <AreaView
                          firstName={`CONSULTA AREA ${area.name}`}
                          secondName={'Total'}
                          thirdName={'Porcentaje'}
                        />
                        {topicNameTerreno?.map((topic, index) => {
                          if (topic.area_name === area.name) {
                            const porcentaje = (topic.total * 100) / area.total
                            return (
                              <AreaBody
                                key={index}
                                AreaName={topic.name}
                                AtentionTotal={topic.total}
                                Porcentaje={`${Number.parseFloat(
                                  porcentaje
                                ).toFixed(2)}% `}
                              />
                            )
                          }
                          return null
                        })}
                        <AreaView
                          firstName={'TOTAL GENERAL'}
                          secondName={area.total}
                          thirdName={'100%'}
                        />
                        <Text>
                          <Br />
                        </Text>
                      </>
                    )
                  }
                  return null
                })}
              </>
            )}
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Gestiones realizadas {`${month} ${year}`}
            </Text>
            {managementNameTerreno && (
              <>
                <AreaView
                  firstName={'Gesti??n'}
                  secondName={'TOTAL'}
                  thirdName={'Porcentaje'}
                />
                {managementNameTerreno?.result?.map((management, index) => {
                  const porcentaje =
                    (management.total * 100) /
                    managementNameTerreno.total_gestiones
                  return (
                    <AreaBody
                      key={index}
                      AreaName={management.name}
                      AtentionTotal={management.total}
                      Porcentaje={`${Number.parseFloat(porcentaje).toFixed(
                        2
                      )}% `}
                    />
                  )
                })}
                {managementNameTerreno?.length === 0 && (
                  <Noinfo
                    primary={
                      'Durante el presente mes no se efectuaron Gesti??nes'
                    }
                  />
                )}
                <AreaView
                  firstName={'TOTAL GENERAL'}
                  secondName={managementNameTerreno.total_gestiones || 0}
                  thirdName={'100%'}
                />
              </>
            )}
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>MATERIAL DE DIFUSION ENTREGADO</Text>
            <Text style={styles.subtitles2}> A. Afiches:</Text>
            <Text style={styles.text}>
              Durante {`${month} ${year}`}, de acuerdo a la programaci??n de la
              empresa, se entregaron los siguientes afiches informativos.
              <Br />
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Afiches entregados {`${month} ${year}`}
            </Text>
            {folletoCharlaAfiche && (
              <>
                <HeaderACF
                  first="N"
                  second="Fecha"
                  third="Obra"
                  fourth="Afiche"
                  five="Total"
                />
                {folletoCharlaAfiche?.afiche?.map((afiche, index) =>
                  filteredVisits?.map((visit) => {
                    if (afiche.visit_id === visit.id) {
                      return (
                        <BodyACF
                          first={index + 1}
                          second={moment(visit.start_date).format('DD-MM-YYYY')}
                          third={visit.construction_name}
                          fourth={`${afiche.type.replace('AFICHES: ', '')}`}
                          five={afiche.quantity}
                        />
                      )
                    }
                    return null
                  })
                )}
                {folletoCharlaAfiche?.afiche?.length === 0 && (
                  <Noinfo
                    primary={'Durante el presente mes no se entregaron Afiches'}
                  />
                )}
                <HeaderACF
                  second="TOTAL"
                  five={folletoCharlaAfiche.totalAfiche}
                />
              </>
            )}
            <Text style={styles.subtitles2}> B. Folletos: </Text>
            <Text style={styles.text}>
              Durante {`${month} ${year}`}, de acuerdo a la programaci??n de la
              empresa, se entregaron los siguientes folletos informativos.
            </Text>
            <Text style={styles.description}> Cuadro</Text>
            <Text style={styles.description}>
              Folletos entregados {`${month} ${year}`}
            </Text>
            {folletoCharlaAfiche && (
              <>
                <HeaderACF
                  first="N"
                  second="Fecha"
                  third="Obra"
                  fourth="Folleto"
                  five="Total"
                />
                {folletoCharlaAfiche?.folleto?.map((folleto, index) =>
                  filteredVisits?.map((visit) => {
                    if (folleto.visit_id === visit.id) {
                      return (
                        <BodyACF
                          first={index + 1}
                          second={moment(visit.start_date).format('DD-MM-YYYY')}
                          third={visit.construction_name}
                          fourth={`${folleto.type.replace('FOLLETOS: ', '')}`}
                          five={folleto.quantity}
                        />
                      )
                    }
                    return null
                  })
                )}
                {folletoCharlaAfiche?.folleto?.length === 0 && (
                  <Noinfo
                    primary={
                      'Durante el presente mes no se entregaron Folletos'
                    }
                  />
                )}
                <HeaderACF
                  second="TOTAL"
                  five={folletoCharlaAfiche.totalFolleto}
                />
              </>
            )}
          </Page>

          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles2}>
              {' '}
              II. ATENCION SOCIAL EMPRESA - OFICINA
            </Text>

            <Text style={styles.text}>
              Del total de atenciones realizadas en terreno por las asistentes
              sociales, algunas son derivadas a las oficinas centrales de la
              Fundaci??n Social para entregar una atenci??n focalizada y
              especifica en los problemas del trabajador y dar una respuesta de
              calidad a sus necesidades.
              <Br />
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Consultas realizadas por Area {`${month} ${year}`}
            </Text>
            {areaOficina && (
              <>
                <AreaView
                  firstName={'Area Consulta'}
                  secondName={'Total'}
                  thirdName={'Porcentaje'}
                />
                {areaOficina?.map((area, index) => {
                  if (area.total > 0) {
                    const porcentaje =
                      (area.total * 100) / totalAtencionesOficina
                    return (
                      <AreaBody
                        key={index}
                        AreaName={area.name}
                        AtentionTotal={area.total}
                        Porcentaje={`${Number.parseFloat(porcentaje).toFixed(
                          2
                        )}% `}
                      />
                    )
                  }
                  return null
                })}
                {totalAtencionesOficina === 0 && (
                  <Noinfo
                    primary={
                      'Durante el presente mes no se efectuaron Consultas'
                    }
                  />
                )}
                <AreaView
                  firstName={'TOTAL GENERAL'}
                  secondName={totalAtencionesOficina}
                  thirdName={'100%'}
                />
              </>
            )}
            <Text>
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Gestiones realizadas {`${month} ${year}`}
            </Text>
            {managementNameOficina && (
              <>
                <AreaView
                  firstName={'Gesti??n'}
                  secondName={'TOTAL'}
                  thirdName={'Porcentaje'}
                />
                {managementNameOficina?.result?.map((management, index) => {
                  const porcentaje =
                    (management.total * 100) /
                    managementNameOficina.total_gestiones
                  return (
                    <AreaBody
                      key={index}
                      AreaName={management.name}
                      AtentionTotal={management.total}
                      Porcentaje={`${Number.parseFloat(porcentaje).toFixed(
                        2
                      )}% `}
                    />
                  )
                })}
                {managementNameOficina?.length === 0 && (
                  <Noinfo
                    primary={
                      'Durante el presente mes no se efectuaron Gesti??nes'
                    }
                  />
                )}
                <AreaView
                  firstName={'TOTAL GENERAL'}
                  secondName={managementNameOficina.total_gestiones || 0}
                  thirdName={'100%'}
                />
              </>
            )}
            <Text>
              <Br />
            </Text>
            <Text style={styles.subtitles2}>
              DISTRIBUCI??N POR CONSULTA - ATENCION OFICINA
            </Text>
            {topicNameOficina && areaOficina && (
              <>
                {areaOficina?.map((area) => {
                  if (area.total > 0) {
                    return (
                      <>
                        <AreaView
                          firstName={`CONSULTA AREA ${area.name}`}
                          secondName={'Total'}
                          thirdName={'Porcentaje'}
                        />
                        {topicNameOficina?.map((topic, index) => {
                          if (topic.area_name === area.name) {
                            const porcentaje = (topic.total * 100) / area.total
                            return (
                              <AreaBody
                                key={index}
                                AreaName={topic.name}
                                AtentionTotal={topic.total}
                                Porcentaje={`${Number.parseFloat(
                                  porcentaje
                                ).toFixed(2)}% `}
                              />
                            )
                          }
                          return null
                        })}
                        <AreaView
                          firstName={'TOTAL GENERAL'}
                          secondName={area.total}
                          thirdName={'100%'}
                        />
                        <Text>
                          <Br />
                        </Text>
                      </>
                    )
                  }
                  return null
                })}
              </>
            )}
            <Text>
              <Br />
            </Text>
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>
              III. CAPACITACI??N REALIZADA EN OBRA
            </Text>
            <Text style={styles.text}>
              Con el objetivo entregar informaci??n, incentivar y promover
              diversos temas de relevancia para los trabajadores durante sus
              visitas a obras, las asistentes sociales de la Fundaci??n Social
              realizan charlas informativas. <Br /> <Br /> Durante{' '}
              {`${month} ${year}`}, de acuerdo a la programaci??n de la empresa,
              se realizaron las siguientes charlas informativas y de
              capacitaci??n. <Br />
              <Br />
            </Text>
            <Text style={styles.description}>Cuadro</Text>
            <Text style={styles.description}>
              Charlas realizadas {`${month} ${year}`}
            </Text>
            {folletoCharlaAfiche && (
              <>
                <HeaderACF
                  first="N"
                  second="Fecha"
                  third="Obra"
                  fourth="Charla"
                  five="Participantes"
                />
                {folletoCharlaAfiche.charla?.map((charla, index) =>
                  filteredVisits?.map((visit) => {
                    if (charla.visit_id === visit.id) {
                      return (
                        <BodyACF
                          first={index + 1}
                          second={moment(visit.start_date).format('DD-MM-YYYY')}
                          third={visit.construction_name}
                          fourth={`${charla.type.replace('CHARLA: ', '')}`}
                          five={charla.quantity}
                        />
                      )
                    }
                    return null
                  })
                )}
                {folletoCharlaAfiche?.charla?.length === 0 && (
                  <Noinfo
                    primary={'Durante el presente mes no se efectuaron Charlas'}
                  />
                )}
                <HeaderACF
                  second="TOTAL"
                  five={folletoCharlaAfiche.totalCharla}
                />
              </>
            )}
          </Page>
          <Page size="A4" style={styles.page}>
            <Text style={styles.subtitles}>IV. PROYECTOS SOCIALES</Text>
            <Text style={styles.subtitles2}>Capacitacion</Text>
            <Text style={styles.text}>
              En el marco de los Proyectos de Responsabilidad Social promovidos
              por C??mara Chilena de la Construcci??n, la Fundaci??n Social
              desarrolla el programa de ???Capacitaci??n en oficios de la
              construcci??n para trabajadores???.
              <Br />
              <Br />
              Este proyecto tiene por objetivo entregar a los trabajadores de la
              construcci??n capacitaci??n t??cnica de un oficio relativo al ??rea
              donde se desempe??an, representando no s??lo el mejoramiento de sus
              condiciones de trabajo, sino tambi??n especializar sus
              conocimientos laborales en el ??mbito de la construcci??n.
              <Br />
              <Br />
              Adem??s se desarrollan cursos de capacitaci??n para esposas e hijos
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
              Durante el mes se difundi?? el programa Beca Empresarios de la
              Construcci??n. El proyecto tiene por objetivo contribuir en la
              educaci??n de los hijos de trabajadores de menores recursos
              pertenecientes a empresas socias del gremio. Esta dirigido a los
              alumnos que se encuentran cursando 8?? a??o b??sico durante el
              presente a??o y que tengan un promedio de notas igual o superior a
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
              Durante {`${month} ${year}`} se continu?? con la difusi??n en las
              obras sobre este programa para incentivar el ahorro para la
              vivienda, ahorro previsional voluntario y/o ahorro de libre
              disposici??n, a trav??s de los diversos beneficios que entrega la
              caja de compensaci??n.
              <Br />
              <Br /> En el presente mes no se tramitaron aperturas de libretas
              de ahorro
            </Text>
            <Text style={styles.subtitles}>VII. TEMAS DE DIFUSI??N MENSUAL</Text>
            <Text style={styles.subtitles2}>
              Los principales temas ha difundir el pr??ximo mes son:
            </Text>
            <Text style={styles.text}>{difusion}</Text>
            <Text style={styles.subtitles}>VII. CASOS SOCIALES RELEVANTES</Text>
            <Text style={styles.subtitles2}>
              {filteredVisits?.map((visit) =>
                atencionesEmpresa?.map((at) =>
                  visit.id === at.visit_id ? at.construction_name : null
                )
              )}
              {atencionesEmpresa?.length === 0 && (
                <Noinfo
                  primary={
                    'Durante el presente mes no se efectuaron Casos sociales relevantes'
                  }
                />
              )}
            </Text>
            {atencionesEmpresa && (
              <>
                <HeaderCompanyTable
                  first="RUT"
                  second="Nombre"
                  third="??rea Consulta"
                  fourth="Gesti??n"
                />
                {atencionesEmpresa?.map((at) => (
                  <BodyCompanyTable
                    first={at.employee_rut}
                    second={at.attended_name}
                    third={at.area_name}
                    fourth={`TEMA: ${
                      topics.find((val) => val.id === at.topic_id).name
                    } \n ${at.company_report_observation}`}
                  />
                ))}
                {atencionesEmpresa?.length === 0 && (
                  <Noinfo
                    primary={
                      'Durante el presente mes no se efectuaron Casos sociales relevantes'
                    }
                  />
                )}
              </>
            )}
          </Page>
        </Document>
      </PDFViewer>
    </Dialog>
  )
}

export default MonthlyReport
