import { useState } from 'react'
import './App.css'
import React from 'react'


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Random Quote Machine</h1>
        <QuoteBox/>
      </div>
    );
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: 'quote will go here',
      author: 'author will go here'
    };

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick = () => {

  };

  render() {
    return (
      <div id="quote-box" className="container-fluid">
        <div id="text-div">
          <p>{this.state.quote}</p>
        </div>

        <div id="author-div">
          <p>{this.state.author}</p>
        </div>

        <div id="btns-div" className="row">
          <div id="tweet-quote-div" className="col-2">
            <button>tweet</button>
          </div>

          <div id="tumblr-quote-div" className="col-5">
            <button>tumblr</button>
          </div>

          <div id="generate-btn-div" className="col-4">
            <button id="new-quote">New Quote</button>
          </div>

        </div>
      </div>
    );
  }
}


