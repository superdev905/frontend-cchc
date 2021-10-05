import coursesTypes from '../types/courses'

const initialState = {
  coursesList: [],
  totalCourses: 0,
  courseDetails: null
}

const coursesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case coursesTypes.GET_COURSES:
      return { ...state, coursesList: payload }
    case coursesTypes.SET_TOTAL_COURSES:
      return { ...state, totalCourses: payload }
    case coursesTypes.GET_COURSE_DETAILS:
      return { ...state, courseDetails: payload }

    default:
      return state
  }
}

export default coursesReducer
