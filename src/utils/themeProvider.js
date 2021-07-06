import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#109CF1'
    },
    secondary: {
      main: '#656366'
    },
    error: {
      main: '#F7685B'
    },
    success: {
      main: '#2ED47A'
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
