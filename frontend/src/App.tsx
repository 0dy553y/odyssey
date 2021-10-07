import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import LoginPage from './pages/login';

import './App.css';

function App(): JSX.Element {
  return (
    <Container className="App" component="main" maxWidth="xs">
      <CssBaseline />
      <LoginPage />
    </Container>
  );
}

export default App;
