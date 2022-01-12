import questionTypes from '../types/questions'

const initialState = {
  questions: [],
  totalQuestions: 0,
  question: null,
  distribution: [],
  lastQuestions: [],
  stats: {},
  query: {
    page: 1,
    size: 30
  },
  uiFilters: {},
  selectedList: [],
  assignationStats: [],
  maxHours: null
}

const questionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case questionTypes.GET_QUESTIONS:
      return { ...state, questions: payload }
    case questionTypes.SET_TOTAL_QUESTIONS:
      return { ...state, totalQuestions: payload }
    case questionTypes.GET_QUESTION_DETAILS:
      return { ...state, question: payload }
    case questionTypes.GET_DISTRIBUTION_STATS:
      return { ...state, distribution: payload }
    case questionTypes.GET_LAST_QUESTIONS:
      return { ...state, lastQuestions: payload }
    case questionTypes.GET_GENERAL_STATS:
      return { ...state, stats: payload }
    case questionTypes.UPDATE_QUERY:
      return { ...state, query: payload }
    case questionTypes.UPDATE_UI_FILTERS:
      return { ...state, uiFilters: payload }
    case questionTypes.UPDATE_SELECTED_LIST:
      return { ...state, selectedList: payload }
    case questionTypes.GET_ASSIGNATION_STATS:
      return { ...state, assignationStats: payload }
    case questionTypes.GET_MAX_HOURS:
      return { ...state, maxHours: payload }

    default:
      return state
  }
}

export default questionsReducer
