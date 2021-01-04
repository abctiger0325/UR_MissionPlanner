import React from "react";
import ReactDOM from "react-dom";
import {Counter} from './component/counter.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // second: '',
            // minute: '',

        }
        // this.handleTextChange = this.handleTextChange.bind(this);
    }

    // handleTextChange(e) {
    // this.setState({ message: e.target.value });
    // }


    render(){
        return (
            <div>
                Time Counter: 
                <Counter
                    initTime = {1000 * 60 * 15}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);