const env = process.env.REACT_APP_NODE_ENV

const BASEURL = {
  prod: 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com',
  dev: 'http://localhost'
}

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
  },
  services: {
    assistanceEndpoint: `${
      env === 'production' ? `${BASEURL.prod}:5101` : `${BASEURL.dev}:5100`
    }/api/v1`,
    parameters: `${
      env === 'production' ? `${BASEURL.prod}:5105` : `${BASEURL.dev}:5200`
    }/api/v1`,
    poll: `${
      env === 'production' ? `${BASEURL.prod}:5107` : `${BASEURL.dev}:5190`
    }/api/v1`
  }
}

export default config
export { default as decisionList } from './decisionList'
export { default as businessTypes } from './business'
export { default as SantiagoDefaultLocation } from './location'
export { default as genderList } from './genderList'
export { default as usersConfig } from './users'
export { default as AttentionStatus } from './Attention'
export { default as areaConfig } from './area'
export { default as statusList } from './statusList'
export { default as moduleConfig } from './modules'
