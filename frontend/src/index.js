import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import { App } from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { ConfirmProvider } from './components/Confirm/Confirm.context';
import { client } from './apollo/apollo';

import './index.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ConfirmProvider>
      <App />
    </ConfirmProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
