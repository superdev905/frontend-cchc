const config = {
  prod: {
    API_BASE: 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com:5000'
  },
  test: {
    API_BASE: ''
  },
  dev: {
    API_BASE:
      'http://fcchc-itprocess.southcentralus.cloudapp.azure.com:5000/api/v1'
  }
}

export default config
export { default as decisionList } from './decisionList'
export { default as businessTypes } from './business'
export { default as SantiagoDefaultLocation } from './location'
