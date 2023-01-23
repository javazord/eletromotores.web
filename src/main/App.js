import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Rotas from './routes';
import Body from './body';
import AuthProvider from './authProvider'

import 'bootswatch/dist/minty/bootstrap.css'
import 'bootswatch/dist/minty/bootstrap.min.css'

import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.css'


class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Sidebar />
        <Body>
          <Rotas />
        </Body>
      </AuthProvider>

    )
  }
}

export default App;
