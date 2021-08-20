const config = {
  prod: {
    API_BASE:
      'http://fcchc-itprocess.southcentralus.cloudapp.azure.com:5103/api/v1'
  },
  test: {
    API_BASE: 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com:5000'
  },
  dev: {
    API_BASE: 'http://localhost/api/v1'
  }
}

export default config
export { default as decisionList } from './decisionList'
export { default as businessTypes } from './business'
export { default as SantiagoDefaultLocation } from './location'
export { default as genderList } from './genderList'
export { default as usersConfig } from './users'
export { default as AttentionStatus } from './Attention'
