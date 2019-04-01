import React, { Component } from 'react';
import book from './book.svg';
import './App.css';

// TODOs: 
// 1. optimize svgs, perhaps into one large sprite
// 2. deployment webpack stuff
// 3. better ui for for beginning, ending of app

// set up icons from dir
const reqSvgs = require.context ( './icons', true, /\.svg$/ )
const paths = reqSvgs.keys ()
const svgs = paths.map( path => reqSvgs ( path ) )

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIcon : '',
      message: "Click the book to begin your story",
    }
  }

  componentDidMount = () => {
    this.populateIndexes();
   }

  // create an array of iconIndexesToDisplay
  populateIndexes = () => {
    const iconIndexesToDisplay = [];
    for (let i = 0; i < svgs.length; i++) {
      iconIndexesToDisplay.push(i); 
    }
    this.setState({ iconIndexesToDisplay: iconIndexesToDisplay });
  }

  // sets state to new icon, removes index from iconIndexesToDisplay
  getIcon = () => {
    const {
      iconIndexesToDisplay,
    } = this.state;

    // return to beginning if it's over...
    if (iconIndexesToDisplay.length === 0) {
      this.populateIndexes();
      this.setState({
        currentIcon : '',
        message: "Click the book to begin your story",
      });
      return;
    }

    const positionOfNextIconIndex = Math.floor(Math.random()*iconIndexesToDisplay.length);
    const nextIconIndex = iconIndexesToDisplay[positionOfNextIconIndex];
    const copyOfIconIndexes = iconIndexesToDisplay;
    copyOfIconIndexes.splice(positionOfNextIconIndex, 1);
    this.setState({
      currentIcon: svgs[nextIconIndex],
      iconIndexesToDisplay: copyOfIconIndexes,
      message: copyOfIconIndexes.length === 0 ? "That's the end!" : "",
    })
  };

  render() {
    const {
      currentIcon,
      message,
    } = this.state;
    return (
      <div className="App">
        <div onClick={this.getIcon} className="icon-wrapper">
            <img src={currentIcon? currentIcon : book} className="icon" alt={currentIcon} />
            <div>{message}</div>
          </div>
      </div>
    );
  }
}

export default App;
