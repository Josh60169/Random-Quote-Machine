import './App.css';
import React from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {quotes} from './quotes.js';

const ADD_QUOTE = 'ADD QUOTE';

const quoteReducer = (state = {quote: '', author: ''}, action) => {
  switch (action.type) {
    case ADD_QUOTE:
      return {
        quote: action.quote,
        author: action.author
      };
    default:
      return state;
  }
};

const addQuote = (quote, author) => {
  return {
    type: ADD_QUOTE,
    quote: quote,
    author: author
  };
};

const mapStateToProps = (state) => {
  return {
    quote: state.quote,
    author: state.author
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateNewQuote: (quote, author) => {
      dispatch(addQuote(quote, author));
    }
  };
};


class App extends React.Component {
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

const store = createStore(quoteReducer);
const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export default class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);

    const startQuote = this.randomQuote();
    this.state = {
      quote: startQuote[0],
      author: startQuote[1]
    };

    this.handleNewQuoteClick = this.handleNewQuoteClick.bind(this);
  }

  randomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

  handleNewQuoteClick = () => {
    const quoteAndAuthor = this.randomQuote();
    console.log(quoteAndAuthor[0])
    this.setState({
      quote: quoteAndAuthor[0],
      author: quoteAndAuthor[1]
    });
  };

  render() {
    return (
      <div className="container-fluid">
          <div id="quote-box">
              <p id="text">{this.state.quote}</p>
              <p id="author">{this.state.author}</p>
          
              <div id="btns-div" className="row">
                <div id="social-media-btns" className="col-3">
                  <button id="tweet-btn"><a id="tweet-quote" href="twitter.com/intent/tweet">tweet</a></button>
                  <button id="tumblr-btn"><a id="tumblr-post-quote">tumblr</a></button>
                </div>

                <div id="new-quote-btn" className="col-9">
                  <button id="new-quote" onClick={this.handleNewQuoteClick}>New Quote</button>
                </div>
              </div>
          </div>

      </div>
    );
  }
}