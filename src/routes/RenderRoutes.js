import { useEffect, useState } from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { useSelector, useDispatch } from 'react-redux'
import authActions from '../state/actions/auth'
import routes from './routes'

function RenderRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [token, setToken] = useState(window.localStorage.getItem('token'))
  const dispatch = useDispatch()

  useEffect(() => {
    setToken(window.localStorage.getItem('token'))
  }, [window.localStorage.getItem('token')])

  useEffect(() => {
    const authenticateUser = async () => {
      dispatch(authActions.getLoggedUser())
    }
    if (token && isAuthenticated) {
      authenticateUser()
    } else if (token && !isAuthenticated) {
      window.localStorage.clear()
    }
  }, [token, isAuthenticated])

  return <Switch>{renderRoutes(routes, { isAuthenticated })}</Switch>
}

export default RenderRoutes
