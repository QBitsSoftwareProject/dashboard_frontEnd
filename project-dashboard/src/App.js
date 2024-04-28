import './App.css';
// import Main from './pages/main';
import Login from './pages/login';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5733",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
  },
});

function App() {
  return (
    <div className="App">
      {/* <Main/> */}
      <Login/>
    </div>
  );
}

export default App;
