import React from 'react';
import logo from './logo.svg';
import Radar from './components/Charts/Line'
import Bar from './components/Charts/Bar'
import Doughnut from './components/Charts/Doughnut'
import axios from 'axios'
import styled from 'styled-components'

export default class App extends React.Component{
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
        <AppDiv>
          {this.state.data
            ? <div className="data">
                <h3>Total number of items </h3>
                <p>{this.state.data.results.length}</p>
                <div className="top">
                  <Doughnut data={this.state.data} />
                  <Bar data={this.state.data} />
                </div>
                <Radar/>
              </div>
            : <p>crunching numbers</p>}
        </AppDiv>
    );
  }
}

const AppDiv = styled.div`
    border: 1px solid red;
    box-sizing: border-box;
    max-width: 100vw;
    color: black;
    .data{
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      .top{
        max-width: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
      }
    }
`