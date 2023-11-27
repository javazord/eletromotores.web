
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.css';
import React from 'react';
import Rotas from './routes';
import Content from './content';
import AuthProvider from './authProvider'
import SidebarWrapper from '../components/sidebar/sidebar';

class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        {(context) => (
          context.authenticated ? (
            <SidebarWrapper>
              <Content>
                <Rotas />
              </Content>
            </SidebarWrapper>
          ) : (
            <Content>
              <Rotas />
            </Content>
          )
        )}
      </AuthProvider>
    );
  }
}

export default App;
