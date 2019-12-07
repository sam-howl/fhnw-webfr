import React, { Component } from 'react';
import { Button, Jumbotron } from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.names = [
            'Balin', 'Dwalin', 'Fili', 'Kili', 'Dori', 'Nori', 'Ori', 'Oin', 'Gloin',
            'Bifur', 'Bofur', 'Bombur'
        ];
        this.state = {
            index: 0,
            counter: 0,
        };
        this.tick = this.tick.bind(this);
        setInterval(this.tick, 1000);
        this.incrementCounter = this.incrementCounter.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    tick() {
        const newIndex = (this.state.index + 1) % this.names.length;
        this.setState({ index: newIndex });
        //this.state.index = (this.state.index + 1) % this.names.length;
    }

    incrementCounter() {
        const newCounter = this.state.counter + 1
        this.setState(state => ({
            counter: newCounter
        }));
    }

    refresh() {
        this.setState({counter: 0})
    }

    render() {
        return (
            <div>
            <h1 className="m-3">{this.props.message} {this.names[this.state.index]}</h1>
            <Jumbotron className="m-3">{this.state.counter}</Jumbotron>
            <Button className="m-3" color="primary" onClick={this.incrementCounter}>inc</Button>
            <Button className="m-1" color="secondary" onClick={this.refresh}>refresh</Button>
            </div>
        )
    }
}
export default App;