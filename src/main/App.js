import React from 'react';
import Rotas from './routes';
import Body from './body';
import AuthProvider from './authProvider'
import MenuBar from '../components/menubar/menubar';
import 'primereact/resources/themes/mira/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.css'



class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <MenuBar/>
        <Body>
          <Rotas />
        </Body>
      </AuthProvider>

    )
  }
}

export default App;
