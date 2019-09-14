import React from 'react';
import logo from './logo.svg';
import Radar from './Radar'
import Bar from './Bar'
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
        {this.state.data
          ? <>
              <h3>Total number of items </h3>
              <p>{this.state.data.results.length}</p>
              <Bar data={this.state.data} />
              <Radar/>
            </>
          :   <p>crunching numbers</p>}
          
      </div>
    );
  }
}

export default App;
