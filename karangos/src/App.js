/*import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

import TopBar from './ui/TopBar'
import FooterBar from './ui/FooterBar'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh' // 100% da altura da area visivel
  }
}));

function Main() {
  const classes = useStyles()
  return (
    <Box className={classes.box}>
        <TopBar />
        <FooterBar />
    </Box>
  )
}

function App() {
  return(
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider> 
  );
}

/*function App() {
  const classes = useStyles();
  return(
    <ThemeProvider theme={theme}>
      <Box className={classes.box}>
        <TopBar />
        <FooterBar />
      </Box>
    </ThemeProvider> 
  );
}*/
export default App;
