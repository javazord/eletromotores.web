import React from 'react';
import Navbar from '../components/navbar';
import 'bootswatch/dist/minty/bootstrap.css'
import 'bootswatch/dist/minty/bootstrap.min.css'
//import '../custom.css'
import Rotas from './routes';
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.css'


class App extends React.Component {
  render() {
    return(
      <>
        <Navbar />
        <div className='container'>
          <Rotas />
        </div>
      </>

    )
  }
}

export default App;
