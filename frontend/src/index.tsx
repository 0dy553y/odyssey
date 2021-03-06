import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import theme from './utils/theme';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from 'components/common/cacheProvider';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <SnackbarProvider autoHideDuration={3000}>
            <CacheProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CacheProvider>
          </SnackbarProvider>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
