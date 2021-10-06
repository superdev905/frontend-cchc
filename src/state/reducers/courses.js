import coursesTypes from '../types/courses'

const initialState = {
  coursesList: [],
  coursesDocs: [],
  extraPaymentsList: [],
  totalCourses: 0,
  totalCoursesDocs: 0,
  totalExtraPayments: 0,
  courseDetails: null,
  courseDocDetails: null
}

const coursesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case coursesTypes.GET_COURSES:
      return { ...state, coursesList: payload }
    case coursesTypes.SET_TOTAL_COURSES:
      return { ...state, totalCourses: payload }
    case coursesTypes.GET_COURSE_DETAILS:
      return { ...state, courseDetails: payload }
    case coursesTypes.GET_COURSES_DOCS:
      return { ...state, coursesDocs: payload }
    case coursesTypes.SET_TOTAL_COURSES_DOCS:
      return { ...state, totalCoursesDocs: payload }
    case coursesTypes.GET_COURSE_DOC_DETAILS:
      return { ...state, courseDocDetails: payload }
    case coursesTypes.GET_EXTRA_PAYMENTS:
      return { ...state, extraPaymentsList: payload }
    case coursesTypes.SET_TOTAL_EXTRA_PAYMENTS:
      return { ...state, totalExtraPayments: payload }
    default:
      return state
  }
}

export default coursesReducer
