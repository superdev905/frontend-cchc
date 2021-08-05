import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const Can = ({ availableTo, yes, no }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  if (!isAuthenticated || !user) {
    return no()
  }

  const role = user.is_administrator ? 'ADMIN' : 'SIMPLE_USER'
  return availableTo.includes(role) ? yes() : no()
}

Can.defaultProps = {
  yes: () => null,
  no: () => null
}

Can.propTypes = {
  availableTo: PropTypes.array.isRequired,
  yes: PropTypes.any,
  no: PropTypes.any
}

export default Can
