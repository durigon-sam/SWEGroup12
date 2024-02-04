import React, { Component } from "react";
import '../App.css';
import logo from '../logo.svg';

// another way to make a component/element
class AnimatedComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <p>
                    Try the endpoint "/home"!
                </p>
                <a
                    className="App-link"
                    href="/home"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Check out the other component!
                </a>
                </header>
            </div>
        )
    }
}

export default AnimatedComponent;