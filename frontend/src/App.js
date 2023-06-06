import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import HeadSidebar from './components/HeadSidebar';
import Summary from './components/Summary';
import MonthlyAccount from './components/MonthlyAccount';
import DailyAccount from './components/DailyAccount';
import IncomeRegistration from './components/IncomeRegistration'
import OutcomeRegistration from './components/OutcomeRegistration'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HeadSidebar />

            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                {/* ここにルーティングを設定する */}
                <Routes>
                  <Route exact path="/" element={<Summary />} />
                </Routes>
                <Routes>
                  <Route exact path="/month" element={<MonthlyAccount />} />
                </Routes>
                <Routes>
                  <Route exact path="/daily" element={<DailyAccount />} />
                </Routes>
                <Routes>
                  <Route exact path="/income" element={<IncomeRegistration />} />
                </Routes>
                <Routes>
                  <Route exact path="/outcome" element={<OutcomeRegistration />} />
                </Routes>
                {/* -------------------------- */}
              </Container>
              <Copyright sx={{ pt: 4 }} />

            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
