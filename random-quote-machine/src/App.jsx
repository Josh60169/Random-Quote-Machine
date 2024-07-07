import './App.scss';
import React from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {quotes} from './quotes.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXTwitter, faTumblr} from '@fortawesome/free-brands-svg-icons';


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
        <h1 id="title">Random Quote Machine</h1>
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

  changeColor = (loadingPage = false) => {
    // accesses the page, and all forms of text on the machine
    let page = document.getElementById("body"), tweetBtn = document.getElementById("tweet-icon"), 
    tumblrBtn = document.getElementById("tumblr-icon"), newQuoteBtn = document.getElementById("new-quote"), 
    title = document.getElementById("title"), quoteText = document.getElementById("text"), author = document.getElementById("author");

    // changes colors of page randomly, but keeps colors distinct
    let rand1 = Math.random() * 255 + 1, rand2 = Math.random() * 255 + 1, rand3 = Math.random() * 255 + 1;
    this.modifyMachineColors(page, tweetBtn, tumblrBtn, newQuoteBtn, title, quoteText, author, rand1, rand2, rand3, loadingPage);
  };

  modifyMachineColors = (page, tweetBtn, tumblrBtn, newQuoteBtn, title, quoteText, author, rand1, rand2, rand3, loadingPage) => {
    // changes the colors on the website according to the parameters
    if (loadingPage)
      this.colorWithoutFade(page, tweetBtn, tumblrBtn, newQuoteBtn, title, quoteText, author, rand1, rand2, rand3);
    else
      this.colorWithFade(page, tweetBtn, tumblrBtn, newQuoteBtn, title, quoteText, author, rand1, rand2, rand3);
  };

  colorWithFade = (page, tweetBtn, tumblrBtn, newQuoteBtn, title, quoteText, author, rand1, rand2, rand3) => {
    page.animate([{ backgroundColor: `rgb(${rand1}, ${rand2}, ${rand3})` }], {duration: 1000, fill: 'forwards'});
    tweetBtn.animate([{color: `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`}], {duration: 1000, fill: 'forwards'});
    tumblrBtn.animate([{color: `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`}], {duration: 1000, fill: 'forwards'});
    newQuoteBtn.animate([{ backgroundColor: `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})` }], {duration: 1000, fill: 'forwards'});
    title.animate([{color: `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`}], {duration: 1000, fill: 'forwards'});
    quoteText.animate([{color: `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`}], {duration: 1000, fill: 'forwards'});
    author.animate([{color: `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`}], {duration: 1000, fill: 'forwards'});
  };

  colorWithoutFade = (page, tweetBtn, tumblrBtn, newQuoteBtn, title, quoteText, author, rand1, rand2, rand3) => {
    page.style.backgroundColor = `rgb(${rand1}, ${rand2}, ${rand3})`;
    tweetBtn.style.color = `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`;
    tumblrBtn.style.color = `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`;
    newQuoteBtn.style.backgroundColor = `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`;
    title.style.color = `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`;
    quoteText.style.color = `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`;
    author.style.color = `rgb(${255 - rand1}, ${255 - rand2}, ${255 - rand3})`;
  };

  handleNewQuoteClick = () => {
    const quoteAndAuthor = this.randomQuote();
    this.changeColor();
    this.setState({
      quote: quoteAndAuthor[0],
      author: quoteAndAuthor[1]
    });
  };

  componentDidMount() {
    console.log('started up page');
    this.changeColor(true);
  }

  render() {
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${this.state.quote} ${this.state.author}`)}`;
    const tumblrURL = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(`${this.state.quote} ${this.state.author}`)}&content=${encodeURIComponent(`${this.state.quote} ${this.state.author}`)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`

    return (
      <div className="container-fluid">
          <div id="quote-box">
              <p id="text" className="text-center">{this.state.quote}</p>
              <p id="author" className='text-end'>{this.state.author}</p>
          
              <div id="btns-div" className="row">
                <div className="col-1">
                  <button id="tweet-btn" className="btn btn-default"><a id="tweet-quote" href={tweetURL} target="_blank"><FontAwesomeIcon id="tweet-icon" icon={faSquareXTwitter} /></a></button>
                </div>

                <div className="col-8">
                  <button id="tumblr-btn" className="btn btn-default"><a id="tumblr-post-quote" href={tumblrURL} target="_blank"><FontAwesomeIcon id="tumblr-icon" icon={faTumblr}/></a></button>
                </div>

                <div id="new-quote-btn" className="col-3">
                  <button id="new-quote" onClick={this.handleNewQuoteClick} className="btn btn-default">New Quote</button>
                </div>
              </div>
          </div>

      </div>
    );
  }
}