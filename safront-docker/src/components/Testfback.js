import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Testfback extends Component {
    propTypes = {
        sentence: PropTypes.string.isRequired, 
        pyback: PropTypes.string.isRequired,
        polarity: PropTypes.number.isRequired
    };
    render() {
        //const green = Math.round((this.props.polarity + 1) * 128); 
        // const red = 255 - green;
        // const textColor = {
        //     backgroundColor: 'rgb(' + red + ', ' + green + ', 0)', padding: '15px'
        // };
        return <div>Python: {this.props.pyback} </div>
    }
}
export default Testfback;