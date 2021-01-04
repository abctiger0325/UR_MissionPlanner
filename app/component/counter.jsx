import React from "react";
import Timer from "react-compound-timer";


export class Counter extends React.Component {
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


    render() {
        return (
            <>
                <Timer
                    initialTime={this.props.initTime}
                    timeToUpdate={50}
                    direction="backward"
                    startImmediately={false}
                    onStop={function() {
                        
                    }}
                >
                    {({ start, stop, reset, setTime }) => (
                        <>
                            <div>
                                <Timer.Minutes
                                    formatValue={
                                        value => (value).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
                                    }
                                /> :
                                <Timer.Seconds
                                    formatValue={
                                        value => (value).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
                                    }
                                /> :
                                <Timer.Milliseconds
                                    formatValue={value => {
                                        // console.log(value)
                                        let tmp = Math.trunc(value / 10);
                                        return (tmp).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
                                    }
                                    }
                                />
                            </div>
                            <div>
                                <button onClick={start}>Start</button>
                                <button onClick={stop}>Stop</button>
                                <button onClick={() => reset && setTime(this.props.initTime)}>Reset</button>
                                <button onClick={() => setTime(5 * 1000 * 60)}>Next Session</button>
                            </div>
                        </>
                    )}
                </Timer>
            </>
        )
    }
}
