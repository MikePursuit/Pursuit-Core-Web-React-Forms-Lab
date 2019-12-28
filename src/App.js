import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      operator: 'sum',
      input: [],
      hidden: true,
    }
  }

  sum = (array) => array.map(n => Number(n)).reduce((i, j) => i += j, 0)
  average = (array) => this.sum(array)/array.length
  mode = (array) => {
    let freq = {}
    let arr = []
    array.forEach(n => !freq[n] ? freq[n] = 1 : freq[n]++)
    for (let n in freq) arr.push([n, freq[n]])
    return arr.reduce((i, j) => i[1] < j[1] ? j : i)[0]
  }

  handleInput = ({target:{value}}) => this.setState({input: value.split(',')})

  changeSelector = ({target:{value}}) => this.setState({operator: value})

  submitForm = (event) => {
    event.preventDefault();
    console.log(event.target)
    let validInput = this.state.input.every(n => !isNaN(n))
    this.setState({hidden: !validInput, validInput, input: validInput ? this.state.input : []})

  }

  render() {
    let {operator, input, hidden} = this.state
    return (
      <div className="App">
        <form onSubmit={this.submitForm}>  
          <label htmlFor="numbers">Enter each number in the array, seperated by a ','</label><p></p>
          <input 
            type="text" 
            id='numbers' 
            value={input} 
            onChange={this.handleInput} 
            pattern='[0-9,]+'
            title='Numbers only spereated by commas'
            required/><p></p>
          <select value={operator} onChange={this.changeSelector}>
            <option value="sum">sum</option>
            <option value="average">average</option>
            <option value="mode">mode</option>
          </select><p></p>
          <button>Calculate!</button>
        </form>
        <p hidden={hidden}>{this[operator](input)}</p>
      </div>
    );
  }
}

export default App;