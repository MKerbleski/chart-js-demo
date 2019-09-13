import React from 'react';
import logo from './logo.svg';
import Radar from './Radar'
import axios from 'axios'

class App extends React.Component{
  constructor(){
    super()
    this.state = {}
     
  }

  componentDidMount(){
    axios.get('/api/csv').then(res => {
      this.setState({
        data : res.data
      })
      console.log('res', res)
    }).catch(err => {
      this.setState({
        data: null
      })
      console.log('err', err)
    })
  }

  render(){


      return (
        <div className="App">
        <header className="App-header">
          <Radar/>
        </header>
      </div>
    );
  }
}

export default App;
