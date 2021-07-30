import { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Box, makeStyles } from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room'

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    borderRadius: 5,
    '& .mapboxgl-ctrl-bottom-left': {
      display: 'none'
    },
    '& .mapboxgl-ctrl-bottom-right': {
      display: 'none'
    }
  },
  icon: {
    fill: theme.palette.error.main
  }
}))

mapboxgl.workerClass = MapboxWorker

const Map = ({
  height,
  zoom,
  longitude,
  latitude,
  markers,
  disabled,
  showMarkers
}) => {
  const classes = useStyles()
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude,
    longitude,
    zoom
  })

  const renderMarkers = () => {
    const temp = markers.map((city) =>
      !city.longitude && !city.latitude ? (
        <> </>
      ) : (
        <Marker
          key={city.address}
          longitude={city.longitude}
          latitude={city.latitude}
        >
          <div>
            <RoomIcon style={{ fontSize: '50px' }} className={classes.icon} />
          </div>
        </Marker>
      )
    )
    return temp
  }

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude,
      longitude
    })
  }, [longitude, latitude])

  return (
    <Box height={height} className={classes.mapContainer}>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
        {...viewport}
        onViewportChange={(e) => {
          if (!disabled) {
            setViewport(e)
          }
        }}
      >
        {showMarkers && renderMarkers()}
      </ReactMapGL>
    </Box>
  )
}

Map.defaultProps = {
  showMarkers: true,
  zoom: 12,
  latitude: -33.45694,
  longitude: -70.64827,
  height: '250px',
  markers: [],
  disabled: true
}

export default Map
