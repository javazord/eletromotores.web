import React from 'react';
import Navbar from '../components/navbar';
import 'bootswatch/dist/minty/bootstrap.css'
import '../custom.css'
import Rotas from './routes';


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
