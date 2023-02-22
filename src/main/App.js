import React from 'react';
import Navbar from '../components/navbar/navbar';
import Rotas from './routes';
import Body from './body';
import AuthProvider from './authProvider'

//import 'bootswatch/dist/minty/bootstrap.css'
//import 'bootswatch/dist/minty/bootstrap.min.css'

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.css'


class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Navbar />
        <Body>
          <Rotas />
        </Body>
      </AuthProvider>

    )
  }
}

export default App;
