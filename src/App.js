import React, { Component } from 'react';
import book from './book.svg'; // book svg is default icon
import './App.css';

// set up story symbol icons from svgs in icons dir
const reqSvgs = require.context('./icons', true, /\.svg$/);
const paths = reqSvgs.keys ();
const icons = paths.map(path => reqSvgs(path));

// shuffles array
const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}  

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIconIndex : null,
      message: "Click/tap the book to begin your story",
    }
  }

  componentDidMount = () => {
    shuffle(icons);
  }

  // sets state to new icon, removes index from iconIndexesToDisplay
  getIcon = () => {
    const {
      currentIconIndex,
    } = this.state;

    // if it's the end of the icons array, reset app to initial state
    if (currentIconIndex === icons.length - 1) {
      this.setState({
        currentIconIndex : null,
        message: "Click the book to begin your story",
      });
      return;
    }

    // if it's the first click of a new story, set index to 0
    if (currentIconIndex === null) {
      this.setState({
        currentIconIndex:  0,
        message: '',
      });
    } else { // else increment and check for ending
      this.setState({
        currentIconIndex: currentIconIndex + 1,
        message: currentIconIndex === icons.length - 2 ? "(last symbol)" : "",
      });
    }
  };

  render() {
    const {
      currentIconIndex,
      message,
    } = this.state;
    return (
      <div className="App">
        <div onClick={this.getIcon} className="icon-wrapper">
          <img
            className="icon"
            src={currentIconIndex === null ? book : icons[currentIconIndex]}
            alt={currentIconIndex === null? book : icons[currentIconIndex]}
          />
          <div>{message}</div>
        </div>
        </div>
    );
  }
}
