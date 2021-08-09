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
      main: '#F66372',
      light: '#fbc3c9',
      dark: '#b00a1b'
    },
    success: {
      main: '#5FC961',
      light: '#c2eac2',
      dark: '#37a539'
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
    },
    gray: {
      gray50: '#F7FAFC',
      gray100: '#EDF2F7',
      gray200: '#E2E8F0',
      gray300: '#CBD5E0',
      gray400: '#A0AEC0',
      gray500: '#718096',
      gray600: '#4A5568',
      gray700: '#2D3748',
      gray800: '#1A202C',
      gray900: '#171923'
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
  typography: {
    fontFamily: ['Rubik', 'sans-serif'].join(',')
  },
  constants: {
    drawerWidth: 220
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto'
        },
        '*': {
          fontFamily: ['Rubik', 'sans-serif'].join(',')
        }
      }
    }
  }
})

export default theme
