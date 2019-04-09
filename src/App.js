import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';

//const dataExmpl = [{name: '1', y: 400, pv: 2400, amt: 2400}, {name: '2', y: 500, pv: 2400, amt: 2400}];
const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function crossCorrelation(sequence_a, sequence_b){
  let crs_corr = [];
  let temp = 0;
  for(let i = 0; i < sequence_a.length; i++){
    for(let j = 0; j < sequence_a.length - i; j++){
      temp += sequence_a[i + j]*sequence_b[j];
    }
    crs_corr.push(temp);
    temp = 0;
  }
  return crs_corr;
}

function dataEl(x, y){
  return {name: x, y: y, pv: 2400, amt: 2400}
}

function makeData(par_a, par_b){
    let data = [];
    let crs_corr = crossCorrelation(par_a, par_b)
    for(let i = 0; i <= crs_corr.length; i++){
      data.push(dataEl(i, crs_corr[i]));
    }
    return data
}

class RenderLineChart extends React.Component {
    state = {
        data: makeData(a, b)
    };
    changeGraph = (params) => {
        this.setState({data: params});
    };

    render() {
        return(
            <LineChart width={800} height={400} data={this.state.data}>
                <Line type="monotone" dataKey="y" stroke="#fb4660"/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#0F1826', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip/>
            </LineChart>
        );
    }
}

class Input extends React.Component {
    render() {
        return(
            <div className="input-contatiner">
                <input id={this.props.id} type="text" defaultValue={this.props.value}/>
                <p>Sequence {this.props.name}</p>
            </div>
        );
    }
}

class MainContent extends React.Component {
    constructor(props){
        super(props)
        this.reconstructGraphic = this.reconstructGraphic.bind(this);
        this.graphic = React.createRef();
    }

    reconstructGraphic(){
        let new_a = document.getElementById("first-seq").value.split(' ');
        let new_b = document.getElementById("second-seq").value.split(' ');
        console.log(`first seq: ${new_a}`);
        console.log(`second seq: ${new_b}`);
        let new_data =  makeData(new_a, new_b);
        this.graphic.current.changeGraph(new_data);
    }

    render(){
        return (
            <div className="App">
                <h1>Cross correlation function calculator</h1>
                <header className="App-header">
                    <div className="row">
                        <div className="column">
                            <Input id="first-seq" name="a" value={a.join(' ')}/>
                        </div>
                        <div className="column">
                            <Input id="second-seq" name="b" value={b.join(' ')}/>
                        </div>
                        <div className="column">
                            <Button variant="contained" onClick={this.reconstructGraphic}>Calculate</Button>
                        </div>
                    </div>
                    <RenderLineChart ref={this.graphic}/>
                </header>
            </div>
        );
    }
}

class App extends Component {
  render(){
    return (
      <MainContent/>
    );
  }
}

export default App;
