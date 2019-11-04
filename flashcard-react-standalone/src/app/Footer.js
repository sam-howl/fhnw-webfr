import React from 'react';

export default class Footer extends React.Component {
    render() {
        //return <h6>&copy; The FHNW Team</h6>
        return <h6>{this.props.message}</h6>
    }
} 