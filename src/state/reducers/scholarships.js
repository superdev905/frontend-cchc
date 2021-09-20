import scholarshipTypes from '../types/scholarships'

const initialState = {
  showCreateModal: false,
  application: null,
  applicationsList: [],
  scholarshipType: [],
  total: 0,
  create: {
    step: 0
  }
}

const scholarshipsReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case scholarshipTypes.APPLICATION_TOGGLE_CREATE:
      return { ...state, showCreateModal: payload }
    case scholarshipTypes.GET_APPLICATIONS:
      return { ...state, applicationsList: payload }
    case scholarshipTypes.SET_TOTAL_APPLICATIONS:
      return { ...state, total: payload }
    case scholarshipTypes.GET_APPLICATION_DETAILS:
      return { ...state, application: payload }
    case scholarshipTypes.GET_SCHOLARSHIPS_TYPES:
      return { ...state, scholarshipType: payload }
    case scholarshipTypes.POSTULATION_UPDATE_CREATE:
      return { ...state, create: payload }
    default:
      return state
  }
}

export default scholarshipsReducers
