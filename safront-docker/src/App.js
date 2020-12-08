import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Polarity from './components/Polarity';
import Testfback from './components/Testfback';
import TestJavaback from './components/TestJavaback';

const style = {
  marginLeft: 12,
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence: '',
      polarity: undefined,
      pyback: '',
      javaback: '',
    };
  }
  analyzeSentence() {
    console.log('=================**********');
    fetch('http://java:8080/sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence: this.textField.getValue() }),
    })
      .then(response => {
        response.json();
        console.log('======testing');
      })
      .then(data => this.setState(data));
  }

  //test Point
  testingpy() {
    fetch('http://python:5000/testHealth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(data => {
        this.setState({
          pyback: data,
        });
      });
  }
  //testing java
  testingJava() {
    console.log('testing connection');
    fetch('http://java:8080/testHealth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        response.text();
        console.log('===========');
      })
      .then(data => {
        console.log(data + '*************');
        this.setState({
          javaback: data,
        });
      });
  }

  onEnterPress = e => {
    if (e.key === 'Enter') {
      this.analyzeSentence();
    }
  };
  onEnterPress2 = e => {
    if (e.key === 'Enter') {
      this.testing();
    }
  };
  render() {
    const polarityComponent =
      this.state.polarity !== undefined ? (
        <Polarity
          sentence={this.state.sentence}
          polarity={this.state.polarity}
        />
      ) : null;

    const testpy = <Testfback pyback={this.state.pyback} />;

    const testjava = <TestJavaback javaback={this.state.javaback} />;
    return (
      <MuiThemeProvider>
        <div className='centerize'>
          <Paper zDepth={1} className='content'>
            <h2>CSYE 7220 Sentiment Analyser</h2>
            <TextField
              ref={ref => (this.textField = ref)}
              onKeyUp={this.onEnterPress.bind(this)}
              hintText='Type your sentence.'
            />
            <RaisedButton
              label='Send'
              style={style}
              onClick={this.analyzeSentence.bind(this)}
            />
            {polarityComponent}

            <h2>Test Python</h2>
            <RaisedButton
              label='Send'
              style={style}
              onClick={this.testingpy.bind(this)}
            />
            {testpy}

            <h2>Test Java</h2>
            <RaisedButton
              label='Send'
              style={style}
              onClick={this.testingJava.bind(this)}
            />
            {testjava}
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
