import React from 'react';
import Navbar from '../components/navbar';
import Rotas from './routes';

import 'bootswatch/dist/minty/bootstrap.css'
import 'bootswatch/dist/minty/bootstrap.min.css'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import '../custom.css'

import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.css'


class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className='container'>
          <div className="bs-docs-section">
            <Rotas />
          </div>
        </div>
      </>

    )
  }
}

export default App;
