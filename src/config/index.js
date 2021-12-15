const env = process.env.REACT_APP_NODE_ENV

const BASEURL = {
  production: 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com',
  testing: 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com',
  development: 'http://localhost'
}

const services = {
  business: {
    development: `${BASEURL[env]}/api/v1`,
    testing: `${BASEURL[env]}:5193/api/v1`,
    production: `${BASEURL[env]}:5103/api/v1`
  },
  assistance: {
    development: `${BASEURL[env]}:5100/api/v1`,
    testing: `${BASEURL[env]}:5191/api/v1`,
    production: `${BASEURL[env]}:5101/api/v1`
  },
  parameters: {
    development: `${BASEURL[env]}:5200/api/v1`,
    testing: `${BASEURL[env]}:5195/api/v1`,
    production: `${BASEURL[env]}:5105/api/v1`
  },
  poll: {
    development: `${BASEURL[env]}:5190/api/v1`,
    testing: `${BASEURL[env]}:5197/api/v1`,
    production: `${BASEURL[env]}:5107/api/v1`
  },
  auth: {
    development: `${BASEURL[env]}:5500/api/v1`,
    testing: `${BASEURL[env]}:5192/api/v1`,
    production: `${BASEURL[env]}:5102/api/v1`
  },
  employee: {
    development: `${BASEURL[env]}:8000/api/v1`,
    testing: `${BASEURL[env]}:5194/api/v1`,
    production: `${BASEURL[env]}:5104/api/v1`
  },
  scholarship: {
    development: `${BASEURL[env]}:5191/api/v1`,
    testing: `${BASEURL[env]}:5199/api/v1`,
    production: `${BASEURL[env]}:5108/api/v1`
  },
  courses: {
    development: `${BASEURL[env]}:5192/api/v1`,
    testing: `${BASEURL[env]}:5199/api/v1`,
    production: `${BASEURL[env]}:5109/api/v1`
  },
  benefits: {
    development: `${BASEURL[env]}:5193/api/v1`,
    testing: `${BASEURL[env]}:5199/api/v1`,
    production: `${BASEURL[env]}:5110/api/v1`
  },
  schedule: {
    development: `${BASEURL[env]}:5194/api/v1`,
    testing: `${BASEURL[env]}:5199/api/v1`,
    production: `${BASEURL[env]}:5111/api/v1`
  },
  housing: {
    development: `${BASEURL[env]}:5195/api/v1`,
    testing: `${BASEURL[env]}:5199/api/v1`,
    production: `${BASEURL[env]}:5112/api/v1`
  },
  socialCase: {
    development: `${BASEURL[env]}:5196/api/v1`,
    testing: `${BASEURL[env]}:5196/api/v1`,
    production: `${BASEURL[env]}:5113/api/v1`
  },
  questionWeb: {
    development: `${BASEURL[env]}:5197/api/v1`,
    testing: `${BASEURL[env]}:5196/api/v1`,
    production: `${BASEURL[env]}:5114/api/v1`
  }
}

const config = {
  services: {
    business: services.business[env],
    assistance: services.assistance[env],
    parameters: services.parameters[env],
    poll: services.poll[env],
    auth: services.auth[env],
    employee: services.employee[env],
    scholarship: services.scholarship[env],
    courses: services.courses[env],
    benefits: services.benefits[env],
    schedule: services.schedule[env],
    housing: services.housing[env],
    socialCase: services.socialCase[env],
    questionWeb: services.questionWeb[env]
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
export { default as scholarshipConfig } from './scholarship'
export { default as months } from './months'
