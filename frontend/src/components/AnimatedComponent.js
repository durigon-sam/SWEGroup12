import React, { Component } from "react";
import '../styles/App.css';
//import logo from '/BeatBlendr_Logos/Full_Color_Dark.png';
import { Button } from '@mui/material';

// another way to make a component/element
class AnimatedComponent extends Component {
    constructor(props) {
        super(props)
        this.handleButtonClick = this.handleButtonClick.bind(this);

        this.state = {

        }
    }

    // navigate = useNavigate();

    handleButtonClick() {
        alert("Hello");
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                <img src='/BeatBlendr_Logos/Full_Color_Dark.png' className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <p>
                    Try the endpoint "/home"!
                </p>
                <Button
                    onClick={this.handleButtonClick}
                >
                    Click Me!
                </Button>
                    
                </header>
            </div>
        )
    }
}

export default AnimatedComponent;