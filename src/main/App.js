
import React from 'react';
import Rotas from './routes';
import Body from './body';
import AuthProvider from './authProvider'
import '../primereact/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.css'
import SidebarWrapper from '../components/sidebar/sidebar';



class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        {(context) => (
          context.authenticated ? (
            <SidebarWrapper>
              <Body>
                <Rotas />
              </Body>
            </SidebarWrapper>
          ) : (
            <Body>
              <Rotas />
            </Body>
          )
        )}
      </AuthProvider>
    );
  }
}

export default App;
