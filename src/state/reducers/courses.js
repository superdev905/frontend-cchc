import coursesTypes from '../types/courses'

const initialState = {
  coursesList: [],
  totalCourses: 0
}

const coursesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case coursesTypes.GET_COURSES:
      return { ...state, coursesList: payload }
    case coursesTypes.SET_TOTAL_COURSES:
      return { ...state, totalCourses: payload }

    default:
      return state
  }
}

export default coursesReducer
