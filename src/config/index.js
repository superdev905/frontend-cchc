const config = {
  prod: {
    API_BASE: ''
  },
  test: {
    API_BASE: ''
  },
  dev: {
    API_BASE: 'https://e4931cb28898.ngrok.io/api/v1'
  }
}

export default config
export { default as decisionList } from './decisionList'
export { default as businessTypes } from './business'
