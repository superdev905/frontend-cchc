import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3B84FF',
      light: '#A6D6FF'
    },
    secondary: {
      main: '#656366'
    },
    error: {
      main: '#F66372'
    },
    success: {
      main: '#5FC961'
    },
    dark_blue: {
      main: '#334D6E'
    },
    yellow: {
      main: '#FFB946'
    },
    table: {
      gray: '#707683',
      dark: '#323C47'
    },
    purple: {
      main: '#885AF8',
      light: '#9870f8'
    },
    bg: {
      main: '#fafafa'
    },
    grey: {
      main: '#8B9AAF'
    }
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 480,
      md: 768,
      lg: 1200,
      xl: 1920
    }
  },
  constants: {
    drawerWidth: 240
  }
})

export default theme
