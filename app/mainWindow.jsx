import React from "react";
import ReactDOM from "react-dom";
import Timer from "react-compound-timer";

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
                <Timer
                    timeToUpdate = {50}
                >
                    <Timer.Days /> days
                    <Timer.Hours /> hours
                    <Timer.Minutes /> minutes
                    <Timer.Seconds /> seconds
                    <Timer.Milliseconds 
                        formatValue = {value => {
                            // console.log(value)
                            let tmp = Math.trunc(value / 10);
                            return (tmp).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                        }
                    /> milliseconds
                </Timer>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);